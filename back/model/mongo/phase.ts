import mongoose from "mongoose";
import { ITask } from "./task";

export interface IPhase {
  title: string;
  tasks: mongoose.Types.DocumentArray<ITask>;
  isCompleted: boolean;
}

const PhaseSchema = new mongoose.Schema<IPhase>({
  title: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Task",
    },
  ],
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const PhaseModel = mongoose.model("Phase", PhaseSchema);

export { PhaseModel };
