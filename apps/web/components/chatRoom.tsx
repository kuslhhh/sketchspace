import axios from "axios"
import { BACKEND_URL } from "../lib/config"
import ChatRoomClient from "./chatRoomClient";

async function getChats(roomId: string) {
   const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
   return response.data.messages;
}

export default async function ChatRoom({ id }: {

   id: string
}) {
   const messages = await getChats(id)

   return <ChatRoomClient id={id} messages={messages} />
}
