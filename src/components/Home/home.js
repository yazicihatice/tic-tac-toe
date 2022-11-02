import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const Home = (props) => {
  const [colSize, setColSize] = useState(3);

  const onColSizeOptionChanged = (event) => {
    setColSize(event.target.value);
  };

  const onGameStart = (e) => {
    e.preventDefault();

    if (+colSize < 3 || +colSize > 10) {
      setColSize(3);
      return;
    }

    props.setColumnSize(+colSize);
  };

  return (
    <div className="home">
      <form>
        <input onChange={onColSizeOptionChanged} value={colSize} />
        <button onClick={onGameStart}>Start Game</button>
      </form>
    </div>
  );
};

export default Home;
