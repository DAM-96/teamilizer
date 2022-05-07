const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHTML = require('./utils/generateHTML');

const questionManager = [
    {
        type: 'input',
        name: 'managerName',
        message: "Initializing Teamilizer!\nInput the name of your team starting by the manager...\n\nManager's name: ",
        default: "Mr. Manager"
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "Office number",
        default: "52888888888888"
    },    
];

const commonQuestions = [
    {
        type: 'input',
        name: 'employeeID',
        message: "Employee ID",
        default: "employeeID"
    },
    {
        type: 'input',
        name: 'email',
        message: "Email adress",
        default: "employee@outlook.com"
    },    
];

const listTeamMember = [
    {
        type: 'list',
        name: 'options',
        message: 'Select any of the following to continue: ',
        choices: [{
            name: "Add a new Engineer to the team",
            value: 'Engineer'
        }, 
        {
            name: "Add a new Intern to the team",
            value:'Intern'
        }, 
        {
            name: "End and create HTML with the current team",
            value: 'Finish'
        }],
    }
];

let members = {
    manager: undefined,
    engineers: [],
    interns: []
}

function init() {
    inquirer.prompt([
        questionManager[0],
        ...commonQuestions,
        questionManager[1],
    ])
    .then((answers) => {        
        members.manager = new Manager(answers.managerName, answers.employeeID, answers.email, answers.officeNumber);
        handleQuestion();
    });
}

function handleQuestion() {
    inquirer.prompt(listTeamMember).then((answers) => {
        if(answers.options !== 'Finish') {
            handleMemeber(answers.options);
        } else {
            generateHTML(members);
        }
    });
}

function handleMemeber(memberType) {
    let customQuestion = undefined;
    if(memberType === "Engineer") {
        customQuestion = [
            {type: 'input', name: 'engName', message: "Engineer's name: ", default: "Engineer"},
            {type: 'input', name: 'github', message: 'GitHub Username: ', default: "git"}
        ]
    }
    else {
        customQuestion = [
            {type: 'input', name: 'intName', message: "Intern's name", default: "Intern"},
            {type: 'input', name: 'school', message: "School's name", default: "Harvard"}
        ]
    }
    inquirer.prompt([customQuestion[0],...commonQuestions, customQuestion[1]]).then((answers) => {
        if(memberType === "Engineer") {
            members.engineers.push(new Engineer(answers.engName, answers.employeeID, answers.email, answers.github));
        } else {
            members.interns.push(new Intern(answers.intName, answers.employeeID, answers.email, answers.school));
        }
        handleQuestion();
    });
}

init();
