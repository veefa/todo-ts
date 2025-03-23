import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import { text } from "stream/consumers";

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
const addTasks = async () => {
    const answer = await inquirer.prompt({
        type: "input",
        name: "text",
        message: "Enter a new task:",
    });
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        text: answer.text,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks(tasks);

    console.log("Task added! ");
};

// Function to mark a task as done
const markAsDone = async () => {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks available.")
        return;
    }

    const answer = await inquirer.prompt({
        type: "number",
        name: "id",
        message: "Enter task ID to mark as done:",
    });

    const task = tasks.find(t => t.id === answer.id);
    if (task) {
    task.completed = true;
    saveTasks(tasks);
    console.log("Task marked as done!");
    } else {
    console.log("Invalid task ID.");
    }
};