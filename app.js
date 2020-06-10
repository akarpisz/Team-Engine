const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const prompt = require("inquirer").prompt;
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employees = [];
let html;
const managerPrompt = async () => {
  try {
    const { name, id, email, officeNumber } = await prompt([
      {
        name: "name",
        message: "Manager's Name:",
      },
      {
        name: "id",
        message: "Manager's Id:",
      },
      {
        name: "email",
        message: "Manager's Email Address:",
      },
      {
        name: "officeNumber",
        message: "Manager's Office Phone Number:",
      },
    ]);
    employees.push(new Manager(name, id, email, officeNumber));
  } catch (err) {
    throw err;
  }
};
const internPrompt = async () => {
  try {
    const { name, id, email, school } = await prompt([
      {
        name: "name",
        message: "Intern's Name:",
      },
      {
        name: "id",
        message: "Intern's Id:",
      },
      {
        name: "email",
        message: "Intern's Email Address:",
      },
      {
        name: "school",
        message: "Intern's School:",
      },
    ]);
    employees.push(new Intern(name, id, email, school));
  } catch (err) {
    throw err;
  }
};

const engineerPrompt = async () => {
  try {
    const { name, id, email, github } = await prompt([
      {
        name: "name",
        message: "Engineer's Name:",
      },
      {
        name: "id",
        message: "Engineer's Id:",
      },
      {
        name: "email",
        message: "Engineer's Email Address:",
      },
      {
        name: "github",
        message: "Enter The Engineer's Github:",
      },
    ]);
    employees.push(new Engineer(name, id, email, github));
  } catch (err) {
    throw err;
  }
};


const mainPrompt = async () => {
  try {
    const { next } = await prompt([
      {
        name: "next",
        message: "What team member would you like to add?:",
        type: "list",
        choices: ["Intern", "Engineer", "Manager", "I'm finished"],
      },
    ]);

    switch (next) {
      case "I'm finished":
        console.log(employees);
        html = render(employees);
        return;
      case "Manager":
        await managerPrompt();
        await mainPrompt();
        return;
      case "Intern":
        await internPrompt();
        await mainPrompt();
        return;
      case "Engineer":
        await engineerPrompt();
        await mainPrompt();
        return;
    }
  } catch (err) {
    throw err;
  }
};

const write = async () => {
  try {
    await fs.mkdirSync(OUTPUT_DIR, (err) => {
      throw err;
    });
    await fs.writeFileSync(outputPath, html, (err) => {
      throw err;
    });
  } catch (err) {
    throw err;
  }
};

const init = async (html) => {
  try {
    await mainPrompt();
    await write(html);
  } catch (err) {
    throw err;
  }
};
init();

