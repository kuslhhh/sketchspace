"use client"

import React, { useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'
import { measureMemory } from 'vm'

export default function ChatRoomClient({
   messages,
   id
}: {
   messages: { messages: string }[],
   id: string
}) {

   const [chats, setChats] = useState(messages)
   const [currentMessage, setCurrentMessage] = useState("")
   const { socket, loading } = useSocket()

   useEffect(() => {
      if (socket && !loading) {

         socket.send(JSON.stringify({
            type: "join_room",
            roomId: id
         }))

         socket.onmessage = (event) => {
            const parseData = JSON.parse(event.data)
            if (parseData.data === "chat") {
               setChats(x => [...x, { messages: parseData.message }])
            }
         }
      }
   }, [socket, loading, id])


   return (

      <div>
         {messages.map(x => (
            <div>{x.messages}</div>
         ))}

         <input
            className='border border-amber-50 px-4 py-3 text-center font-bold bg-zinc-800 m-5 rounded-2xl '
            type="text"
            placeholder='Room id'
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
         />
         <button
            className='bg-[#939395] text-[#27272a] px-4 py-3 text-center font-bold rounded-2xl cursor-pointer'
            onClick={() => {
               socket?.send(JSON.stringify({
                  type: "chat",
                  roomId: id,
                  messages: currentMessage
               }))
               setCurrentMessage("")
            }}
         >Send Message</button>
      </div>
   )
}
