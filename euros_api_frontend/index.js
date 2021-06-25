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

function getSquad(team) {
    console.log(team);
}