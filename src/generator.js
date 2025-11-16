import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export function createProject(data) {
  const projectPath = path.join(process.cwd(), data.projectName);
  fs.mkdirSync(projectPath, { recursive: true });

  // Create package.json
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(
      {
        name: data.projectName,
        version: data.version,
        author: data.author,
        type: data.module === "module" ? "module" : "commonjs",
        scripts: {
          test: data.testCommand || "",
          build: data.buildCommand || "",
          dev: "nodemon src/index.js",
          format: "prettier . --write"
        }
      },
      null,
      2
    )
  );

  // Install dependencies
  console.log("📦 Installing dependencies...");
  execSync("npm install express dotenv", { cwd: projectPath, stdio: "inherit" });

  // Install dev dependencies
  console.log("🔧 Installing dev dependencies...");
  execSync("npm install -D nodemon prettier", {
    cwd: projectPath,
    stdio: "inherit"
  });

  // Create src folder and index file
  fs.mkdirSync(path.join(projectPath, "src"), { recursive: true });

  fs.writeFileSync(
    path.join(projectPath, "src/index.js"),
    `
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server running with Beehive 🐝");
});

app.listen(PORT, () => console.log(\`🚀 Server running at http://localhost:\${PORT}\`));
`
  );

  console.log(`🎉 Project ${data.projectName} created successfully!`);
}
