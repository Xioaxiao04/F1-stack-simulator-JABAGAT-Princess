 
class Stack {
    constructor() {
        this.items = [];
    }

    // Add an element to the top
    push(element) {
        this.items.push(element);
    }

    // Remove the top element
    pop() {
        if (this.isEmpty()) return undefined;
        return this.items.pop();
    }

    // Check the top element
    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.items.length - 1];
    }

    // Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Clear the stack
    clear() {
        this.items = [];
    }
}

const stack = new Stack();

$(document).ready(function () {

    // Get the input and buttons
    const input = $(".row.bg-danger .col").first().find("input");
    const buttons = $(".row.bg-danger .col").first().find("button");
    const deleted = $(".popped .pop");

    // Add message area
    $(".row.bg-danger").after(
        '<div id="message" class="alert alert-info mt-2">Stack Simulator Ready!</div>'
    );

    // Add starting elements
    stack.push("100");
    stack.push("200");
    stack.push("300");
    stack.push("400");

    // Display stack
    function displayStack(highlight = false) {
        $("#stack").empty();

        if (stack.isEmpty()) {
            $("#stack").html(
                '<p class="text-white text-center mt-3">Stack is empty</p>'
            );
            return;
        }

        for (let i = stack.items.length - 1; i >= 0; i--) {
            let item = $("<div></div>");

            item.addClass("row text-center p-2 mb-1 text-white");
            item.addClass(i % 2 === 0 ? "bg-primary" : "bg-success");
            item.text(stack.items[i]);

            if (highlight && i === stack.items.length - 1) {
                item.addClass("border border-warning border-4");
            }

            $("#stack").append(item);
        }
    }

    // PUSH BUTTON
    buttons.eq(0).click(function () {
        let value = input.val().trim();

        if (value === "") {
            $("#message").text("Please enter a value!");
            return;
        }

        stack.push(value);
        input.val("");
        deleted.text("None");

        displayStack();
        $("#message").text(value + " added to the top!");
    });

    // POP BUTTON
    buttons.eq(1).click(function () {
        if (stack.isEmpty()) {
            $("#message").text("Stack is empty! Cannot pop.");
            return;
        }

        let removed = stack.pop();

        deleted.text(removed);
        displayStack();

        $("#message").text(removed + " removed from the stack!");
    });

    // PEEK BUTTON
    buttons.eq(2).click(function () {
        if (stack.isEmpty()) {
            $("#message").text("Stack is empty! Nothing to peek.");
            return;
        }

        let top = stack.peek();

        displayStack(true);
        $("#message").text("Top element is " + top);
    });

    // CLEAR BUTTON
    buttons.eq(3).click(function () {
        stack.clear();
        deleted.text("None");

        displayStack();
        $("#message").text("Stack cleared successfully!");
    });

    // Press Enter to push
    input.on("keydown", function (event) {
        if (event.key === "Enter") {
            buttons.eq(0).click();
        }
    });

    // Initial display
    deleted.text("None");
    displayStack();
});
