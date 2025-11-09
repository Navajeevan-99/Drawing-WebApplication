import {Stage, Layer, Line } from "react-konva";
import React from 'react'

const Paint = () => {
  return (
    <div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Line
                points={[100,300,200,100,300,300]}
                closed
                fill='red'
                stroke='black'
                strokeWidth={3}

                />
            </Layer>
        </Stage>
    </div>
  )
}

export default Paint