// import crypto from "crypto";
import { Phase } from "../model/phase";
import { Task } from "../model/task";

export enum ErrorTypes {
  NotFound,
  AlreadyDone,
  IsNotDone,
  InvalidOrder,
  Exception,
}

export class TaskController {
  private data: Array<Phase>;
  private successResponse = (data: any) => {
    return { success: true, errorType: null, message: null, data };
  };
  private errorResponse = (errType: ErrorTypes, errMessage: string) => {
    return {
      success: false,
      errorType: errType,
      message: errMessage,
      data: null,
    };
  };
  private newTaskId = () => {
    /* TO_DO:
       A Function which generates new IDs for Tasks
       to prevent having duplicate Task IDs
       Currently it's using array's length value to set a new ID
       It'll work as far as we create and delete them in same order
    */
    // return crypto.randomUUID();
  };

  constructor() {
    this.data = [];
    this.initPhases();
  }

  private createNewPhase = (title: string) => {
    try {
      const phase = {} as Phase;
      phase.id = this.data.length + 1;
      phase.title = title;
      phase.tasks = [];

      this.data.push(phase);
      return this.successResponse(phase);
    } catch (err: unknown) {
      if (err instanceof Error)
        return this.errorResponse(ErrorTypes.Exception, err.message);
      return this.errorResponse(ErrorTypes.Exception, "Unknown Error!");
    }
  };

  private isPhaseCompleted = (phaseId: number) => {
    const phaseIndex = phaseId - 1;
    return (
      this.data[phaseIndex].tasks.length > 0 &&
      !this.data[phaseIndex].tasks.some((task) => {
        return !task.isDone;
      })
    );
  };

  private hasIncompleteTaskBefore = (phaseIndex: number, taskIndex: number) => {
    let phase = this.data[phaseIndex];
    let idx = phase.tasks.findIndex((t, i) => {
      return !t.isDone;
    });
    if (idx < taskIndex) return true;
    else {
      idx = phaseIndex;
      while (idx > 0) {
        idx -= 1;
        phase = this.data[idx];
        const i = phase.tasks.findIndex((t) => {
          return !t.isDone;
        });
        if (i > -1) return true;
      }
    }
    return false;
  };

  private hasCompleteTaskAfter = (phaseIndex: number, taskIndex: number) => {
    let phase = this.data[phaseIndex];
    let idx = phase.tasks.findIndex((t, i) => {
      return !!t.isDone && i !== taskIndex;
    });
    if (idx > taskIndex) return true;
    else {
      idx = phaseIndex;
      while (idx < this.data.length - 1) {
        idx += 1;
        phase = this.data[idx];
        const i = phase.tasks.findIndex((t) => {
          return !!t.isDone;
        });
        if (i > -1) return true;
      }
    }
    return false;
  };

  private initPhases = () => {
    this.createNewPhase("Foundation");
    this.createNewPhase("Discovery");
    this.createNewPhase("Delivery");
  };

