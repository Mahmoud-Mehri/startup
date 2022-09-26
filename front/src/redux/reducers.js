import {
  TASK_LIST_LOADING,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAILURE,
  TASK_CREATE_PROGRESS,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAILURE,
  TASK_DELETE_PROGRESS,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAILURE,
  TASK_DONE_PROGRESS,
  TASK_DONE_SUCCESS,
  TASK_DONE_FAILURE,
  TASK_UNDONE_PROGRESS,
  TASK_UNDONE_SUCCESS,
  TASK_UNDONE_FAILURE,
  GET_FACT_PROGRESS,
  GET_FACT_SUCCESS,
  GET_FACT_FAILURE,
  UPDATE_TASK_LIST,
} from "./actions";

import { OperationTypes } from "./constants";

const listInitialState = {
  loading: false,
  phases: [],
  error: false,
  message: "",
};

export const taskList = (state = listInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASK_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
      };
    case TASK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        phases: payload.phases,
        message: payload.message,
      };
    case TASK_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: payload.message,
      };
    case UPDATE_TASK_LIST: {
      return {
        ...state,
        loading: false,
        phases: state.phases.map((phase) => {
          if (phase.id === payload.phase.id) return payload.phase;
          return phase;
        }),
        error: false,
        message: "",
      };
    }
    default:
      return state;
  }
};

const initialState = {
  inProgress: false,
  phase: null,
  error: false,
  message: "",
};

export const createTask = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASK_CREATE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        phase: null,
        error: false,
        message: "",
      };
    }
    case TASK_CREATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        phase: payload.phase,
        error: false,
        message: "",
      };
    }
    case TASK_CREATE_FAILURE: {
      return {
        ...state,
        inProgress: false,
        phase: null,
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};

export const doneTask = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASK_DONE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        phase: null,
        error: false,
        message: "",
      };
    }
    case TASK_DONE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        phase: payload.phase,
        error: false,
        message: "",
      };
    }
    case TASK_DONE_FAILURE: {
      return {
        ...state,
        inProgress: false,
        phase: null,
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};

export const undoneTask = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASK_UNDONE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        phase: null,
        error: false,
        message: "",
      };
    }
    case TASK_UNDONE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        phase: payload.phase,
        error: false,
        message: "",
      };
    }
    case TASK_UNDONE_FAILURE: {
      return {
        ...state,
        inProgress: false,
        phase: null,
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};

export const deleteTask = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASK_DELETE_PROGRESS: {
      return {
        ...state,
        inProgress: true,
        phase: null,
        error: false,
        message: "",
      };
    }
    case TASK_DELETE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        phase: payload.phase,
        error: false,
        message: "",
      };
    }
    case TASK_DELETE_FAILURE: {
      return {
        ...state,
        inProgress: false,
        phase: null,
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};

const factInitState = {
  isLoading: false,
  fact: "",
  error: false,
  message: "",
};

export const getFact = (state = factInitState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FACT_PROGRESS: {
      return {
        ...state,
        isLoading: true,
        fact: "",
        error: false,
        message: "",
      };
    }
    case GET_FACT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        fact: payload.fact,
        error: false,
        message: "",
      };
    }
    case GET_FACT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        fact: "",
        error: true,
        message: payload.message,
      };
    }
    default:
      return state;
  }
};
