
import Task from '../models/Task.js'

// Create Task

export const createTask = async (req, res, next) => {
    try {
        const task = await Task.create({...req.body, createdBy: req.user._id});
        res.status(201).json(task)
        
    } catch (err) {
        next(err)
    }
}

export const getMyTask = async (req, res, next) =>{
    try {
        const task = await Task.find({createdBy: req.user._id});
        res.status(201).json(task)
    } catch (err) {
        next(err)
    }
}

export const updateTask = async (req, res, next) =>{
    try {
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id, createdBy: req.user._id},
            req.body,
            {new: true}
        )
        if(!task) return res.status(400).json({message: "Tasks Not Found"});
        res.json(task)
    } catch (err) {
        next(err)
    }
}

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

