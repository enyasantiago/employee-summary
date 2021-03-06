const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");
const { type } = require("os");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const EmployeeObjects = []


const baseQuestions = [
    {
        name: "name",
        type: "input",
        message: "Name"
    },
    {
        name: "id",
        type: "input",
        message: "id"
    },
    {
        name: "email",
        type: "input",
        message: "Email"
    }
    
]
const EmployeePrompts = {
    Manager: [
        ...baseQuestions,
        {
            name: "last_arg",
            type: "input",
            message: "Office Number"
        }
    ],
    Engineer: [
        ...baseQuestions,
        {
            name: "last_arg",
            type: "input",
            message: "gitHub"
        }
    ],
    Intern: [
        ...baseQuestions,
        {
            name: "last_arg",
            type: "input",
            message: "School"
        }
    ]
    
}





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
chooseEmployee()

function chooseEmployee(){
    console.log("Build your engineering team. A team consists of a manager and any number of engineers and interns.")
    inquirer.prompt({
        name:"type",
        type:"rawlist",
        message: "What type?",
        choices:["Manager","Engineer", "Intern", "Exit"]
    })
    .then(response => response.type !== "Exit" ? getEmployee(response.type) : finish())
}



function getEmployee(Schema){
    inquirer.prompt(EmployeePrompts[Schema])
        .then(r => {
            if (Schema === "Engineer") { 
                const newEngineer = new Engineer(r.name, r.id, r.email, r.last_arg)
                console.log(newEngineer)
                EmployeeObjects.push(newEngineer)
            } else if (Schema === "Manager") { 
                const newManager = new Manager(r.name, r.id, r.email, r.last_arg)
                console.log(newManager)
                EmployeeObjects.push(newManager)
            } else { 
                const newIntern = new Intern(r.name, r.id, r.email, r.last_arg)
                console.log(newIntern)
                EmployeeObjects.push(newIntern)
            }
        4

            chooseEmployee()
        })
        finish()
}

function finish(){
    try {
        fs.writeFileSync(outputPath, render(EmployeeObjects))
        
    } catch (error){
        console.log(error.message)
    }
}
