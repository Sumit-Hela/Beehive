import inquirer from "inquirer";
import { createProject } from "./src/generator.js";

console.log("🐝 Welcome to Beehive CLI!");

async function run() {
  const answers = await inquirer.prompt([
    { name: "projectName", type: "input", message: "Project name:" },
    { name: "version", type: "input", message: "Version:", default: "1.0.0" },
    { name: "author", type: "input", message: "Author:" },
    { name: "module", type: "list", message: "Module type:", choices: ["commonjs", "module"] },
    { name: "testCommand", type: "input", message: "Test command:" },
    { name: "buildCommand", type: "input", message: "Build command:" }
  ]);

  createProject(answers);
}

run();
