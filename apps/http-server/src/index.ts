import express from "express"
import "dotenv/config"
import cors from "cors"
import { userRouter } from "./routes/usersRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api", userRouter)


app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});