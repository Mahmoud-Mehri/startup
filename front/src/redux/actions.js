export const TASK_LIST_LOADING = "TASK_LIST_LOADING";
export const taskListLoading = () => {
  return {
    type: TASK_LIST_LOADING,
    payload: null,
  };
};

export const TASK_LIST_SUCCESS = "TASK_LIST_SUCCESS";
export const taskListSuccess = (phases) => {
  return {
    type: TASK_LIST_SUCCESS,
    payload: { phases, message: "Phases are successfully loaded" },
  };
};

export const TASK_LIST_FAILURE = "TASK_LIST_FAILURE";
export const taskListFailure = (message) => {
  return {
    type: TASK_LIST_FAILURE,
    payload: { message },
  };
};

// We use this action to update Phase list
// with the new Phase we recieve from server after making any changes
export const UPDATE_TASK_LIST = "UPDATE_TASK_LIST";
export const updateTaskList = (phase) => {
  return {
    type: UPDATE_TASK_LIST,
    payload: { phase },
  };
};

export const TASK_CREATE_PROGRESS = "TASK_CREATE_PROGRESS";
export const createTaskProgress = () => {
  return {
    type: TASK_CREATE_PROGRESS,
    payload: null,
  };
};

export const TASK_CREATE_SUCCESS = "TASK_CREATE_SUCCESS";
export const createTaskSuccess = (phase) => {
  return {
    type: TASK_CREATE_SUCCESS,
    payload: { phase },
  };
};

export const TASK_CREATE_FAILURE = "TASK_CREATE_FAILURE";
export const createTaskFailure = (message) => {
  return {
    type: TASK_CREATE_FAILURE,
    payload: { message },
  };
};

export const TASK_DELETE_PROGRESS = "TASK_DELETE_PROGRESS";
export const deleteTaskProgress = () => {
  return {
    type: TASK_DELETE_PROGRESS,
    payload: null,
  };
};

export const TASK_DELETE_SUCCESS = "TASK_DELETE_SUCCESS";
export const deleteTaskSuccess = (phase) => {
  return {
    type: TASK_DELETE_SUCCESS,
    payload: { phase },
  };
};

export const TASK_DELETE_FAILURE = "TASK_DELETE_FAILURE";
export const deleteTaskFailure = (message) => {
  return {
    type: TASK_DELETE_FAILURE,
    payload: { message },
  };
};

export const TASK_DONE_PROGRESS = "TASK_DONE_PROGRESS";
export const doneTaskProgress = () => {
  return {
    type: TASK_DONE_PROGRESS,
    payload: null,
  };
};

export const TASK_DONE_SUCCESS = "TASK_DONE_SUCCESS";
export const doneTaskSuccess = (phase) => {
  return {
    type: TASK_DONE_SUCCESS,
    payload: { phase },
  };
};

export const TASK_DONE_FAILURE = "TASK_DONE_FAILURE";
export const doneTaskFailure = (message) => {
  return {
    type: TASK_DONE_FAILURE,
    payload: { message },
  };
};

export const TASK_UNDONE_PROGRESS = "TASK_UNDONE_PROGRESS";
export const undoneTaskProgress = () => {
  return {
    type: TASK_UNDONE_PROGRESS,
    payload: null,
  };
};

export const TASK_UNDONE_SUCCESS = "TASK_UNDONE_SUCCESS";
export const undoneTaskSuccess = (phase) => {
  return {
    type: TASK_UNDONE_SUCCESS,
    payload: { phase },
  };
};

export const TASK_UNDONE_FAILURE = "TASK_UNDONE_FAILURE";
export const undoneTaskFailure = (message) => {
  return {
    type: TASK_UNDONE_FAILURE,
    payload: { message },
  };
};

export const GET_FACT_PROGRESS = "GET_FACT_PROGRESS";
export const getFactProgress = () => {
  return {
    type: GET_FACT_PROGRESS,
    payload: null,
  };
};

export const GET_FACT_SUCCESS = "GET_FACT_SUCCESS";
export const getFactSuccess = (fact) => {
  return {
    type: GET_FACT_SUCCESS,
    payload: { fact },
  };
};

export const GET_FACT_FAILURE = "GET_FACT_FAILURE";
export const getFactFailure = (message) => {
  return {
    type: GET_FACT_FAILURE,
    payload: { message },
  };
};
