/*LinkedList Javascript Functions for BasiCS*/

function Node() {
	this.data = null;
	this.next = null;
}

function LinkedList() {
	this.head = null;
	this.tail = null;
	this.size = 0;

	this.add = function(data) {
		var newNode = new Node();
		newNode.data = data;
		
		if (this.head == null) {
			this.head = newNode;
			this.tail = newNode;
			this.size++;
			return;
		}

		this.tail.next = newNode;
		this.tail = newNode;
	}

	this.remove = function(data) {
		var current = this.head;
		var prev;

		if (head.data == data) {
			head = head.next;
			this.size--;
			return;
		}

		do {
			prev = current;
			current = current.next;

			if (current.data == data) {
				prev.next = current.next;
				this.size--;
				return;
			}

		} while (currNode != null);
	
	}

	this.search = function(data) {
		var current = this.head;
		var counter = 0;

		while (current != null) {
			if(current.data = data) {
				return counter;
			}

			counter++;
		}
		return -1;
	}
}


// TESTING STUFF HERE
// var canvas = document.getElementById('mainCanvas');
// var ctx = canvas.getContext("2d");

// var linkedlist = new LinkedList();
// linkedlist.add(5634);
// linkedlist.add(453);

// console.log(linkedlist);

// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0,0,150,150);