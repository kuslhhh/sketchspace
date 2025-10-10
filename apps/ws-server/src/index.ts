import WebSocket, { WebSocketServer } from "ws"
import jwt, { decode, JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-config/config"
import { prisma } from "@repo/db-config/db"
const PORT = 8081

const wss = new WebSocketServer({ port: PORT });

console.log(`WS server started on port ${PORT}`);
interface Users {
   ws: WebSocket,
   rooms: string[],
   userId: string
}

const users: Users[] = []

export const checkUser = (token: string): string | null => {
   try {

      const decoded = jwt.verify(token, JWT_SECRET)

      if (typeof decoded == "string") {
         return null;
      }

      if (!decoded || !decoded.userId) {
         return null;
      }

      return decoded.userId;
   } catch (e: any) {
      console.error('JWT verification failed: ', e instanceof Error ? e.message : "Unknown error");
      return null;
   }
}

wss.on('connection', (ws, request) => {

   const url = request.url;
   if (!url) { return; }

   const queryParams = new URLSearchParams(url.split('?')[1])
   const token = queryParams.get("token") || ""

   const userId = checkUser(token)

   if (userId == null) {
      ws.close()
      return null;
   }

   users.push({
      userId,
      rooms: [],
      ws
   })

   ws.on('message', async (data) => {
      const parsedData = JSON.parse(data as unknown as string);

      if (parsedData.type === "join_room") {
         const user = users.find(x => x.ws === ws);
         user?.rooms.push(parsedData.roomId);
      }

      if (parsedData.type === "leave_room") {
         const user = users.find(x => x.ws === ws);
         if (!user) return;

         user.rooms = user?.rooms.filter(x => x !== parsedData.roomId)
      }

      if (parsedData.type === "chat") {
         const roomId = parsedData.roomId;
         const message = parsedData.message;

         await prisma.chat.create({
            data: {
               roomId,
               message,
               userId
            }
         })

         users.forEach(user => {
            if (user.rooms.includes(roomId)) {
               user.ws.send(JSON.stringify({
                  type: "chat",
                  message: message,
                  roomId
               }))
            }
         })
      }
      ws.on('close', () => {
         const index = users.findIndex(x => x.ws === ws);
         if (index !== -1) {
            users.splice(index, 1)
         }
      })
   })
})