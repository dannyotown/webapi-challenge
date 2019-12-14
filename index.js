const express = require("express");
const projects = require('./routes/Projects')
const server = express();

const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || 8080

server.use(express.json());

server.use((req,res,next)=>{
  console.log(`Method Used: ${req.method} --- URL Used: ${req.originalUrl} ---- TimeStamp: ${new Date} `)
next();
})
server.use("/api/projects", projects);

server.use((err, req, res, next) => {
  console.log(err),
    res.status(500).json({
      message: "Internal error occured, please try again later!"
    });
});
server.listen(port, host, () => {
  console.log("\n*** Server Running on http://localhost:8080 ***\n");
});