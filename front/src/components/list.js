import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import {
  getTaskList,
  getTaskListError,
  getTaskListLoading,
  getTaskListMessage,
} from "../redux/selectors";
import { taskListRequest } from "../redux/thunks";
import PhaseItem from "./phase-item";
import Fact from "./fact";
import "./List.css";

Modal.setAppElement("#root");

const TaskList = ({
  isLoading,
  phases = [],
  error,
  message,
  loadTaskList,
  ...props
}) => {
  const [errMessage, setErrMessage] = useState("");
  const [showQoute, setShowQoute] = useState(false);

  useEffect(() => {
    loadTaskList();
  }, []);

  useEffect(() => {
    const isComplete = !phases.some((phase, idx) => {
      return !phase.isCompleted;
    });

    setShowQoute(isComplete);
  }, [phases]);

  useEffect(() => {
    if (!!error) setErrMessage(message);
  }, [error]);

  const errDialog = (
    <Modal
      style={{
        content: {
          position: "absolute",
          top: "100px",
          left: "200px",
          right: "200px",
          bottom: "250px",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
        },
      }}
      className="err-dialog"
      isOpen={errMessage.length > 0}
      onRequestClose={() => {
        setErrMessage("");
      }}
    >
      <div>
        <span>Error:</span>
        <br /> <br />
        <span>{errMessage}</span>
      </div>
    </Modal>
  );

  const factDialog = (
    <Modal
      style={{
        content: {
          position: "absolute",
          top: "100px",
          left: "200px",
          right: "200px",
          bottom: "250px",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
        },
      }}
      isOpen={showQoute}
      onRequestClose={() => {
        setShowQoute(false);
      }}
    >
      <div>
        <Fact />
      </div>
    </Modal>
  );

  return (
    <div className="list-container" id="list">
      {errDialog}
      {factDialog}
      {isLoading ? (
        <h3>Loading ...</h3>
      ) : error ? (
        <h3>Error: {message}</h3>
      ) : (
        phases.map((phase) => {
          console.log(JSON.stringify(phase));
          return (
            <PhaseItem
              key={phase.id}
              phase={phase}
              setError={setErrMessage}
            ></PhaseItem>
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: getTaskListLoading(state),
  phases: getTaskList(state),
  error: getTaskListError(state),
  message: getTaskListMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadTaskList: () => dispatch(taskListRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
