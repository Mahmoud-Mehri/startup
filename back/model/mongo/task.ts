import mongoose, { Schema } from "mongoose";

export interface ITask {
  title: string;
  isDone: boolean;
  phaseId: mongoose.Types.ObjectId;
}

const TaskSchema = new mongoose.Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
    required: true,
  },
  phaseId: {
    type: Schema.Types.ObjectId,
    ref: "Phase",
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export { TaskModel };
