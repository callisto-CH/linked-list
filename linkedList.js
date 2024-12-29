class Node {
  constructor(value = null) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  #traverse(index, callback = () => {}) {
    if (index >= this._size || index < 0) return null;

    let currentNode = this._head;
    for (let i = 0; i <= index; i++) {
      callback(currentNode);
      if (i < index) currentNode = currentNode.next;
    }

    return currentNode;
  }

  append(value) {
    let newNode = new Node(value);

    if (this._size == 0) {
      this._head = newNode;
    } else {
      this._tail.next = newNode;
    }

    this._tail = newNode;
    this._size += 1;
  }

  prepend(value) {
    let newNode = new Node(value);

    if (this._size == 0) {
      this._tail = newNode;
    }

    newNode.next = this._head;
    this._head = newNode;
    this._size += 1;
  }

  get size() {
    return this._size;
  }

  get head() {
    return this._head;
  }

  get tail() {
    return this._tail;
  }

  at(index) {
    return this.#traverse(index);
  }

  pop() {
    let popped = this._tail;

    if (this._size == 0) return null;

    if (this._size == 1) {
      this._head = null;
      this._tail = null;
    } else {
      let newTail = this.at(this._size - 2);
      this._tail = newTail;
      newTail.next = null;
    }

    this._size -= 1;
    return popped;
  }

  contains(value) {
    let contains = false;

    this.#traverse(this._size - 1, (node) => {
      if (node.value == value) contains = true;
    });

    return contains;
  }

  find(value) {
    let found = false;
    let i = 0;

    this.#traverse(this._size - 1, (node) => {
      if (found || node.value == value) {
        found = true;
      } else {
        i += 1;
      }
    });

    return found ? i : null;
  }

  toString() {
    let output = "";
    this.#traverse(this._size - 1, (node) => {
      output += `( ${node.value} ) -> `;
    });
    output += "null";
    return output;
  }

  insertAt(value, index) {
    if (index > this._size || index < 0)
      throw new Error(`Index is not valid for node insertion`);

    // insert at tail of list
    // also handles inserting into an empty list when index == 0
    if (index == this._size) return this.append(value);

    // insert at head of list
    if (index == 0) return this.prepend(value);

    // insert in middle of list
    let beforeInsert = this.at(index - 1);
    let newNode = new Node(value);
    newNode.next = beforeInsert.next;
    beforeInsert.next = newNode;
    this._size += 1;
  }

  removeAt(index) {
    if (index >= this._size || index < 0)
      throw new Error(`Index is not valid for node removal`);

    // remove tail of list
    // also handles removing only node when list size is 1
    if (index == this._size - 1) {
      this.pop();
      return;
    }

    let removed;

    // remove head of list
    if (index == 0) {
      removed = this._head;
      this._head = removed.next;

      // remove from middle of list
    } else {
      let beforeRemove = this.at(index - 1);
      removed = beforeRemove.next;
      beforeRemove.next = removed.next;
    }

    removed.next = null;
    this._size -= 1;
  }
}
