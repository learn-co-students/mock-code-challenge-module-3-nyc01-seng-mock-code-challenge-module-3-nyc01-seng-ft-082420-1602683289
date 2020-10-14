document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    clickHandler()
    submitHandler()
})
DOGS_URL = "http://localhost:3000/dogs/"

function fetchDogs() {
    fetch(DOGS_URL)
    .then(response => response.json())
    .then(dogs => renderDogs(dogs))
}

function renderDogs(dogs) {
    const tableBody = document.querySelector("#table-body")
    dogs.forEach(dog => renderDog(dog, tableBody))
}

function renderDog(dog, tableBody) {
    let tableRow = document.createElement("tr")
    tableRow.innerHTML = `
    <td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td><td><button id="${dog.id}">Edit Dog</button></td>
    `
    tableBody.append(tableRow)
}

function clickHandler() {
    document.addEventListener("click", e => {
        if(e.target.matches("button")) {
        const form = document.querySelector("#dog-form")
        let inputName = form.name.value
        let inputBreed = form.name.value
        let inputSex = form.sex.value
        let dogId = e.target.id
        let dogData = e.target.parentElement.parentElement
        console.dir(e.target.parentElement.parentElement)
        }
    })
}

function submitHandler() {
    document.addEventListener("submit", e => {
        e.preventDefault()
        console.log(e.target)
    })
}