'use client';
import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, useNodesState, useEdgesState } from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';
import * as htmlToImage from 'html-to-image'; // Correct import
import usePlan from '@/hooks/usePlan';
import useRole from '@/hooks/useRole';
import { redirect } from 'next/navigation';

const initialNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

const Diagram = () => {
  const diagramRef = useRef(null); // Ref for diagram element
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editingNode, setEditingNode] = useState(null);
  const [nodeLabel, setNodeLabel] = useState('');

  const [plan] = usePlan();
  const [role] = useRole();
  if (plan === 'Basic' || !role === 'admin') redirect('/dashboard');

  // Add new node
  const addNode = () => {
    const newNode = {
      id: uuidv4(),
      data: { label: `New Node` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes(nds => nds.concat(newNode));
  };

  // Handle edge connection
  const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), [setEdges]);

  // Open node editor on double click
  const onNodeDoubleClick = (event, node) => {
    setEditingNode(node.id);
    setNodeLabel(node.data.label);
  };

  // Save edited node label
  const saveNodeLabel = () => {
    setNodes(nds => nds.map(node => (node.id === editingNode ? { ...node, data: { label: nodeLabel } } : node)));
    setEditingNode(null);
  };

  // Download diagram as an image
  const downloadImage = () => {
    if (diagramRef.current) {
      htmlToImage
        .toPng(diagramRef.current)
        .then(dataUrl => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'diagram.png';
          link.click();
        })
        .catch(err => {
          console.error('Error generating image:', err);
        });
    } else {
      console.error('Diagram ref is not defined');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <button
          onClick={addNode}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg  px-4 py-2 bg-blue-500 "
        >
          Add Node
        </button>
        <button
          onClick={downloadImage}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg  px-4 py-2 bg-blue-500 "
        >
          Download as Image
        </button>
        {editingNode && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={nodeLabel}
              onChange={e => setNodeLabel(e.target.value)}
              className="p-1.5 border rounded dark:bg-gray-900 dark:border-gray-400"
            />
            <button
              onClick={saveNodeLabel}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg px-4 py-2 bg-blue-500 "
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Diagram Container with ref */}
      <div ref={diagramRef} style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Diagram;
