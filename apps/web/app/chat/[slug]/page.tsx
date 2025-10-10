import React from 'react'
import axios from 'axios';
import ChatRoom from '../../../components/chatRoom';
import { BACKEND_URL } from '../../../lib/config';


export const getRoomId = async (slug: string) => {

   const response = await axios.get(`${BACKEND_URL}/chat/${slug}`)
   return response.data.room.id;
}

export default async function ChatRoom1({
   params
}: {
   params: {
      slug: string
   }
}) {

   console.log(await params);
   const slug = (await params).slug;
   const roomId = await getRoomId(slug)
   return (
      <div>
         <ChatRoom id={roomId} />
      </div>
   )
}
