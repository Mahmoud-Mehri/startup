import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RiAddBoxFill, RiHistoryFill } from "react-icons/ri";
import {
  getCreateTaskResult,
  getCreateTaskError,
  getCreateTaskMessage,
  getCreateTaskProgress,
} from "../redux/selectors";
import { createTaskRequest, setUpdatedPhase } from "../redux/thunks";
import "./NewTask.css";

const NewTask = ({
  inProgress,
  phase,
  error,
  message,
  createNewTask,
  phaseId,
  setNewPhase,
  ...props
}) => {
  const [title, setTitle] = useState("");
  const [newTask, setNewTask] = useState(false);
  const button = inProgress ? (
    <RiHistoryFill className="loading" />
  ) : (
    <RiAddBoxFill
      className="btn-submit"
      onClick={() => {
        if (title.trim().length == 0) return;
        setNewTask(true);
        createNewTask({ phaseId, title: title.trim() });
        setTitle("");
      }}
    />
  );

  if (!(inProgress || error) && newTask) {
    setNewPhase(phase);
    setNewTask(false);
  } else {
    if (error) setNewTask(false);
  }

  return (
    <div className="new-task-form">
      <label>
        New Task:{" "}
        <input
          type="text"
          name="name"
          size={25}
          maxLength={50}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>
      {button}
    </div>
  );
};

const mapStateToProps = (state) => ({
  inProgress: getCreateTaskProgress(state),
  phase: getCreateTaskResult(state),
  error: getCreateTaskError(state),
  message: getCreateTaskMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  createNewTask: (data) => dispatch(createTaskRequest(data)),
  // setNewPhase: (phase) => dispatch(setUpdatedPhase(phase)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
