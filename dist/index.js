"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
// File to store tasks
const filePath = "tasks.json";
// Function to load tasks from a file
const loadTasks = () => {
    try {
        const data = fs_1.default.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }
    catch (_a) {
        return [];
    }
};
// Function to save tasks to a file
const saveTasks = (tasks) => {
    fs_1.default.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};
// Function to display tasks
const showTasks = () => {
    const tasks = loadTasks();
    console.log("\nYour todo List:");
    tasks.forEach((task) => {
        console.log(`${task.id}. ${task.completed ? "[✔]" : "[ ]"} ${task.text}`);
    });
};
// Function to add a new task
const addTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield inquirer_1.default.prompt({
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
});
// Function to mark a task as done
const markAsDone = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks available.");
        return;
    }
    const answer = yield inquirer_1.default.prompt({
        type: "number",
        name: "id",
        message: "Enter task ID to mark as done:",
    });
    const task = tasks.find((t) => t.id === answer.id);
    if (task) {
        task.completed = true;
        saveTasks(tasks);
        console.log("Task marked as done!");
    }
    else {
        console.log("Invalid task ID.");
    }
});
// Function to remove a task
const removeTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks to remove.");
        return;
    }
    const answer = yield inquirer_1.default.prompt({
        type: "number",
        name: "id",
        message: "Enter task ID to remove",
    });
    const newTasks = tasks.filter((t) => t.id !== answer.id);
    saveTasks(newTasks);
    console.log("Task removed!");
});
// Main menu
const mainMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        const answer = yield inquirer_1.default.prompt({
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["Show Tasks", "Add Task", "Mark as Done", "Remove Task", "Exit"],
        });
        if (answer.choice === "Show Tasks")
            showTasks();
        else if (answer.choice === "Add Task")
            yield addTask();
        else if (answer.choice === "Mark as Done")
            yield markAsDone();
        else if (answer.choice === "Remove Task")
            yield removeTask();
        else
            break;
    }
});
mainMenu();
