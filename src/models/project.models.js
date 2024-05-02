import mongoose from "mongoose";
import validator from "validator";
const { ObjectId } = mongoose.Schema.Types;

const { Schema, model } = mongoose;

const project = new Schema(
  {
    projectName: {
      type: String,
      minLength: 5,
      maxLength: 20,
      required: true,
    },

    assigne_name: {
      type: String,
      //   unique: true,
      //   validate: [validator.isEmail, "Please enter a valid email"],
      minLength: 5,
      maxLength: 20,
      required: true,
    },

    dueDate: {
      type: Date,

      required: true,
    },
    description: {
      type: String,
      minLength: 5,
      required: true,
    },

    assignedEmployees: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      default: "To Do",
      enum: ["To Do", "In Progress", "Done"],
    },
  },
  {
    timestamps: true,
  }
);

const project_management = model("project_management", project);

export default project_management;
