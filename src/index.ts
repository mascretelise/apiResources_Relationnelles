import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: '.env' });
import bodyParser from "body-parser";
const app = express();
import { Request, Response} from 'express';
import cookieParser from "cookie-parser";
import ressourcesRoute from "./routes/ressourcesRoute";
import settingsRoute from "./routes/settingsRoute";
import authentificationRoutes from "./routes/authentificationRoute";
import { setupSwagger } from "../swagger";

setupSwagger(app);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);


app.get("/", (req:Request, res:Response) => {
  res
    .status(200)
    .send(
      "This is not why you're here. Head to /user/:id and replace :id with your user id"
    );
});

// Lancer le serveur
app.listen(process.env.API_PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.API_PORT}`);
});




app.use("/api", authentificationRoutes);


app.use("/api", ressourcesRoute);

app.use("/api", settingsRoute)


export default app;
