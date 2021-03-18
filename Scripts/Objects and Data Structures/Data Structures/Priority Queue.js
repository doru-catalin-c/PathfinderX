export class MinimumPriorityQueue
{
    constructor() {
        this.Values = [];
    }

    /**
     * Adds a node to the queue.
     * @param {Object<>} node
     */
    Enqueue(node) {
        if (this.IsEmpty()) {
            this.Values.push(node);
        }
        else {
            let added = false;
            for (let i = 0; i < this.Values.length; i++) {
                if (node.priority < this.Values[i].priority) {
                    this.Values.splice(i, 0, node);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.Values.push(node);
            }
        }
    }

    /**
     * Removes the node with the lowest priority in the queue and returns the node removed.
     */
    Dequeue() {
        return this.Values.shift();
    }

    /**
     * Returns true if the queue is empty, otherwise false.
     */
    IsEmpty() {
        return this.Values.length === 0;
    }

    /**
     * Checks if the node is queued
     * @param {Object<>} node
     */
    Has(node) {
        return this.Values.find(nodeInQueue => nodeInQueue === node);
    }
}