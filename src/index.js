
const dTable = document.getElementById("table-body")

console.log(dTable)

fetch("http://localhost:3000/dogs/")
    .then(resp => resp.json())
    .then(json => addDogsToDom(json))

function addDogsToDom(dogs){
    dogs
}

document.addEventListener('DOMContentLoaded', () => {


})
