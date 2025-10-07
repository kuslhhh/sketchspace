import ArrowIcon from '@repo/ui/arrow'
import DraggableText from '@repo/ui/dragable'
import React from 'react'

export default function Home() {
   return (
      <div className='h-screen w-screen flex flex-col justify-center items-center'>
         <div className='flex'>
            <div className='text-6xl text-orange-400 pb-2 no-underline hover:underline font-bold'>
               <DraggableText children='SketchSpace' />
            </div>
         </div>
         <div className='text-2xl'>
            Your infinite canvas for ideas, collaboration, and creativity.
         </div>
      </div>
   )
}