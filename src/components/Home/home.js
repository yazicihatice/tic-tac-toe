import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colSize: 3,
    };
  }

  onColSizeOptionChanged = (event) => {
    this.setState({ colSize: event.target.value });
  };

  onGameStart = () => {
    const { colSize } = this.state;
    if (+colSize < 3 || +colSize > 10) {
      this.setState({ colSize: 3 });

      return;
    }

    this.props.setColumnSize(+colSize);
  };

  render() {
    const { colSize } = this.state;
    return (
      <div>
        <input onChange={this.onColSizeOptionChanged} value={colSize} />
        <button onClick={this.onGameStart}>Start Game</button>
      </div>
    );
  }
}

export default Home;
