import project_management from "../models/project.models.js";
import { ApiResponse } from "../utils/apiResponseValue.js";

export const projectController = async (req, res) => {
  try {
    const value = await project_management.create(req.body);

    const responseData = new ApiResponse(
      200,
      {
        message: "OK",
      },
      true
    );

    res.json(responseData);
  } catch (error) {
    res
      .status(400)
      .json(
        new ApiResponse(400, { message: error.message, error: error }, false)
      );
  }
};

export const projectGet = async (req, res, next) => {
  try {
    const user = await project_management.find();

    return res.send(new ApiResponse(200, { value: user }, true));
  } catch (error) {
    if (error.name === "ValidationError") {
      // If Mongoose validation error, send back 400 with detailed error messages
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).send({ message: "Validation failed", errors });
    }
    console.log(error);
    return res.send({ message: error.message, error: error });
  }
};

export const projectGetbyId = async (req, res, next) => {
  const itemId = req.params.id;

  try {
    const user = await project_management.findOne({ _id: itemId });
    if (!user) {
      return res.send(new ApiResponse(400, { message: "Not Found" }, false));
    }

    return res.send(new ApiResponse(200, { value: user }, true));
  } catch (error) {
    if (error.name === "ValidationError") {
      // If Mongoose validation error, send back 400 with detailed error messages
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).send({ message: "Validation failed", errors });
    }
    console.log(error);
    return res.send({ message: error.message, error: error });
  }
};


export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("body", req.body);
    const updatedProject = await project_management.findByIdAndUpdate({_id : id }, { $set: req.body } ,{
      new: true,
      runValidators: true,
    });

    console.log("fffff updated project", updatedProject)

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(new ApiResponse(200, { value: updatedProject }, true));
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleletProjectId = async (req, res) => {
  try {
    const itemId = req.params.id;
    // Delete the item from the database
    const deletedItem = await project_management.findByIdAndDelete({_id:itemId});

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
