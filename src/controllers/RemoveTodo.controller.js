import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const RemoveTodo = async(req,res)=> {
  const error= validationResult(req);
  if(!error.isEmpty()){
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Todo Id is required",error.mapped()))
  }

  // now delete the to do   
  try {
    const result= await Todo.findOneAndDelete({
        userId: req.userId,
        _id:req.body.todo_id
    });
    if(result){
        const user=await User.findOneAndUpdate({
            _id:req.userId,
        },{
            $pull:{todos:req.body.todo_id}   // uss wale ko bahar nikal lo jo remove karna hai
        })
        return res.json(jsonGenerate(StatusCode.SUCCESS,"Todo Deleted",null))
    }
  } catch (error) {
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Could not delete",null))
  }
}
