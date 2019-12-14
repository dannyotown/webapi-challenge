/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, just API

Go code!
*/
const express = require("express");
const projects = require('./routes/Projects')
const server = express();
server.use(express.json());
// Bring all our subroutes into the main application
// (Remember, subroutes can have more children routers)
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
server.listen(4040, () => {
  console.log("\n*** Server Running on http://localhost:4040 ***\n");
});