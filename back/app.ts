import express, { json, urlencoded } from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schema";
import { resolvers, resolversContext } from "./graphql/resolvers";
import { ErrorTypes, TaskController } from "./controller/task-controller";
import { handle404, validatePhaseId, validateTaskId } from "./middleware";

const appContext: resolversContext = {
  taskController: new TaskController(),
};

const app = express();
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: appContext,
});

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

/* 
   We should have separate files for each resource
   and define all related routes to that file, but here we have
   one resource, so I have put them all in App.ts file
*/

// Validating IDs before using Controller
app.use("/phase/:id", validatePhaseId);
app.use("/phase/:id/:taskId", validatePhaseId, validateTaskId);

app.get("/phase", (req, res) => {
  const { success, data, errorType, message } =
    appContext.taskController.getAllPhases();
  if (!success) {
    switch (errorType) {
      case ErrorTypes.Exception:
        return res.status(500).json({ success, data: null, message });
      default:
        return res
          .status(500)
          .json({ success, data: null, message: "Unknown Error!" });
    }
  } else {
    return res.status(200).json({ success, data, message: null });
  }
});

// Get a Phase by ID
app.get("/phase/:id", (req, res) => {
  const phaseId = parseInt(req.params.id);

  const { success, data, errorType, message } =
    appContext.taskController.getPhase(phaseId);
  if (!success) {
    switch (errorType) {
      case ErrorTypes.Exception:
        return res.status(500).json({ success, data: null, message });
      default:
        return res
          .status(500)
          .json({ success, data: null, message: "Unknown Error!" });
    }
  } else {
    return res.status(200).json({ success, data, message: null });
  }
});

// Add New Task to the Phase
app.post("/phase/:id", (req, res) => {
  const phaseId = parseInt(req.params.id);
  const task = req.body;
  if (!task.title) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Invalid request body!" });
  }

  const { success, data, errorType, message } =
    appContext.taskController.createNewTask(phaseId, task.title);
  if (!success) {
    switch (errorType) {
      case ErrorTypes.Exception:
        return res.status(500).json({ success, data: null, message });
      case ErrorTypes.NotFound:
        return res.status(200).json({ success, data: null, message });
      default:
        return res
          .status(500)
          .json({ success, data: null, message: "Unknown Error!" });
    }
  } else {
    return res.status(200).json({ success, data, message: null });
  }
});

// Make a task Done
app.put("/phase/:id/:taskId/done", (req, res) => {
  const phaseId = parseInt(req.params.id);
  const taskId = parseInt(req.params.taskId);

  const { success, data, errorType, message } =
    appContext.taskController.makeTaskDone(phaseId, taskId);
  if (!success) {
    switch (errorType) {
      case ErrorTypes.Exception:
        return res.status(500).json({ success, data: null, message });
      case ErrorTypes.NotFound:
        return res.status(200).json({ success, data: null, message });
      case ErrorTypes.AlreadyDone:
        return res.status(200).json({ success, data: null, message });
      case ErrorTypes.InvalidOrder:
        return res.status(200).json({ success, data: null, message });
      default:
        return res
          .status(500)
          .json({ success, data: null, message: "Unknown Error!" });
    }
  } else {
    return res.status(200).json({ success, data, message: null });
  }
});

// Make a task Undone
app.put("/phase/:id/:taskId/undone", (req, res) => {
  const phaseId = parseInt(req.params.id);
  const taskId = parseInt(req.params.taskId);

  const { success, data, errorType, message } =
    appContext.taskController.makeTaskUndone(phaseId, taskId);
  if (!success) {
    switch (errorType) {
      case ErrorTypes.Exception:
        return res.status(500).json({ success, data: null, message });
      case ErrorTypes.NotFound:
        return res.status(200).json({ success, data: null, message });
      case ErrorTypes.IsNotDone:
        return res.status(200).json({ success, data: null, message });
      case ErrorTypes.InvalidOrder:
        return res.status(200).json({ success, data: null, message });
      default:
        return res
          .status(500)
          .json({ success, data: null, message: "Unknown Error!" });
    }
  } else {
    return res.status(200).json({ success, data, message: null });
  }
});

// Delete a task from Phase
app.delete("/phase/:id/:taskId", (req, res) => {
  const phaseId = parseInt(req.params.id);
  let taskId = parseInt(req.params.taskId);

  const { success, data, errorType, message } =
    appContext.taskController.deleteTask(phaseId, taskId);
  if (!success) {
    switch (errorType) {
      case ErrorTypes.Exception:
        return res.status(500).json({ success, data: null, message });
      case ErrorTypes.NotFound:
        return res.status(200).json({ success, data: null, message });
      default:
        return res
          .status(500)
          .json({ success, data: null, message: "Unknown Error!" });
    }
  } else {
    return res.status(200).json({ success, data, message: null });
  }
});

// Get a specific Task
app.get("/phase/:id/:taskId", (req, res) => {
  const phaseId = parseInt(req.params.id);
  const taskId = parseInt(req.params.taskId);

  const { success, data, errorType, message } =
    appContext.taskController.getTask(phaseId, taskId);
  if (!success) {
    switch (errorType) {
      case ErrorTypes.Exception:
        return res.status(500).json({ success, data: null, message });
      case ErrorTypes.NotFound:
        return res.status(200).json({ success, data: null, message });
      default:
        return res
          .status(500)
          .json({ success, data: null, message: "Unknown Error!" });
    }
  } else {
    return res.status(200).json({ success, data, message: null });
  }
});

server
  .start()
  .then(() => {
    server.applyMiddleware({ app, path: "/graphql" });
    app.use(handle404);
  })
  .then(() => {
    app.listen(3001, () => {
      console.log(`App is listening on port 3001`);
    });
  })
  .catch((err) => {
    console.log(`Error on activating Server: ${err.message}`);
  });

// server.listen({ port: 3001 }).then((serverInfo) => {
//   console.log(
//     `Server is listening at Address ${serverInfo.address} and on Port ${serverInfo.port}`
//   );
// });
