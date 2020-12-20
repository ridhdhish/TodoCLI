const fs = require("fs");

// Add todo
const addTodo = (todo) => {
  if (todo.description) {
    fs.appendFile("todo.txt", todo.description + "\n", (err) => {
      console.log('Added todo: "' + todo.description + '"');
      process.exit(0);
    });
  } else {
    console.log("Please provide todo item");
  }
};

// Get all todos
const getTodoes = () => {
  fs.readFile("todo.txt", (err, data) => {
    if (err || !data.toString().length) {
      console.log("There are no pending todos!");
      process.exit(0);
    }

    let todos = data.toString().split("\n");
    for (let i = todos.length - 2; i >= 0; i--) {
      console.log(`[${i + 1}] ${todos[i]}`);
    }
    process.exit(0);
  });
};

// Complete Todo
const completeTodo = (index) => {
  let todos;
  let todo;
  let convertedTodos;
  if (index) {
    fs.readFile("todo.txt", (err, data) => {
      todos = data.toString().split("\n");
      if (index > todos.length || index == 0) {
        console.log(`Error: todo #${index} does not exist.`);
        process.exit(0);
      }

      todo = `x ${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()} ${todos[index - 1]}`;

      todos.splice(index - 1, 1);

      convertedTodos = todos.join("\n");

      fs.appendFile("done.txt", todo + "\n", (err) => {});

      fs.writeFile("todo.txt", convertedTodos, (err) => {
        console.log(`Marked todo #${index} as done.`);
        process.exit(0);
      });
    });
  } else {
    console.log("Please provide todo number");
  }
};

// Delete Todo
const deleteTodo = (index) => {
  let todos;
  fs.readFile("todo.txt", (err, data) => {
    todos = data.toString().split("\n");
    if (index > todos.length - 1 || index == 0) {
      console.log(`Error: todo #${index} does not exist. Nothing deleted.`);
      process.exit(0);
    }

    todos.splice(index - 1, 1);

    convertedTodos = todos.join("\n");

    fs.writeFile("todo.txt", convertedTodos, (err) => {
      console.log(`Deleted todo #${index}.`);
      process.exit(0);
    });
  });
};

// Fetch the Report
const report = () => {
  let pending = 0;
  let complete = 0;
  let todos;
  let date;

  fs.readFile("todo.txt", (err, data) => {
    todos = data.toString().split("\n");
    pending = todos.length - 1;

    fs.readFile("done.txt", (err, data) => {
      let todos = data.toString().split("\n");
      if (!todos.length) {
        complete = 0;
      } else {
        date = `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`;
        todos.forEach((todo) => {
          if (todo.includes(date)) {
            complete = complete + 1;
          }
        });
      }

      console.log(`${date} Pending : ${pending} Completed : ${complete}`);

      process.exit(0);
    });
  });
};

const help = () => {
  console.log("Usage :-");
  console.log('$ ./todo add "todo item"  # Add a new todo');
  console.log("$ ./todo ls               # Show remaining todos");
  console.log("$ ./todo del NUMBER       # Delete a todo");
  console.log("$ ./todo done NUMBER      # Complete a todo");
  console.log("$ ./todo help             # Show usage");
  console.log("$ ./todo report           # Statistics");

  process.exit(0);
};

module.exports = {
  addTodo,
  getTodoes,
  completeTodo,
  deleteTodo,
  report,
  help,
};
