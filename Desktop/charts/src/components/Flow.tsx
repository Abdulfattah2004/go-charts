'use client';

import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  
  {
    id: 'ceo',
    position: { x: 500, y: 0 },
    data: { label: 'CEO' },
    style: { background: 'black', color: '#fff', fontWeight: 'bold' },
    draggable: false,
  },

  
  {
    id: 'div1',
    position: { x: 100, y: 100 },
    data: { label: 'Division 1' },
    style: { background: 'darkgreen', color: '#fff' },
    draggable: false,
  },
  {
    id: 'div2',
    position: { x: 350, y: 100 },
    data: { label: 'Division 2' },
    style: { background: 'orange', color: '#fff' },
    draggable: false,
  },
  {
    id: 'div3',
    position: { x: 600, y: 100 },
    data: { label: 'Division 3' },
    style: { background: '#f06595', color: '#fff' },
    draggable: false,
  },
  {
    id: 'div4',
    position: { x: 850, y: 100 },
    data: { label: 'Division 4' },
    style: { background: '#3399cc', color: '#fff' },
    draggable: false,
  },

  
  { id: 'div1-sm', position: { x: 100, y: 200 }, data: { label: 'Sales & Marketing' }, style: { background: '#38b000', color: '#fff' } },
  { id: 'div1-af', position: { x: 100, y: 270 }, data: { label: 'Accounting & Finance' }, style: { background: '#38b000', color: '#fff' } },
  { id: 'div1-cs', position: { x: 100, y: 340 }, data: { label: 'Customer Service' }, style: { background: '#38b000', color: '#fff' } },

  
  { id: 'div2-sm', position: { x: 350, y: 200 }, data: { label: 'Sales & Marketing' }, style: { background: '#ffaa33', color: '#fff' } },
  { id: 'div2-af', position: { x: 350, y: 270 }, data: { label: 'Accounting & Finance' }, style: { background: '#ffaa33', color: '#fff' } },
  { id: 'div2-cs', position: { x: 350, y: 340 }, data: { label: 'Customer Service' }, style: { background: '#ffaa33', color: '#fff' } },

  
  { id: 'div3-sm', position: { x: 600, y: 200 }, data: { label: 'Sales & Marketing' }, style: { background: '#f06595', color: '#fff' } },
  { id: 'div3-af', position: { x: 600, y: 270 }, data: { label: 'Accounting & Finance' }, style: { background: '#f06595', color: '#fff' } },
  { id: 'div3-cs', position: { x: 600, y: 340 }, data: { label: 'Customer Service' }, style: { background: '#f06595', color: '#fff' } },

  
  { id: 'div4-sm', position: { x: 850, y: 200 }, data: { label: 'Sales & Marketing' }, style: { background: '#3399cc', color: '#fff' } },
  { id: 'div4-af', position: { x: 850, y: 270 }, data: { label: 'Accounting & Finance' }, style: { background: '#3399cc', color: '#fff' } },
  { id: 'div4-cs', position: { x: 850, y: 340 }, data: { label: 'Customer Service' }, style: { background: '#3399cc', color: '#fff' } },
];

const initialEdges = [
  
  { id: 'e-ceo-div1', source: 'ceo', target: 'div1' },
  { id: 'e-ceo-div2', source: 'ceo', target: 'div2' },
  { id: 'e-ceo-div3', source: 'ceo', target: 'div3' },
  { id: 'e-ceo-div4', source: 'ceo', target: 'div4' },

  
  { id: 'e-div1-sm', source: 'div1', target: 'div1-sm' },
  { id: 'e-div1-af', source: 'div1', target: 'div1-af' },
  { id: 'e-div1-cs', source: 'div1', target: 'div1-cs' },

  
  { id: 'e-div2-sm', source: 'div2', target: 'div2-sm' },
  { id: 'e-div2-af', source: 'div2', target: 'div2-af' },
  { id: 'e-div2-cs', source: 'div2', target: 'div2-cs' },

  
  { id: 'e-div3-sm', source: 'div3', target: 'div3-sm' },
  { id: 'e-div3-af', source: 'div3', target: 'div3-af' },
  { id: 'e-div3-cs', source: 'div3', target: 'div3-cs' },

  
  { id: 'e-div4-sm', source: 'div4', target: 'div4-sm' },
  { id: 'e-div4-af', source: 'div4', target: 'div4-af' },
  { id: 'e-div4-cs', source: 'div4', target: 'div4-cs' },
];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.Arrow } }, eds)),
    [setEdges]
  );

  return (
    <div className='w-[100vw] h-[100vh]'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
