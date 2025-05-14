'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Position,
  Handle,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

const CustomNode = ({ data }: any) => (
  <div className="w-[80px] h-[80px] rounded-full border border-black flex items-center justify-center bg-white text-xs shadow" style={{color: 'black'}}>
    {data.label}
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
  </div>
);

const nodeTypes = { custom: CustomNode };

const LANE_HEIGHT = 140;
const LANE_WIDTH = 1200;
const LABEL_WIDTH = 160;
const NODE_Y_OFFSET = 30;

const createLane = (
  label: string,
  y: number,
  nodeLabels: string[],
  baseId: string,
  color: string
): Node[] => {
  const laneBg: Node = {
    id: `lane-${baseId}`,
    type: 'default',
    position: { x: 0, y },
    data: { label: '' },
    style: {
      width: LANE_WIDTH,
      height: LANE_HEIGHT,
      backgroundColor: color,
      border: '1px solid #ccc',
      
    },
    draggable: false,
    selectable: false,
  };

  const labelNode: Node = {
    id: `label-${baseId}`,
    type: 'default',
    position: { x: 10, y: y + LANE_HEIGHT / 2 - 10 },
    data: { label },
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      backgroundColor: 'transparent',
      border: 'none',
      zIndex: 2,
    },
    draggable: false,
    selectable: false,
  };

  const objectiveNodes: Node[] = nodeLabels.map((label, i) => ({
    id: `${baseId}-${i}`,
    type: 'custom',
    data: { label },
    position: { x: LABEL_WIDTH + i * 160, y: y + NODE_Y_OFFSET },
    zIndex: 2,
    draggable: false,
   
  }));

  return [laneBg, labelNode, ...objectiveNodes];
};

const initialNodes: Node[] = [
  ...createLane('Financial', 0, ['financiall objrctive', 'financiall objrctive'], 'fin', '#F3F4F6'),
  ...createLane('Customer', 150, ['customer objective', 'customer objective', 'customer objective'], 'cust', '#E0F2FE'),
  ...createLane('Internal Processes', 300, ['process objective', 'process objective', 'process objective'], 'proc', '#DCFCE7'),
  ...createLane('People & Learning', 450, ['Epeople objective', 'people objective', 'people objective'], 'peep', '#FEF9C3'),
];

const initialEdges: Edge[] = [];

export default function StrategyMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        snapToGrid
        snapGrid={[10, 10]}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
