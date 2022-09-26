import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TiTickOutline, TiTick } from "react-icons/ti";
import { MdDone, MdDelete } from "react-icons/md";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import "./TaskItem.css";
import {
  getDeleteTaskResult,
  getDeleteTaskError,
  getDeleteTaskMessage,
  getDeleteTaskProgress,
  getDoneTaskResult,
  getDoneTaskError,
  getDoneTaskMessage,
  getDoneTaskProgress,
  getUndoneTaskProgress,
  getUndoneTaskResult,
  getUndoneTaskError,
  getUndoneTaskMessage,
} from "../redux/selectors";
import {
  deleteTaskRequest,
  doneTaskRequest,
  undoneTaskRequest,
} from "../redux/thunks";
import { OperationTypes } from "../redux/constants";

const TaskItem = ({
  del_inProgress,
  del_phase,
  del_error,
  del_message,
  done_inProgress,
  done_phase,
  done_error,
  done_message,
  undone_inProgress,
  undone_phase,
  undone_error,
  undone_message,
  deleteCurrTask,
  doneCurrTask,
  undoneCurrTask,
  task,
  setNewPhase,
  setError,
  ...props
}) => {
  const [listUpdated, setListUpdated] = useState(false);
  const [currOperation, setCurrOperation] = useState(0);
  const [showBtns, setShowBtns] = useState(false);

  const btnContainer = (
    <div className="btn-container">
      <MdDelete
        className="btn-delete"
        onClick={() => {
          deleteCurrTask({ phaseId: task.phaseId, taskId: task.id });
          setCurrOperation(OperationTypes.OP_DELETE_TASK);
          setListUpdated(true);
        }}
      />
      {task.isDone ? (
        <TiTickOutline
          className="btn-undone"
          onClick={() => {
            undoneCurrTask({ phaseId: task.phaseId, taskId: task.id });
            setCurrOperation(OperationTypes.OP_UNDONE_TASK);
            setListUpdated(true);
          }}
        />
      ) : (
        <TiTick
          className="btn-done"
          onClick={() => {
            doneCurrTask({ phaseId: task.phaseId, taskId: task.id });
            setCurrOperation(OperationTypes.OP_DONE_TASK);
            setListUpdated(true);
          }}
        />
      )}
    </div>
  );

  const tick = (
    <div className="task-tick">
      {task.isDone ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
    </div>
  );

  useEffect(() => {
    if (
      !(del_inProgress || done_inProgress || undone_inProgress) &&
      !(del_error || done_error || undone_error) &&
      listUpdated
    ) {
      switch (currOperation) {
        case OperationTypes.OP_DELETE_TASK: {
          setNewPhase(del_phase);
          setListUpdated(false);
          break;
        }
        case OperationTypes.OP_DONE_TASK: {
          setNewPhase(done_phase);
          setListUpdated(false);
          break;
        }
        case OperationTypes.OP_UNDONE_TASK: {
          setNewPhase(undone_phase);
          setListUpdated(false);
          break;
        }
      }
    } else {
      if (
        !(del_inProgress || done_inProgress || undone_inProgress) &&
        (del_error || done_error || undone_error)
      ) {
        console.log(
          `Error: ${undone_error} : ${JSON.stringify(undone_message)}`
        );
        setListUpdated(false);
        setError(del_message || done_message || undone_message);
      }
    }
  }, [
    del_inProgress,
    done_inProgress,
    undone_inProgress,
    del_error,
    done_error,
    undone_error,
  ]);

  return (
    <div
      className="task-container"
      onMouseEnter={() => {
        setShowBtns(true);
      }}
      onMouseLeave={() => {
        setShowBtns(false);
      }}
    >
      <div className="task-title">
        {tick}
        <div className="task-title-text">
          <span>{task.title}</span>
        </div>
      </div>
      {showBtns ? btnContainer : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  del_inProgress: getDeleteTaskProgress(state),
  del_phase: getDeleteTaskResult(state),
  del_error: getDeleteTaskError(state),
  del_message: getDeleteTaskMessage(state),

  done_inProgress: getDoneTaskProgress(state),
  done_phase: getDoneTaskResult(state),
  done_error: getDoneTaskError(state),
  done_message: getDoneTaskMessage(state),

  undone_inProgress: getUndoneTaskProgress(state),
  undone_phase: getUndoneTaskResult(state),
  undone_error: getUndoneTaskError(state),
  undone_message: getUndoneTaskMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteCurrTask: (data) => dispatch(deleteTaskRequest(data)),
  doneCurrTask: (data) => dispatch(doneTaskRequest(data)),
  undoneCurrTask: (data) => dispatch(undoneTaskRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
