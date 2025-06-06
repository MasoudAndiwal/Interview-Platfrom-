import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default layout