import { mkdir, readFile, writeFile } from "fs/promises";
import siteData from "./siteData.json";

export const help = () => {
  return "We are here to help you email us at help@getdezign.org";
};

// todo init command for site creation

export const init = async (projectName) => {
  // ? reading the file;
  let template = await readFile(
    new URL("./template.html", import.meta.url),
    "utf-8"
  );

  const templateCopy = template;

  let style = await readFile(new URL("./style.css", import.meta.url), "utf-8");

  // ? modifying data

  for (const [key, val] of Object.entries(siteData)) {
    template = template.replace(`{${key}}`, val);
  }

  // ? creating folder
  let currentDirectory = process.cwd() + "/" + projectName;
  await mkdir(currentDirectory);

  // ? writing file
  await writeFile(currentDirectory + "/index.html", template);
  await writeFile(currentDirectory + "/style.css", style);
  await writeFile(
    currentDirectory + "/userData.json",
    JSON.stringify(siteData)
  );
  await writeFile(currentDirectory + "/template.html", templateCopy);
};

// ------------------------------------------------\\
// ------------------------------------------------\\
// ------------------------------------------------\\

// todo build command
export const build = async () => {
  let currentDirectory = process.cwd();
  // ? reading the file;
  let userData = await JSON.parse(
    readFile(currentDirectory + "/userData.mjs", "utf-8")
  );
  console.log(userData.userName);
  let templateData = await readFile(
    new URL("./template.html", import.meta.url),
    "utf-8"
  );

  //   let userData = import("./userData.mjs");
  //   let userData = data.slice(24);
  // ? modifying data
  //   import siteData from "./userData.mjs";
  //   console.log(siteData);
  for (const [key, val] of Object.entries(siteData)) {
    template = template.replace(`{${key}}`, val);
  }
  //   console.log(data.slice(24));

  // ? creating folder
  //   await mkdir(currentDirectory);

  // ? writing file
  await writeFile("./index.html", template);

  //   await writeFile(currentDirectory + "/siteData.mjs", data);
};
