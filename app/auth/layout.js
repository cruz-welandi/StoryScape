import React from 'react'

export const metadata = {
    title: "Authentification"
}

const Layout = ({children}) => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        {children}
    </div>
  )
}

export default Layout