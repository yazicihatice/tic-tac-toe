import "./styles.css";
import { connect } from "react-redux";

function App() {
  return <div className="App"></div>;
}

const mapStateToProps = (state) => {
  return {
    count: state,
  };
};
export default connect(mapStateToProps)(App);
