import { ErrorTypes, TaskController } from "../controller/task-controller";

export interface resolversContext {
  taskController: TaskController;
}

const mapErrorType = (
  errorType: ErrorTypes | null,
  msg: string | null
  // We could set "strictNullCheck" to false in tsConfig file
  // but it would be useful in many other cases
) => {
  // We can use errorType and Error Types defined in Schema
  // to show customized error message in Resolver level,
  // here I'm getting Error Message from controller object
  console.log(`${errorType}`);
  switch (errorType) {
    case ErrorTypes.NotFound:
      return {
        __typename: "NotFoundError",
        message: msg,
      };
    case ErrorTypes.InvalidOrder:
      return { __typename: "InvalidOrderError", message: msg };
    case ErrorTypes.AlreadyDone:
      return { __typename: "AlreadyDoneError", message: msg };
    case ErrorTypes.IsNotDone:
      return { __typename: "IsNotDoneError", message: msg };
    case ErrorTypes.Exception:
      return { __typename: "ExceptionError", message: msg };
    default:
      return {
        __typename: "UnknownError",
        message: "Unknown Error!",
      };
  }
};

export const resolvers = {
  Query: {
    getPhase: (parent: undefined, args: any, context: resolversContext) => {
      let phaseId: number;
      try {
        phaseId = parseInt(args.id);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `id` is not valid!"
        );
      }
      const { success, data, errorType, message } =
        context.taskController.getPhase(phaseId);

      if (!success) {
        return mapErrorType(errorType, message);
      } else {
        return {
          __typename: "Phase",
          ...data,
        };
      }
    },
    getAllPhases: (parent: undefined, args: any, context: resolversContext) => {
      const { success, data, errorType, message } =
        context.taskController.getAllPhases();
      if (!success) {
        return mapErrorType(errorType, message);
      } else {
        return {
          __typename: "PhaseArray",
          phases: data,
        };
      }
    },

    getTask: (parent: undefined, args: any, context: resolversContext) => {
      let phaseId: number;
      let taskId: number;
      try {
        phaseId = parseInt(args.input.phaseId);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `phaseId` is not valid!"
        );
      }

      try {
        taskId = parseInt(args.input.id);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `taskId` is not valid!"
        );
      }

      const { success, data, errorType, message } =
        context.taskController.getTask(phaseId, taskId);
      if (!success) {
        return mapErrorType(errorType, message);
      } else {
        return {
          __typename: "PhaseArray",
          phases: data,
        };
      }
    },
  },

  Mutation: {
    createTask: (parent: undefined, args: any, context: resolversContext) => {
      console.log(`args value: ${JSON.stringify(args)}`);
      let phaseId: number;
      try {
        phaseId = parseInt(args.input.phaseId);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `phaseId` is not valid!"
        );
      }
      const { success, data, errorType, message } =
        context.taskController.createNewTask(phaseId, args.input.title);
      if (!success) {
        return mapErrorType(errorType, message);
      } else {
        return {
          __typename: "Phase",
          ...data,
        };
      }
    },
    makeTaskDone: (parent: undefined, args: any, context: resolversContext) => {
      let phaseId: number;
      let taskId: number;
      try {
        phaseId = parseInt(args.input.phaseId);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `phaseId` is not valid!"
        );
      }

      try {
        taskId = parseInt(args.input.id);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `taskId` is not valid!"
        );
      }

      const { success, data, errorType, message } =
        context.taskController.makeTaskDone(phaseId, taskId);
      if (!success) {
        return mapErrorType(errorType, message);
      } else {
        return {
          __typename: "Phase",
          ...data,
        };
      }
    },
    makeTaskUndone: (
      parent: undefined,
      args: any,
      context: resolversContext
    ) => {
      let phaseId: number;
      let taskId: number;
      try {
        phaseId = parseInt(args.input.phaseId);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `phaseId` is not valid!"
        );
      }

      try {
        taskId = parseInt(args.input.id);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `taskId` is not valid!"
        );
      }

      const { success, data, errorType, message } =
        context.taskController.makeTaskUndone(phaseId, taskId);
      if (!success) {
        return mapErrorType(errorType, message);
      } else {
        return {
          __typename: "Phase",
          ...data,
        };
      }
    },
    deleteTask: (parent: undefined, args: any, context: resolversContext) => {
      let phaseId: number;
      let taskId: number;
      try {
        phaseId = parseInt(args.input.phaseId);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `phaseId` is not valid!"
        );
      }

      try {
        taskId = parseInt(args.input.id);
      } catch (err) {
        return mapErrorType(
          ErrorTypes.Exception,
          "Argument `taskId` is not valid!"
        );
      }

      const { success, data, errorType, message } =
        context.taskController.deleteTask(phaseId, taskId);
      if (!success) {
        return mapErrorType(errorType, message);
      } else {
        return {
          __typename: "Phase",
          message: data,
        };
      }
    },
  },
};
