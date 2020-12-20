const program = require("commander");

const {
  addTodo,
  getTodoes,
  completeTodo,
  deleteTodo,
  report,
  help,
} = require("./index");

program.version("1.0.0").description("Todo list");

program
  .command(" ")
  .description("Show usage")
  .action(() => {
    help();
  });

program
  .command("add <description>")
  .alias("a")
  .description("Add new todo")
  .action((description) => {
    addTodo({ description, completed: false });
  });

program
  .command("ls")
  .description("Get all todoes")
  .action(() => {
    getTodoes();
  });

program
  .command("done <index>")
  .description("Complete a todo")
  .action((index) => {
    completeTodo(index);
  });

program
  .command("del <index>")
  .description("Delete a todo")
  .action((index) => {
    deleteTodo(index);
  });

program
  .command("report")
  .description("Show the report")
  .action(() => {
    report();
  });

program
  .command("help")
  .description("Show usage")
  .action(() => {
    help();
  });

if (process.argv.length < 3) {
  help();
}

program.parse(process.argv);
