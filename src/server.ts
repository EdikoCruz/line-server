import express from "express"
import {env} from "node:process"

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
if (env.NODE_ENV === "production") {
    app.listen(env.LINE_SERVER_PORT || 3000);
}

export const viteNodeApp = app;
