const express = require("express");
const projectDB = require("../data/helpers/projectModel")
const actions = require('./Actions');

const router = express.Router();

router.use("/:id/actions", actions);

router.post("/", validateProject(), async (req, res, next)=>{
    try{
        res.status(201).send(await projectDB.insert(req.newProject))
    }catch(error){
        next(error)
    }
  }
);

router.get("/", async (req, res,next) => {
    try{
        res.status(200).send(await projectDB.get())
    }catch(error){
        next(error)
    }
});

router.get('/actions/:id', validateProjectID(), async (req, res, next)=>{
    try{
        const getActions = await projectDB.getProjectActions(req.params.id)
        console.log(getActions)
        if(!getActions){
            res.status(404).json({error: "No Actions Avaliable"})
        }else{
            res.status(200).json(getActions)
        }
    }catch(error){
        next(error)
    }
})

router.get("/:id", validateProjectID(), async (req, res) => {
    try{
        res.status(200).send(req.Project)
    }catch(error){
        next(error)
    }
});

router.delete("/:id",validateProjectID(), async (req, res, next) => {
    try{
        await projectDB.remove(req.params.id)
        res.status(200).json({success:"Project Deleted Succesfully!"})
    }catch(error){
        next(error)
    }
});

router.put("/:id", validateProjectID(),validateProject(), async (req, res, next) => {
    try{
        res.status(201).send(await projectDB.update(req.params.id, req.newProject))
    }catch(error){
        next(error)
    }
});

function validateProjectID(){
    return async (req,res,next)=>{
        const getProject = await projectDB.get(req.params.id)
        if(!getProject){
            res.status(404).send({error: "Project Not Found"})
        }else{
            req.Project = getProject
            next();
        }
    }
}

function validateProject(){
    return async (req,res,next)=>{
        if(!req.body.name || !req.body.description){
            res.status(404).send({error: "Project Body requires Name & Description"})
        }else{
            const newProjectBody = {
                name: req.body.name,
                description: req.body.description,
                completed: req.body.completed || false
            }
            req.newProject = newProjectBody
            next()
        }
    }
}
module.exports = router;