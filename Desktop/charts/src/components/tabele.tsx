'use client';

import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]; // array of strings

const cellWidth = 80;
const cellHeight = 60;
const labelWidth = 120; //width of the first col

const schedule: Record<string, number[]>= {
  'Project 1': [0, 1, 2, 3],         
  'Project 2': [2, 3, 4, 5],        
  'Project 3': [7, 8, 9, 10, 11],    
  'Project 4': [4, 5, 6, 7],
}; // activity of each project and its durations

const createGrid = (): Node[] => {
  const nodes: Node[] = [];

  // Header row
  months.forEach((month, i) => {
    nodes.push({
      id: `month-${i}`,
      type: 'default',
      position: { x: labelWidth + i * cellWidth, y: 0 },
      data: { label: month },
      style: {
        width: cellWidth,
        height: cellHeight,
        backgroundColor: '#60A5FA', 
        color: 'black',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        border: '1px solid #1f2937',
      },
      draggable: false,
      selectable: false,
    });
  });

  
  Object.keys(schedule).forEach((project, rowIndex) => {
    const y = (rowIndex + 1) * cellHeight;
    // makes each projects a new row below the header

    // Row label
    nodes.push({
      id: `label-${rowIndex}`,
      type: 'default',
      position: { x: 0, y },
      data: { label: project },
      style: {
        width: labelWidth,
        height: cellHeight,
        backgroundColor: '#60A5FA', 
        color: 'black',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        border: '1px solid #1f2937',
      },
      draggable: false,
      selectable: false,
    });

    months.forEach((_, colIndex) => {
        const isActive = schedule[project].includes(colIndex);
      nodes.push({
        id: `cell-${rowIndex}-${colIndex}`,
        type: 'default',
        position: { x: labelWidth + colIndex * cellWidth, y },
        data: { label: '' },
        style: {
          width: cellWidth,
          height: cellHeight,
          backgroundColor: isActive ? '#5C4033' : '#111827', // if project is active color is brown if its not color is dark gray
          border: '1px solid #1f2937',
        },
        draggable: false,
        selectable: false,
      });
    });
  });

  return nodes;
};
// initializtion of the diagram with its nodes
export default function ProjectTableFlow() {
  const [nodes, , onNodesChange] = useNodesState(createGrid());

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={[]}
        onNodesChange={onNodesChange}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        snapToGrid
        snapGrid={[10, 10]}
        panOnDrag
        zoomOnScroll={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <MiniMap />
        <Controls />
        <Background color="#1f2937" />
      </ReactFlow>
    </div>
  );
}
