const { mkdir, readFile, writeFile } = require("fs/promises");
const siteData = require("./siteData.json");

// todo init command for site creation

const init = async (projectName) => {
  // ? reading the file;
  let template = await readFile(__dirname + "/template.html", "utf-8");

  const templateCopy = template;

  let style = await readFile(__dirname + "/style.css", "utf-8");

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

async function checkDezignProject() {
  let currentDirectory = process.cwd();
  try {
    let template = await readFile(currentDirectory + "/template.html", "utf-8");
    var id = /__dezign/;
    let isTrue = id.test(template);
    console.log(isTrue);
    if (isTrue) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

// todo build command
const build = async () => {
  let currentDirectory = process.cwd();
  // ? reading the file;

  try {
    let template = await readFile(__dirname + "/template.html", "utf-8");

    let userData = await readFile(currentDirectory + "/userData.json", "utf-8");
    userData = JSON.parse(userData);
    // ? modifying data
    for (const [key, val] of Object.entries(userData)) {
      template = template.replace(`{${key}}`, val);
    }

    // ? writing file
    await writeFile("./index.html", template);
  } catch (e) {
    console.log("Sorry it is not a dezign project");
    console.log("Want to make one run dezign init <projectname>");
  }
};

module.exports = { init, build };
