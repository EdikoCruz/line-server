import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from('<a href="/lines/1">api</a>'));
});

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
  app.listen(process.env.PORT || 3000);
}

export const viteNodeApp = app;
