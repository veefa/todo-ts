import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

// File to store tasks
const filePath = "tasks.json"

// Task type
interface Task {
    id: number,
    text: string,
    completed: boolean
};

// Function to load tasks from a file
const loadTasks = (): Task[] => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
      } catch {
        return [];
      }
};

// Function to save tasks to a file
const saveTasks = (tasks: Task[]) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Function to display tasks
const showTasks = () => {
    const tasks = loadTasks();
    console.log("\nYour todo List:");
    tasks.forEach(task =>{console.log(`${task.id}. ${task.completed ? "[✔]" : "[ ]"} ${task.text}`);
    });
};

// Function to add a new task
const addTasks = () => {}