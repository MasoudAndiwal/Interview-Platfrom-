import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React from 'react'

async function layout({children}: {children: React.ReactNode}) {
    // check the user is login or not 
    const isUserAuthenticated = await isAuthenticated();
    if(isUserAuthenticated) redirect('/')
  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default layout