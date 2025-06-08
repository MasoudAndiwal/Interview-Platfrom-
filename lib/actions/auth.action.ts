'use server'

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
const OneWeek = 60 * 60 * 24 * 60;



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



export async function signIn(params : SignInParams){
    const {email , idToken} = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return{
                success : false,
                message : 'User not found.'
            }
        }
        await setSessionCookie(idToken);
    } catch (e) {
        console.log(e);
        return{
            success : false,
            message : 'Faild to log into an account '
        }
    }
}
export async function setSessionCookie(idToken : string){
    const cookieStor = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken , {
        expiresIn : OneWeek * 1000
    })
    cookieStor.set('session' , sessionCookie , {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        path : '/',
        sameSite : 'lax',
        maxAge : OneWeek * 1000
    })

}


// export async function signUp(params: SignUpParams){
//     const {uid, name, email} = params;

//     try {
//         const userRecord = await db.collection('users').doc(uid).get();

//         if (userRecord.exists) {
//             return {
//                 success: false,
//                 message: 'User already exists. Please sign in instead.'
//             }
//         }

//         await db.collection('users').doc(uid).set({ name, email });

//         return {
//             success: true,
//             message: 'User created successfully.'
//         }

//     } catch (e: any) {
//         console.error('Error creating a user:', e);
//         if (e.code === 'auth/email-already-in-use') {
//             return {
//                 success: false,
//                 message: 'This email is already in use'
//             }
//         }
//         return {
//             success: false,
//             message: 'Failed to create user.'
//         }
//     }
    // }

// export const signUp = async ({ uid, name, email, password }: SignUpParams) => {
//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         body: JSON.stringify({ uid, name, email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       const data = await res.json();
//       return data; // Should be: { success: true } or { success: false, message: '...' }
//     } catch (error) {
//       console.error('Signup API error:', error);
//       return { success: false, message: 'Server error' };
//     }
//   };
  

// params: { name, email, password }