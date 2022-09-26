// TASK_LIST
export const getTaskListLoading = (state) => {
  const { taskList } = state;
  return taskList.loading;
};

export const getTaskList = (state) => {
  const { taskList } = state;
  return taskList.phases;
};

export const getTaskListError = (state) => {
  const { taskList } = state;
  return taskList.error;
};

export const getTaskListMessage = (state) => {
  const { taskList } = state;
  return taskList.message;
};

// TASK_CREATE
export const getCreateTaskProgress = (state) => {
  const { createTask } = state;
  return createTask.inProgress;
};

export const getCreateTaskResult = (state) => {
  const { createTask } = state;
  return createTask.phase;
};

export const getCreateTaskError = (state) => {
  const { createTask } = state;
  return createTask.error;
};

export const getCreateTaskMessage = (state) => {
  const { createTask } = state;
  return createTask.message;
};

// TASK_DELETE
export const getDeleteTaskProgress = (state) => {
  const { deleteTask } = state;
  return deleteTask.inProgress;
};

export const getDeleteTaskResult = (state) => {
  const { deleteTask } = state;
  return deleteTask.phase;
};

export const getDeleteTaskError = (state) => {
  const { deleteTask } = state;
  return deleteTask.error;
};

export const getDeleteTaskMessage = (state) => {
  const { deleteTask } = state;
  return deleteTask.message;
};

// TASK_DONE
export const getDoneTaskProgress = (state) => {
  const { doneTask } = state;
  return doneTask.inProgress;
};

export const getDoneTaskResult = (state) => {
  const { doneTask } = state;
  return doneTask.phase;
};

export const getDoneTaskError = (state) => {
  const { doneTask } = state;
  return doneTask.error;
};

export const getDoneTaskMessage = (state) => {
  const { doneTask } = state;
  return doneTask.message;
};

// TASK_UNDONE
export const getUndoneTaskProgress = (state) => {
  const { undoneTask } = state;
  return undoneTask.inProgress;
};

export const getUndoneTaskResult = (state) => {
  const { undoneTask } = state;
  return undoneTask.phase;
};

export const getUndoneTaskError = (state) => {
  const { undoneTask } = state;
  return undoneTask.error;
};

export const getUndoneTaskMessage = (state) => {
  const { undoneTask } = state;
  return undoneTask.message;
};

// GET_FACT
export const getFactLoading = (state) => {
  const { getFact } = state;
  return getFact.isLoading;
};

export const getFactResult = (state) => {
  const { getFact } = state;
  return getFact.fact;
};

export const getFactError = (state) => {
  const { getFact } = state;
  return getFact.error;
};

export const getFactMessage = (state) => {
  const { getFact } = state;
  return getFact.message;
};
