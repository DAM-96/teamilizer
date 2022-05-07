const fileSys = require("fs");

const doc = {
    top: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Teamilizer: My Team</title>
</head>
<body>
    <header style="background-color: #563d7c">
        <div class="container-fluid p-4">
            <h1 class="text-center text-light font-weight-bold">Teamilizer: My Team</h1>
    </header>
    <div class="container m-3">
        <div>
            <h2 class="font-weight-bold">Meet the team</h2>
            <p class="text-justify m-3 lead">
                This are the team members that were input into the application; this text area should be editted in the HTML file to better suit the needs of the team.
            </p>
        </div>
    `,
    bottom: `
    </div>
    <footer class="text-center text-lg-start bg-light text-muted">
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div class="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/daniel-alejandro-moreno-garza-3a19b4127/" target=”_blank” class="m-4 text-reset">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/DAM-96" target=”_blank” class="m-4 text-reset">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </section>
    </footer>
    <script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js" integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc" crossorigin="anonymous"></script>
</body>
</html>
    `
}

function getManagerText(manager){
    return `
    <div class="container m-2">
        <h3>Manager</h3>
        <div class="d-flex flex-row justify-content-around flex-wrap">
        <div class="card m-3">
            <div class="card-header" style="background-color: #F1D588">
                <h4 class="card-title">${manager.name}</h4>
            </div>
            <div class="card-body">
                <p class="card-text">Employee ID: ${manager.id}</p>
                <p class="card-text">Email: ${manager.email}</p>
                <p class="card-text">Office Number: ${manager.officeNumber}</p>
            </div>
        </div>
        </div>
    </div>
    `
}

function getEngineersText(engineers){
    let outPutText = `
    <div class="container m-2">
        <h3>Enineers</h3>
        <div class="d-flex flex-row justify-content-around flex-wrap">
    `;
    for( let i = 0; i < engineers.length; i++){
        outPutText += `
            <div class="card m-3">
                <div class="card-header" style="background-color: #FCB08C">
                    <h4 class="card-title">${engineers[i].name}</h4>
                </div>
                <div class="card-body">
                    <p>Employee ID: ${engineers[i].id}</p>
                    <p>Email: ${engineers[i].email}</p>
                    <p>GitHub page: <a href="https://github.com/${engineers[i].github}">https://github.com/${engineers[i].github}</a></p>
                </div>
            </div>
        `
    }
    outPutText += `
        </div>
    </div>
    `;

    return outPutText;
}

function getInternsText(interns){
    let outPutText = `
    <div class="container m-2">
        <h3>Interns</h3>
        <div class="d-flex flex-row justify-content-around flex-wrap">
    `;
    for( let i = 0; i < interns.length; i++){
        outPutText += `
        <div class="card m-3">
        <div class="card-header" style="background-color: #BBE5ED">
            <h4 class="card-title">${interns[i].name}</h4>
        </div>
        <div class="card-body">
            <p class="card-text">Employee ID: ${interns[i].id}</p>
            <p class="card-text">Email: ${interns[i].email}</p>
            <p class="card-text">School: ${interns[i].school}</p>
        </div>
    </div>
        `
    }
    outPutText += `
        </div>
    </div>
    `;
    return outPutText;
}

function generateFileContents(members) {
    fileContents = doc.top + getManagerText(members.manager);
    if(members.engineers){
        if(members.engineers.length > 0)  fileContents += getInternsText(members.engineers)
    }
    if(members.interns){
        console.log(members.interns[0].id)
        if(members.interns.length > 0)  fileContents += getInternsText(members.interns)
    }
    fileContents += doc.bottom;
    return fileContents
}

function writeToFile(data) {
    let fileName = "Teamilizer.html"
    fileSys.writeFile(fileName, data, function(error){
        if(error) console.error("Error: ", error);
        console.log(`${fileName} created successfully at: ${__dirname}`)
    });
}

function generateHTML(members){
    let fileContents = generateFileContents(members);
    writeToFile(fileContents);
}

module.exports = generateHTML;