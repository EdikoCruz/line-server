import express, { Request, Response } from "express";
import { getLineById } from "./fileModel";
import { getPort, isAppRunning } from "./utils.env";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "text/html");
  res.send(
    Buffer.from(`
    <a href="/lines/1">success</a><br>
    <a href="/lines/-1">internal error</a><br>
    <a href="/lines/a">wrong format</a><br>
    <a href="/lines/6000">beyond the end of the file</a><br>
  `)
  );
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

if (!isAppRunning()) {
  app.listen(getPort());
}

export const viteNodeApp = app;
