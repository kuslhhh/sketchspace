import React, { ReactNode } from 'react'


export default function Layout({ children }: {
   children: React.ReactNode
}) {
   return (
      <div className='h-screen w-screen p-10 flex justify-center items-center'>
         {children}
      </div>
   )
}
