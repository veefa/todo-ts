import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

interface Tesk {
    id: number,
    text: string,
    completed: boolean
}