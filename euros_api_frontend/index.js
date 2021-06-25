let button = document.getElementById("teams");
button.addEventListener('click',getData);

async function getData() {

    try {
        let data = await fetch('http://localhost:3000/teams');
        let json = await data.json();
        appendResponse(json);
    } catch (error) {
        console.log(error)
    }

}

function appendResponse(data) {

    let section = document.querySelector('section');
    let list = document.createElement('ul');

    data.forEach(team => {
        let li = document.createElement('li');
        li.textContent = team;
        li.addEventListener('click',() => {
            getSquad(team);
        })
        list.append(li);
    });

    section.append(list);
}

let submitBtn = document.getElementById("addBtn");
submitBtn.addEventListener('click', addNewTeam);

function addNewTeam () {
    let dataToSend = {
        "team": document.getElementById("country").value
    }
    postJsonData(dataToSend);
}

async function postJsonData(jsonObject) {
    const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });
    
    const actualResponse = await response.json();
}


function getSquad(team) {
    console.log(team);
}