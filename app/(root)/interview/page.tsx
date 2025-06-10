import React from 'react'
import Agent from '@/components/Agent'
import { getCurrentUser, AppUser } from '@/lib/actions/auth.action'

async function page() {
  const user = await getCurrentUser() as AppUser | null
  if (!user) {
    return <div>Please log in to access this page.</div>
  }
  return (
    <>
    <h3>Interview Generator</h3>
    <Agent userName={user.name || 'Unknown User'} userId={user.id} type='generate'/>
    </>
  )
}

export default page