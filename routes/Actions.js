const express = require("express");
const actionDB = require("../data/helpers/actionModel");
const projectDB = require('../data/helpers/projectModel')
const router = express.Router({
    mergeParams: true
  });
  
router.post("/", validateProjectID(),validateActionID() ,validateAction(), async (req, res, next) => {
    try{
        res.status(201).send(await actionDB.insert(req.newActionBody))
    }catch(error){
        next(error)
    }
});

router.get("/",validateProjectID(), async (req, res, next) => {
  try {
    res.status(200).send(await actionDB.get());
  } catch (error) {
    next(error);
  }
});

router.get("/:actionID", validateProjectID(),validateActionID(), async (req, res, next) => {
  try {
    res.status(200).send(await action.get(req.params.actionID));
  } catch (error) {
    next(error);
  }
});

router.delete("/:actionID", validateProjectID(), validateActionID(), async (req, res, next) => {
    try{
        await actionDB.remove(req.params.actionID)
        res.status(200).json({success:"Action Deleted Succesfully!"})
    }catch(error){
        next(error)
    }
});

router.put("/:actionID", validateProjectID(),validateActionID(),validateAction(), async (req, res, next) => {
    try{
        res.status(201).send(await actionDB.update(req.params.actionID, req.newActionBody))
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
function validateActionID() {
  return async (req, res, next) => {
    const getActions = await actionDB.get(req.params.actionID);
    if (!getActions) {
      res.status(404).send({ error: "Action Not Found" });
    } else {
      req.Action = getActions;
      next();
    }
  };
}

function validateAction() {
  return async (req, res, next) => {
    if (!req.body.description || !req.body.notes) {
      res
        .status(404)
        .send({ error: "Action Body requires Notes & Description" });
    } else {
      const newActionBody = {
        project_id: req.params.id,
        notes: req.body.notes,
        description: req.body.description,
        completed: req.body.completed || false
      };
      req.newActionBody = newActionBody;
      next();
    }
  };
}
module.exports = router;
