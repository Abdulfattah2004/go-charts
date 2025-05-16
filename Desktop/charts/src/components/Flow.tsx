'use client'

import dagre from 'dagre'
import { useCallback, useEffect, useLayoutEffect } from 'react'
import ReactFlow, {
	addEdge,
	Background,
	Connection,
	Controls,
	Edge,
	MarkerType,
	MiniMap,
	Node,
	useEdgesState,
	useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

const nodeWidth = 172
const nodeHeight = 36

interface CustomNode extends Node {
	id: string
	data: { label: string }
	style?: React.CSSProperties
}

const getLayoutElements = (nodes: CustomNode[], edges: Edge[]) => {
	const g = new dagre.graphlib.Graph()
	// 'TB' (top to bottom)
	// 'BT' (bottom to top)
	// 'LR' (left to right)
	// 'RL' (right to left)

	g.setGraph({ rankdir: 'TB', nodesep: 20, ranksep: 130 })
	g.setDefaultEdgeLabel(() => ({}))

	nodes.forEach((node) => {
		g.setNode(node.id, { width: nodeWidth, height: nodeHeight })
	})

	edges.forEach((edge) => {
		g.setEdge(edge.source, edge.target)
	})

	dagre.layout(g)

	return {
		nodes: nodes.map((node) => {
			const nodeWithPosition = g.node(node.id)
			return {
				...node,
				position: {
					x: nodeWithPosition.x - nodeWidth / 2,
					y: nodeWithPosition.y - nodeHeight / 2,
				},
			}
		}),
		edges,
	}
}

const initialNodes: CustomNode[] = [
	{
		id: 'ceo',
		data: { label: 'CEO' },
		style: { background: 'black', color: '#fff', fontWeight: 'bold' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div1',
		data: { label: 'Division 1' },
		style: { background: 'darkgreen', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div2',
		data: { label: 'Division 2' },
		style: { background: 'orange', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div3',
		data: { label: 'Division 3' },
		style: { background: '#f06595', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div4',
		data: { label: 'Division 4' },
		style: { background: '#3399cc', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div1-sm',
		data: { label: 'Sales & Marketing' },
		style: { background: '#38b000', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div1-af',
		data: { label: 'Accounting & Finance' },
		style: { background: '#38b000', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div1-cs',
		data: { label: 'Customer Service' },
		style: { background: '#38b000', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div2-sm',
		data: { label: 'Sales & Marketing' },
		style: { background: '#ffaa33', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div2-af',
		data: { label: 'Accounting & Finance' },
		style: { background: '#ffaa33', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div2-cs',
		data: { label: 'Customer Service' },
		style: { background: '#ffaa33', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div3-sm',
		data: { label: 'Sales & Marketing' },
		style: { background: '#f06595', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div3-af',
		data: { label: 'Accounting & Finance' },
		style: { background: '#f06595', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div3-cs',
		data: { label: 'Customer Service' },
		style: { background: '#f06595', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div4-sm',
		data: { label: 'Sales & Marketing' },
		style: { background: '#3399cc', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div4-af',
		data: { label: 'Accounting & Finance' },
		style: { background: '#3399cc', color: '#fff' },
		position: { x: 0, y: 0 },
	},
	{
		id: 'div4-cs',
		data: { label: 'Customer Service' },
		style: { background: '#3399cc', color: '#fff' },
		position: { x: 0, y: 0 },
	},
]

const initialEdges: Edge[] = [
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
]

export default function Flow() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

	useLayoutEffect(() => {
		const graphLayout = getLayoutElements(nodes, edges)
		setNodes([...graphLayout.nodes])
	}, [])

	useLayoutEffect(() => {
		loadNodesPositions()
	}, [])

	// Listen for node changes to save them
	useEffect(() => {
		saveNodesPositions()
	}, [nodes, edges])

	const onConnect = useCallback(
		(params: Edge | Connection) =>
			setEdges((eds) =>
				addEdge({ ...params, markerEnd: { type: MarkerType.Arrow } }, eds),
			),
		[setEdges],
	)

	const saveNodesPositions = () => {
		localStorage.setItem('flowNodes', JSON.stringify(nodes))
		localStorage.setItem('flowEdges', JSON.stringify(edges))
	}

	const loadNodesPositions = () => {
		const savedNodes = localStorage.getItem('flowNodes')
		const savedEdges = localStorage.getItem('flowEdges')

		if (savedNodes) {
			setNodes(JSON.parse(savedNodes))
		} else {
			const graphLayout = getLayoutElements(initialNodes, initialEdges)
			setNodes([...graphLayout.nodes])
		}

		if (savedEdges) {
			setEdges(JSON.parse(savedEdges))
		}
	}

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
	)
}
