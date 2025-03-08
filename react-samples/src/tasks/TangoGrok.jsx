import React, { useState } from 'react';
import './tangoGrok.css';

const Tango = () => {
  const GRID_SIZE = 6;
  const REQUIRED_COUNT = GRID_SIZE / 2; // 3 suns and 3 moons
  const [grid, setGrid] = useState(() => initializeGrid(GRID_SIZE));
  const [gameWon, setGameWon] = useState(false);

  function initializeGrid(size) {
    return Array(size).fill().map(() => Array(size).fill(null));
  }

  // Count symbols in an array
  function countSymbols(arr) {
    return arr.reduce(
      (acc, cell) => ({
        sun: acc.sun + (cell === 'sun' ? 1 : 0),
        moon: acc.moon + (cell === 'moon' ? 1 : 0),
      }),
      { sun: 0, moon: 0 }
    );
  }

  // Check for consecutive violations
  function checkConsecutive(arr) {
    for (let i = 0; i < arr.length - 2; i++) {
      if (arr[i] && arr[i] === arr[i + 1] && arr[i] === arr[i + 2]) {
        return true;
      }
    }
    return false;
  }

  // Get invalid rows and columns
  function getInvalidPositions() {
    const invalidRows = new Set();
    const invalidCols = new Set();

    // Check rows
    grid.forEach((row, rowIndex) => {
      const counts = countSymbols(row);
      if (counts.sun > REQUIRED_COUNT || counts.moon > REQUIRED_COUNT || checkConsecutive(row)) {
        invalidRows.add(rowIndex);
      }
    });

    // Check columns
    for (let col = 0; col < GRID_SIZE; col++) {
      const column = grid.map(row => row[col]);
      const counts = countSymbols(column);
      if (counts.sun > REQUIRED_COUNT || counts.moon > REQUIRED_COUNT || checkConsecutive(column)) {
        invalidCols.add(col);
      }
    }

    return { invalidRows, invalidCols };
  }

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (gameWon) return;

    const newGrid = grid.map(r => [...r]);
    const current = newGrid[row][col];
    newGrid[row][col] = current === null ? 'sun' : current === 'sun' ? 'moon' : null;
    setGrid(newGrid);

    // Check win condition
    const isFull = newGrid.every(row => row.every(cell => cell !== null));
    if (isFull) {
      const isValid = newGrid.every(row => {
        const counts = countSymbols(row);
        return counts.sun === REQUIRED_COUNT && counts.moon === REQUIRED_COUNT && !checkConsecutive(row);
      }) && Array(GRID_SIZE).every((_, col) => {
        const counts = countSymbols(newGrid.map(r => r[col]));
        return counts.sun === REQUIRED_COUNT && counts.moon === REQUIRED_COUNT && !checkConsecutive(newGrid.map(r => r[col]));
      });

      if (isValid) {
        setGameWon(true);
        alert('Congratulations! You won!');
      }
    }
  };

  const { invalidRows, invalidCols } = getInvalidPositions();

  return (
    <div className="tango-container">
      <h1>Tango</h1>
      <div className="game-board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell || ''} ${
                  invalidRows.has(rowIndex) || invalidCols.has(colIndex) ? 'invalid' : ''
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell === 'sun' && '☀️'}
                {cell === 'moon' && '🌙'}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p>Click to toggle: empty → sun → moon → empty. 3 suns and 3 moons per row/column, max 2 consecutive.</p>
    </div>
  );
};

export default Tango;