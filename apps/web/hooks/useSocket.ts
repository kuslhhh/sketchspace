import { useEffect, useState } from "react"
import { WS_URL } from "../lib/config"

export const useSocket = () => {
   const [loading, setLoading] = useState(true)
   const [socket, setSocket] = useState<WebSocket | null>(null)


   useEffect(() => {

      const ws = new WebSocket(WS_URL);
      ws.onopen = () => {
         setLoading(false);
         setSocket(ws);
      };

      ws.onclose = () => {
         setLoading(true);
         setSocket(null);
      };

      return () => {
         ws.close();
      };
}, [])

return { 
   socket,loading
   }
}