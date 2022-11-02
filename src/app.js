import React from 'react';
import Home from './components/Home/home';
import { setColumnSize } from './store/actions';
import { connect } from 'react-redux';
import Game from './components/Game/game';

const App = (props) => {
  const { isAppInitialized, setColumnSize } = props;

  return (
    <div className="App">
      {isAppInitialized ? <Game /> : <Home setColumnSize={setColumnSize} />}
    </div>
  );
};

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
