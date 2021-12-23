import React from "react";
import Home from "./components/Home/home";
import { setColumnSize } from "./store/actions";
import { connect } from "react-redux";
import Game from "./components/Game/game";

class App extends React.Component {
  render() {
    const { isAppInitialized, setColumnSize } = this.props;

    return (
      <>
        {isAppInitialized ? <Game /> : <Home setColumnSize={setColumnSize} />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAppInitialized: state.isAppInitialized,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setColumnSize: (size) => dispatch(setColumnSize(size)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
