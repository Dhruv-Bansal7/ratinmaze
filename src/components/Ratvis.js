import React, { useEffect, useState } from 'react'
import Node from './Node';
import RatInMaze from '../algorithm/RatInMaze';
const Ratvis = () => {
    const [state, setState] = useState({
        grid: []
    });

    const [gridSize,setGridSize] = useState(6);


    useEffect(() => {
        const grid = generateGrid(gridSize);
        setState({ grid: grid })
    }, [gridSize])

    const createNode = (row, col) => {
        return {
            col, row, isStart: row === 0 && col === 0,
            isFinish: row === gridSize-1 && col === gridSize-1,
            isWall: false,
            isPath: false,
        };
    }
    const generateGrid = (size) => {
        let grid = []
        for (let row = 0; row < size; row++) {
            let temp = []
            for (let col = 0; col < size; col++) {
                temp.push(createNode(row, col))
            }
            grid.push(temp);
        }
        return grid;
    }


    const handleMouseUp = (row, col) => {
        const newGrid = state.grid.slice();
        const node = grid[row][col]
        const newNode = {
            ...node,
            isWall: !node.isWall
        };
        newGrid[row][col] = newNode
        setState({ grid: newGrid })
    }

    const resetGrid = () => {
        const grid = generateGrid();
        setState({ grid: grid });
    };
    const handleSizeChange = (event) => {
        const size = parseInt(event.target.value);
        if(!isNaN(size) && size>0){
            setGridSize(size);
        }
    };
    const algoRat = () => {
        const {grid} = state
        const algo = RatInMaze(grid,0,0,gridSize);
        if(algo == null) {
            alert("Path not found")
            return;
        }
        const [first] = algo;
        const str = first;
        let row = 0;
        let col = 0;
        for(let i = 0;i < str.length;i++) {
            setTimeout(() => {
                const pos = str[i];
            if(pos === 'D'){
                const newGrid = state.grid.slice();
                const node = grid[row+1][col];
                const newNode = {
                    ...node,
                    isPath: true
                }
                newGrid[row+1][col] = newNode;
                row = row+1;
                setState({ grid: newGrid });
            }
            else if(pos === 'U') {
                const newGrid = state.grid.slice();
                const node = grid[row-1][col];
                const newNode = {
                    ...node,
                    isPath: true
                }
                newGrid[row-1][col] = newNode;
                row = row-1;
                setState({ grid: newGrid });
            }
            else if(pos === 'R'){
                const newGrid = state.grid.slice();
                const node = grid[row][col+1];
                const newNode = {
                    ...node,
                    isPath: true
                }
                newGrid[row][col+1] = newNode;
                col = col + 1;
                setState({ grid: newGrid });
            }
            else if(pos === 'L'){
                const newGrid = state.grid.slice();
                const node = grid[row][col-1];
                const newNode = {
                    ...node,
                    isPath: true
                }
                newGrid[row][col-1] = newNode;
                col = col - 1;
                setState({ grid: newGrid });
            }
            setState({grid: grid})
        },800*i)
            
        }
    }

    const { grid } = state
    return (<>
        <div className='rat'>
            {
                grid && grid.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex}>
                            {
                                row.map((node, colIndex) => {
                                    const { row, col, isFinish, isPath, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={colIndex}
                                            row={row}
                                            col={col}
                                            isFinish={isFinish}
                                            isPath={isPath}
                                            isStart={isStart}
                                            isWall={isWall}
                                            onMouseUp={handleMouseUp}
                                        />
                                    );
                                })}
                        </div>
                    );
                })}
        </div>
        <div>
            <button className='btn' onClick={algoRat}>
                Start
            </button>
            <button className='btn' onClick={resetGrid}>
                Reset
            </button>
            <input
                type="number"
                min="1"
                value={gridSize}
                onChange={handleSizeChange}
                placeholder="Enter grid size"
            />
        </div>
        </>
    );
}

export default Ratvis
