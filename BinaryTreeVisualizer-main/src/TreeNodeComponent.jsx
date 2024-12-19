import React from 'react';
import './BinaryTree.css';

const TreeNodeComponent = ({ node, onInsert, onSelect, highlightedNode }) => {
  if (!node) {
    return null;
  }

  return (
    <div className="tree-node">
      <div
        className={`node-value ${node.selected ? 'selected' : ''} ${highlightedNode === node ? 'highlighted' : ''}`}
        onClick={() => onSelect(node)}
      >
        {node.value}
      </div>
      <div className="children">
        <div className="left-child">
          {node.left ? (
            <TreeNodeComponent node={node.left} onInsert={onInsert} onSelect={onSelect} highlightedNode={highlightedNode} />
          ) : (
            <button className="add-button" onClick={() => onInsert(node, 'left')}>+</button>
          )}
        </div>
        <div className="right-child">
          {node.right ? (
            <TreeNodeComponent node={node.right} onInsert={onInsert} onSelect={onSelect} highlightedNode={highlightedNode} />
          ) : (
            <button className="add-button" onClick={() => onInsert(node, 'right')}>+</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeNodeComponent;
