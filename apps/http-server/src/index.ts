import express from "express"
import "dotenv/config"
import cors from "cors"
import { userRouter } from "./routes/usersRoutes.js";
import cookieParser from "cookie-parser";
import { roomPost } from "./controllers/roomController.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import { roomRouter } from "./routes/roomRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/auth", userRouter)
app.use("/chat", verifyToken, roomRouter)


app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});