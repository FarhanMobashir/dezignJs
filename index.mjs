#! /usr/bin/env node
import { Command } from "commander/esm.mjs";
import chalk from "chalk";
import { init } from "./function.mjs";
import { help } from "./function.mjs";
import ora from "ora";
import { build } from "./function.mjs";

const program = new Command();

program
  .command("init <projectname>")
  .description("initializing a template")
  .action((projectname) => {
    init(projectname);
    const spinner = ora("Site creation in progress").start();

    setTimeout(() => {
      spinner.color = "yellow";
      spinner.text = "building html";
    }, 2000);
    setTimeout(() => {
      spinner.color = "green";
      spinner.text = "building css";
    }, 4000);

    setTimeout(() => {
      spinner.stop();

      console.log(chalk.bold("finished..."));
      console.log(
        `run ${chalk.greenBright("cd" + " " + projectname)} to get started`
      );
    }, 6000);
  });

program
  .command("build")
  .description("building files")
  .action(() => {
    build();
    const spinner = ora("Building your files").start();

    setTimeout(() => {
      spinner.color = "yellow";
      spinner.text = "building html";
    }, 2000);
    setTimeout(() => {
      spinner.color = "green";
      spinner.text = "building css";
    }, 4000);

    setTimeout(() => {
      spinner.stop();

      console.log(chalk.bold("finished..."));
    }, 6000);
  });

// program
//   .command("print <projectname>")
//   .description("testing the generation process | make template")
//   .action((projectName) => {
//     const spinner = ora("Site creation in progress").start();

//     setTimeout(() => {
//       spinner.color = "yellow";
//       spinner.text = "building html";
//     }, 2000);
//     setTimeout(() => {
//       spinner.color = "green";
//       spinner.text = "building css";
//     }, 4000);

//     setTimeout(() => {
//       spinner.stop();

//       console.log(chalk.bold("finished..."));
//       console.log(
//         `run ${chalk.greenBright("cd" + " " + projectName)} to get started`
//       );
//     }, 6000);
//   });

program.parse(process.argv);
const options = program.opts();
if (options.help) console.log(help());
if (options.print) {
  console.log("Hey you get out!");
}
