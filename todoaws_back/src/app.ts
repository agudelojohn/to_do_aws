import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { getUsers, getToDoTasks } from "./server.ts";

dotenv.config();
const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola, Mundo!");
});

app.get("/users", (req: Request, res: Response) => {
  getUsers()
    .then((data: any) => {
      console.log("DATA: ", data);
      res.send(data);
    })
    .catch((e: any) => {
      console.log("ERROR", e);
      res.send("Error in query");
    });
});
app.get("/todotasks", (req: Request, res: Response) => {
  getToDoTasks()
    .then((data: any) => {
      console.log("DATA: ", data);
      res.send(data);
    })
    .catch((e: any) => {
      console.log("ERROR", e);
      res.send("Error in query");
    });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost: %d", PORT);
});
