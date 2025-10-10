"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Chats() {

   const [roomId, setRoomId] = useState("")
   const router = useRouter()

   return (
      <div>
         <input
            className='border border-amber-50 px-4 py-3 text-center font-bold bg-zinc-800 m-5 rounded-2xl '
            type="text"
            placeholder='Room id'
            onChange={(e) => {
               setRoomId(e.target.value)
            }}
         />

         <button
            className='bg-[#939395] text-[#27272a] px-4 py-3 text-center font-bold rounded-2xl cursor-pointer'
            onClick={() => {
               router.push(`/chat/${roomId}`)
            }}
         >
            Join Room
         </button>
      </div>
   )
}
