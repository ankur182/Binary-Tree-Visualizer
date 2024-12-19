import React, { useState, useEffect } from 'react';
import TreeNodeComponent from './TreeNodeComponent';
import { BinaryTree } from './BinaryTree';
import './BinaryTree.css';

const BinaryTreeComponent = () => {
  const [binaryTree] = useState(new BinaryTree());
  const [nodeValue, setNodeValue] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [traversalType, setTraversalType] = useState('inorder');
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [traversalArray, setTraversalArray] = useState([]);
  const [traversalIndex, setTraversalIndex] = useState(0);
  const [traversalDisplayArray, setTraversalDisplayArray] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleInsert = (node, direction) => {
    if (direction === 'left') {
      binaryTree.insertLeft(node, nodeValue);
    } else if (direction === 'right') {
      binaryTree.insertRight(node, nodeValue);
    }
    setNodeValue(nodeValue + 1);
  };

  const handleSelect = (node) => {
    if (selectedNode) {
      selectedNode.selected = false;
    }
    node.selected = true;
    setSelectedNode(node);
    setNewValue(node.value);
  };

  const handleSetValue = () => {
    if (selectedNode) {
      selectedNode.value = newValue;
      setSelectedNode({ ...selectedNode });
    }
  };

  const handleCancel = () => {
    if (selectedNode) {
      selectedNode.selected = false;
      setSelectedNode(null);
    }
  };

  const handleTraversalChange = (e) => {
    setTraversalType(e.target.value);
  };

  const handleTraversal = () => {
    let result = [];
    if (traversalType === 'inorder') {
      result = binaryTree.inorderTraversal();
    } else if (traversalType === 'preorder') {
      result = binaryTree.preorderTraversal();
    } else if (traversalType === 'postorder') {
      result = binaryTree.postorderTraversal();
    } else if (traversalType === 'levelorder') {
      result = binaryTree.levelOrderTraversal();
    }
    setTraversalArray(result);
    setTraversalIndex(0);
    setTraversalDisplayArray([]);
    setHighlightedNode(null);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleRestart = () => {
    setTraversalIndex(0);
    setTraversalDisplayArray([]);
    setHighlightedNode(null);
    setIsRunning(false);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isRunning && !isPaused && traversalArray.length > 0 && traversalIndex < traversalArray.length) {
      const nodeValue = traversalArray[traversalIndex];
      const node = binaryTree.findNodeByValue(nodeValue);
      setHighlightedNode(node);
      setTraversalDisplayArray((prev) => [...prev, nodeValue]);

      const timeout = setTimeout(() => {
        setTraversalIndex(traversalIndex + 1);
        setHighlightedNode(null);
      }, 1000); // Adjust the delay time as needed

      return () => clearTimeout(timeout);
    }
  }, [isRunning, isPaused, traversalArray, traversalIndex, binaryTree]);

  return (
    <div className="tree-container">
      <h1>Tree Visualizer</h1>
      <TreeNodeComponent node={binaryTree.root} onInsert={handleInsert} onSelect={handleSelect} highlightedNode={highlightedNode} />
      {selectedNode && (
        <div className="popup">
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button onClick={handleSetValue}>Set Value</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
      <div className="traversal-controls">
        <select value={traversalType} onChange={handleTraversalChange}>
          <option value="inorder">Inorder</option>
          <option value="preorder">Preorder</option>
          <option value="postorder">Postorder</option>
          <option value="levelorder">Level Order</option>
        </select>
        <button onClick={handleTraversal} className="primary-button">Start Traversal</button>
        {isRunning && (
          <>
            <button onClick={handlePause} className="secondary-button">{isPaused ? 'Resume' : 'Pause'}</button>
            <button onClick={handleRestart} className="secondary-button">Restart</button>
          </>
        )}
      </div>
      <div className="traversal-array">
        {traversalDisplayArray.map((value, index) => (
          <div key={index} className="array-element">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinaryTreeComponent;
