import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdDoneAll as IcoCompleted } from "react-icons/md";
import TaskItem from "./task-item";
import NewTask from "./new-task";
import { updateNewPhase } from "../redux/thunks";
import { connect } from "react-redux";
import "./PhaseItem.css";

const PhaseItem = ({ updatePhases, phase, setError, ...props }) => {
  const [showForm, setShowForm] = useState(false);

  const setNewPhase = (newPhase) => {
    updatePhases(newPhase);
  };

  const completed = !!phase.isCompleted ? (
    <IcoCompleted className="ico-completed" />
  ) : null;
  return (
    <>
      <div className="phase-container">
        <div className="phase-input-container">
          <div className="phase-title-container">
            <div className="phase-title">
              <span>{phase.title}</span>
              {completed}
            </div>{" "}
            <div className="btn-container">
              <IoMdAddCircle
                className="btn-new"
                onClick={() => {
                  setShowForm(!showForm);
                }}
              />
            </div>
          </div>
          {showForm ? (
            <NewTask
              phaseId={phase.id}
              setNewPhase={setNewPhase}
              setError={setError}
            ></NewTask>
          ) : null}
        </div>

        {phase.tasks.map((task, idx) => {
          return (
            <TaskItem
              key={idx}
              task={task}
              setNewPhase={setNewPhase}
              setError={setError}
            ></TaskItem>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  updatePhases: (data) => dispatch(updateNewPhase(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhaseItem);
