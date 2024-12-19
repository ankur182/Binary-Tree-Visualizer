class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.selected = false;
    }
  }
  
  class BinaryTree {
    constructor() {
      this.root = new TreeNode(0);
    }
  
    insertLeft(node, value) {
      if (node.left === null) {
        node.left = new TreeNode(value);
      } else {
        this.insertLeft(node.left, value);
      }
    }
  
    insertRight(node, value) {
      if (node.right === null) {
        node.right = new TreeNode(value);
      } else {
        this.insertRight(node.right, value);
      }
    }
  
    inorderTraversal(node = this.root, result = []) {
      if (node !== null) {
        this.inorderTraversal(node.left, result);
        result.push(node.value);
        this.inorderTraversal(node.right, result);
      }
      return result;
    }
  
    preorderTraversal(node = this.root, result = []) {
      if (node !== null) {
        result.push(node.value);
        this.preorderTraversal(node.left, result);
        this.preorderTraversal(node.right, result);
      }
      return result;
    }
  
    postorderTraversal(node = this.root, result = []) {
      if (node !== null) {
        this.postorderTraversal(node.left, result);
        this.postorderTraversal(node.right, result);
        result.push(node.value);
      }
      return result;
    }
  
    levelOrderTraversal() {
      const result = [];
      const queue = [this.root];
  
      while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.value);
  
        if (node.left !== null) {
          queue.push(node.left);
        }
        if (node.right !== null) {
          queue.push(node.right);
        }
      }
      return result;
    }
  
    findNodeByValue(value, node = this.root) {
      if (node === null) {
        return null;
      }
      if (node.value === value) {
        return node;
      }
  
      const leftResult = this.findNodeByValue(value, node.left);
      if (leftResult !== null) {
        return leftResult;
      }
  
      return this.findNodeByValue(value, node.right);
    }
  }
  
  export { BinaryTree, TreeNode };
  