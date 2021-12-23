export const calculateSuccessStatuses = (colSize) => {
  const gridSize = colSize * colSize;
  const keySuccessConditionsMap = {};

  for (let i = 0; i < gridSize; i++) {
    let rowOfIndex = Math.floor(i / colSize);
    let columnOfIndex = i % colSize;
    let horizontalSuccessArr = [...Array(colSize)].map(
      (_, i) => rowOfIndex * colSize + i
    );
    let verticalSuccessArr = [...Array(colSize)].map(
      (_, i) => columnOfIndex + i * colSize
    );

    let diagonalXSuccessArr = [];
    if (rowOfIndex === columnOfIndex) {
      diagonalXSuccessArr = [...Array(colSize)].map(
        (_, i) => (colSize + 1) * i
      );
    }
    let diagonalYSuccessArr = [];
    if (rowOfIndex + columnOfIndex === colSize - 1) {
      // not written 'else if' when centered element is in odd colSize has 2 diagonal success status
      diagonalYSuccessArr = [...Array(colSize)].map(
        (_, i) => (colSize - 1) * (i + 1)
      );
    }

    keySuccessConditionsMap[i] = [
      horizontalSuccessArr,
      verticalSuccessArr,
      ...(diagonalXSuccessArr.length ? [diagonalXSuccessArr] : []),
      ...(diagonalYSuccessArr.length ? [diagonalYSuccessArr] : []),
    ];
  }

  return keySuccessConditionsMap;
};

export const getGameEndingMoves = ({
  successConditionsOfCell,
  boardUpdatedStatus,
  colSize,
  whoseTurn,
}) => {
  let gameEndingMoves = [];

  for (let i = 0; i < successConditionsOfCell.length; i++) {
    let checkString = "";
    for (let j = 0; j < colSize; j++) {
      let val = boardUpdatedStatus[successConditionsOfCell[i][j]];
      checkString = checkString.concat(val);
    }

    if (checkString === new Array(colSize).fill(whoseTurn).join("")) {
      gameEndingMoves.push(successConditionsOfCell[i]);
    }
  }

  return gameEndingMoves;
};
