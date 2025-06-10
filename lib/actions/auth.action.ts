'use server'

import { auth, db } from "@/firebase/admin";
import { User } from "firebase/auth";
import { cookies } from "next/headers";
const OneWeek = 60 * 60 * 24 * 7; // Corrected to seconds in a week

export interface AppUser {
  id: string;
  name?: string;
  email?: string;
}

export async function signUp(params: SignUpParams) {
  const { name, email, password } = params;

  try {
    // Step 1: Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Step 2: Create user doc in Firestore
    const uid = userRecord.uid;
    const userDoc = db.collection('users').doc(uid);
    const snapshot = await userDoc.get();

    if (snapshot.exists) {
      return {
        success: false,
        message: 'User already exists. Please sign in instead.',
      };
    }

    await userDoc.set({
      email,
      name,
    });

    return {
      success: true,
      message: 'User created successfully.',
    };
  } catch (e: any) {
    console.error('Error during sign up:', e);
    return {
      success: false,
      message: e.message || 'Failed to create user.',
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: 'User not found.'
      }
    }
    await setSessionCookie(idToken);
    return { success: true, message: 'Signed in successfully.' };
  } catch (e) {
    console.error('Sign-in error:', e);
    return {
      success: false,
      message: 'Failed to log into an account'
    }
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStor = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: OneWeek * 1000
  })
  cookieStor.set('session', sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge: OneWeek * 1000
  })
}

export async function getCurrentUser(): Promise<AppUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    return null;
  }
  try {
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection('users').doc(decodedToken.uid).get();
    if (!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      id: userRecord.id
    } as AppUser;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function isAuthenticated() {
  try {
    const User = await getCurrentUser();
    return !!User;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
}