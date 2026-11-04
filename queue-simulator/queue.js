
// QUEUE CLASS
class Queue {
    constructor() {
        this.items = [];
    }

    // Add an element to the rear
    enqueue(element) {
        this.items.push(element);
    }

    // Remove an element from the front
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        return this.items.shift();
    }

    // Get the front element without removing it
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }

        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Clear all elements
    clear() {
        this.items = [];
    }
}

// Create a Queue object
const queue = new Queue();

$(document).ready(function () {

    // ENQUEUE BUTTON
    $("#enqueueBtn").click(function () {
        let value = $("#data").val().trim();

        if (value === "") {
            $("#message").text("Please enter a value!");
            return;
        }

        queue.enqueue(value);

        $("#data").val("");
        $("#deleted").text("None");

        displayQueue();

        $("#message").text(value + " added to the rear!");
    });

    // DEQUEUE BUTTON
    $("#dequeueBtn").click(function () {

        if (queue.isEmpty()) {
            $("#message").text("Queue is empty! Cannot dequeue.");
            return;
        }

        let deleted = queue.dequeue();

        $("#deleted").text(deleted);

        displayQueue();

        $("#message").text(deleted + " removed from the front!");
    });

    // PEEK BUTTON
    $("#peekBtn").click(function () {

        if (queue.isEmpty()) {
            $("#message").text("Queue is empty! Nothing to peek.");
            return;
        }

        displayQueue(true);

        $("#message").text("Front element is " + queue.peek());
    });

    // CLEAR BUTTON
    $("#clearBtn").click(function () {

        queue.clear();

        $("#deleted").text("None");

        displayQueue();

        $("#message").text("Queue cleared successfully!");
    });

    // Press Enter to enqueue
    $("#data").on("keydown", function (event) {
        if (event.key === "Enter") {
            $("#enqueueBtn").click();
        }
    });

    // DISPLAY QUEUE
    function displayQueue(highlightFront = false) {

        $("#queueDisplay").empty();

        if (queue.isEmpty()) {
            $("#queueDisplay").html(
                '<p class="empty-message">Queue is empty</p>'
            );
            return;
        }

        queue.items.forEach(function (value, index) {

            let block = $("<div></div>");

            block.addClass("queue-item");
            block.text(value);

            if (highlightFront && index === 0) {
                block.addClass("highlight");
            }

            $("#queueDisplay").append(block);
        });
    }

});
