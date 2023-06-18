import express, { Request, Response } from "express";
import { getLineById } from "./fileModel";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from('<a href="/lines/1">api</a>'));
});

app.get("/lines/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(413).send("Invalid line id format, it must be a number");
    return;
  }

  getLineById(Number(id))
    .then((line) => {
      res.send(line);
    })
    .catch((err: Error) => {
      if (err.message == "User input") {
        // 404 and "line not found" could fit better my design
        res.status(413).send("requested line is beyond the end of the file");
        return;
      }
      res.status(500).end("Internal Server Error, try again");
    });
});

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
  app.listen(process.env.PORT || 3000);
}

export const viteNodeApp = app;