  getPhase = (id: number) => {
    try {
      // const phase = this.data[phaseId];
      let index = this.data.findIndex((ph) => {
        return ph.id === id;
      });
      console.log(`${index}`);
      if (index > -1) {
        const phase = this.data[index];

        return this.successResponse(phase);
      } else {
        return this.errorResponse(ErrorTypes.NotFound, "Phase not found!");
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        return this.errorResponse(ErrorTypes.Exception, err.message);
      return this.errorResponse(ErrorTypes.Exception, "Unknown Error!");
    }
  };

  getAllPhases = () => {
    try {
      return this.successResponse(this.data);
    } catch (err: unknown) {
      if (err instanceof Error)
        return this.errorResponse(ErrorTypes.Exception, err.message);
      return this.errorResponse(ErrorTypes.Exception, "Unknown Error!");
    }
  };

  getTask = (phaseId: number, taskId: number) => {
    try {
      // const phase = this.data[phaseId];

      let index = this.data.findIndex((ph) => {
        return ph.id === phaseId;
      });
      if (index > -1) {
        const phase = this.data[index];
        index = -1;
        index = phase.tasks.findIndex((t) => {
          return t.id === taskId;
        });
        if (index > -1) {
          const task = phase.tasks[index];
          return this.successResponse(task);
        } else {
          return this.errorResponse(ErrorTypes.NotFound, "Task not found!");
        }
      } else {
        return this.errorResponse(ErrorTypes.NotFound, "Phase not found!");
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        return this.errorResponse(ErrorTypes.Exception, err.message);
      return this.errorResponse(ErrorTypes.Exception, "Unknown Error!");
    }
  };

  createNewTask = (phaseId: number, title: string) => {
    /* TO_DO:
       In order to prevent having an Undone Task between two Done task
       We should check if there is no Done task after this new created Task
       Like what we did in makeTaskDone and makeTaskUndone functions
    */
    try {
      let index = this.data.findIndex((ph) => {
        return ph.id === phaseId;
      });
      if (index > -1) {
        const phase = this.data[index];
        const task = {} as Task;
        task.id = phase.tasks.length + 1;
        task.title = title;
        task.isDone = false;
        task.phaseId = phase.id;

        phase.tasks.push(task);
        phase.isCompleted = false; // We have at least One undone task in this phase
        return this.successResponse(phase);
      } else {
        return this.errorResponse(ErrorTypes.NotFound, "Phase not found!");
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        return this.errorResponse(ErrorTypes.Exception, err.message);
      return this.errorResponse(ErrorTypes.Exception, "Unknown Error!");
    }
  };

  makeTaskDone = (phaseId: number, taskId: number) => {
    try {
      let phaseIndex: number;
      let taskIndex: number;

      phaseIndex = this.data.findIndex((ph) => {
        return ph.id === phaseId;
      });
      if (phaseIndex > -1) {
        const phase = this.data[phaseIndex];
        taskIndex = phase.tasks.findIndex((t) => {
          return t.id === taskId;
        });
        if (taskIndex > -1) {
          const task = phase.tasks[taskIndex];
          if (this.hasIncompleteTaskBefore(phaseIndex, taskIndex)) {
            return this.errorResponse(
              ErrorTypes.InvalidOrder,
              "There is an Incomplete Task before this given Task"
            );
          } else if (!!task.isDone) {
            return this.errorResponse(
              ErrorTypes.AlreadyDone,
              "Task is already Done!"
            );
          }

          task.isDone = true;
          phase.isCompleted = this.isPhaseCompleted(phaseId);
          return this.successResponse(phase);
        } else {
          return this.errorResponse(ErrorTypes.NotFound, "Task not found!");
        }
      } else {
        return this.errorResponse(ErrorTypes.NotFound, "Phase not found!");
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        return this.errorResponse(ErrorTypes.Exception, err.message);
      return this.errorResponse(ErrorTypes.Exception, "Unknown Error!");
    }
  };

  makeTaskUndone = (phaseId: number, taskId: number) => {
    try {
      let phaseIndex: number;
      let taskIndex: number;

      phaseIndex = this.data.findIndex((ph) => {
        return ph.id === phaseId;
      });
      if (phaseIndex > -1) {
        const phase = this.data[phaseIndex];
        taskIndex = phase.tasks.findIndex((t) => {
          return t.id === taskId;
        });
        if (taskIndex > -1) {
          const task = phase.tasks[taskIndex];
          if (this.hasCompleteTaskAfter(phaseIndex, taskIndex)) {
            return this.errorResponse(
              ErrorTypes.InvalidOrder,
              "There is a Completed Task after this given Task"
            );
          } else if (!task.isDone) {
            return this.errorResponse(
              ErrorTypes.IsNotDone,
              "Task is already Undone!"
            );
          }

          task.isDone = false;
          phase.isCompleted = false; // We have at least One undone task in this phase

          return this.successResponse(phase);
        } else {
          return this.errorResponse(ErrorTypes.NotFound, "Task not found!");
        }
      } else {
        return this.errorResponse(ErrorTypes.NotFound, "Phase not found!");
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        return this.errorResponse(ErrorTypes.Exception, err.message);
      return this.errorResponse(ErrorTypes.Exception, "Unknown Error!");
    }
  };

  deleteTask = (phaseId: number, taskId: number) => {
    try {
      // const phase = this.data[phaseId];

      let index = this.data.findIndex((ph) => {
        return ph.id === phaseId;
      });
      if (index > -1) {
        const phase = this.data[index];
        index = -1;
        index = phase.tasks.findIndex((t) => {
          return t.id === taskId;
        });
        if (index > -1) {
          phase.tasks.splice(index, 1);
          phase.isCompleted = this.isPhaseCompleted(phaseId);

          return this.successResponse(phase);
        } else {
          return this.errorResponse(ErrorTypes.NotFound, "Task not found!");
        }
      } else {
        return this.errorResponse(ErrorTypes.NotFound, "Phase not found!");
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        return this.errorResponse(ErrorTypes.Exception, err.message);
      return this.errorResponse(ErrorTypes.Exception, "Unknown Error!");
    }
  };
}
