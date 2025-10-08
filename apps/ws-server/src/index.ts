import { WebSocketServer } from "ws"
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-config/config"
import { db } from "@repo/db-config/db"
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', (ws, request) => {

   const url = request.url;
   if (!url) { return; }

   const queryParams = new URLSearchParams(url.split('?')[1])
   const token = queryParams.get("token") || ""
   const decoded = jwt.verify(token, JWT_SECRET as string)

   if (!decoded || !(decoded as JwtPayload).userId) {
      ws.close()
      return;
   }

   ws.on('message', (data) => {
      ws.send('pong')
   });
})