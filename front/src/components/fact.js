import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getFactError,
  getFactLoading,
  getFactMessage,
  getFactResult,
} from "../redux/selectors";
import { getFactRequest } from "../redux/thunks";
import "./Fact.css";

const Fact = ({ isLoading, fact, error, message, getFact, ...props }) => {
  useEffect(() => {
    getFact();
  }, []);

  return (
    <div>
      <div className="title">
        <span>Congrats!, All tasks are completed</span>
      </div>
      <div className="fact">
        <span>"{fact}"</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: getFactLoading(state),
  fact: getFactResult(state),
  error: getFactError(state),
  message: getFactMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  getFact: () => dispatch(getFactRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Fact);
