import axios from "axios";
import {
  taskListLoading,
  taskListSuccess,
  taskListFailure,
  createTaskProgress,
  createTaskSuccess,
  createTaskFailure,
  deleteTaskProgress,
  deleteTaskSuccess,
  deleteTaskFailure,
  doneTaskProgress,
  doneTaskSuccess,
  doneTaskFailure,
  undoneTaskProgress,
  undoneTaskSuccess,
  undoneTaskFailure,
  getFactProgress,
  getFactSuccess,
  getFactFailure,
  updateTaskList,
} from "./actions";
import { FACT_ADDRESS, ROUTE_TASK } from "./constants";

export const taskListRequest = () => async (dispatch) => {
  try {
    dispatch(taskListLoading());
    const response = await axios.get(ROUTE_TASK);
    if (!!response.data.success) {
      dispatch(taskListSuccess(response.data.data));
    } else {
      if (response.data.message) {
        throw { message: response.data.message };
      } else {
        throw { message: "Invalid response from server!" };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.data.message;
    } else {
      message = err.message;
    }
    dispatch(taskListFailure(message));
  }
};

export const createTaskRequest = (data) => async (dispatch) => {
  try {
    dispatch(createTaskProgress());
    const response = await axios.post(ROUTE_TASK + `/${data.phaseId}`, {
      title: data.title,
    });
    if (!!response.data.success) {
      dispatch(createTaskSuccess(response.data.data));
    } else {
      if (response.data.message) {
        throw { message: response.data.message };
      } else {
        throw { message: "Invalid response from server!" };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.data.message;
    } else {
      message = err.message;
    }
    dispatch(createTaskFailure(message));
  }
};

export const deleteTaskRequest = (data) => async (dispatch) => {
  try {
    dispatch(deleteTaskProgress());
    const response = await axios.delete(
      ROUTE_TASK + `/${data.phaseId}/${data.taskId}`
    );
    if (!!response.data.success) {
      dispatch(deleteTaskSuccess(response.data.data));
    } else {
      if (response.data.message) {
        throw { message: response.data.message };
      } else {
        throw { message: "Invalid response from server!" };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.data.message;
    } else {
      message = err.message;
    }
    dispatch(deleteTaskFailure(message));
  }
};

export const doneTaskRequest = (data) => async (dispatch) => {
  try {
    dispatch(doneTaskProgress());
    const response = await axios.put(
      ROUTE_TASK + `/${data.phaseId}/${data.taskId}/done`
    );
    if (!!response.data.success) {
      dispatch(doneTaskSuccess(response.data.data));
    } else {
      if (response.data.message) {
        throw { message: response.data.message };
      } else {
        throw { message: "Invalid response from server!" };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.data.message;
    } else {
      message = err.message;
    }
    dispatch(doneTaskFailure(message));
  }
};

export const undoneTaskRequest = (data) => async (dispatch) => {
  try {
    dispatch(undoneTaskProgress());
    const response = await axios.put(
      ROUTE_TASK + `/${data.phaseId}/${data.taskId}/undone`
    );
    if (!!response.data.success) {
      dispatch(undoneTaskSuccess(response.data.data));
    } else {
      if (response.data.message) {
        throw { message: response.data.message };
      } else {
        throw { message: "Invalid response from server!" };
      }
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.data.message;
    } else {
      message = err.message;
    }
    dispatch(undoneTaskFailure(message));
  }
};

export const getFactRequest = () => async (dispatch) => {
  try {
    dispatch(getFactProgress());
    const response = await axios.get(FACT_ADDRESS);
    if (response.status === 200) {
      dispatch(getFactSuccess(response.data.text));
    } else {
      throw { message: response.statusText };
    }
  } catch (err) {
    let message;
    if (err.response) {
      message = err.response.statusText;
    } else {
      message = err.message;
    }
    dispatch(getFactFailure(message));
  }
};

export const updateNewPhase = (data) => (dispatch) => {
  dispatch(updateTaskList(data));
};
