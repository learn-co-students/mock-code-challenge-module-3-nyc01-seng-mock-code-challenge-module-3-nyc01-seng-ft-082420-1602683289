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
    tableRow.id = dog.name
    tableRow.innerHTML = `
    <td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td><td><button id="${dog.id}">Edit Dog</button></td>
    `
    tableBody.append(tableRow)
}

function clickHandler() {
    document.addEventListener("click", e => {
        if(e.target.matches("button")) {
        const form = document.querySelector("#dog-form")
        let dogId = e.target.id
        let dogData = e.target.parentElement.parentElement
        form.name.value = dogData.children[0].innerText
        form.breed.value = dogData.children[1].innerText
        form.sex.value = dogData.children[2].innerText
        }
    })
}

function submitHandler() {
    document.addEventListener("submit", e => {
        e.preventDefault()
        const form = document.querySelector("#dog-form")
        let dogName = form.name.value
        let dogElement = document.querySelector(`#${dogName}`)
        let dogId = dogElement.children[3].firstChild.id
        let dogBreed = form.breed.value
        let dogSex = form.sex.value
        // updateDog()
        console.log(dogId)
    })
}

function updateDog(id, name, breed, sex) {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({ "name": name, "breed": breed, "sex": sex})
    }
    fetch(DOGS_URL + id, options)
    .then(response => response.json())
    .then(dog => {
        console.log(dog)
    })
}