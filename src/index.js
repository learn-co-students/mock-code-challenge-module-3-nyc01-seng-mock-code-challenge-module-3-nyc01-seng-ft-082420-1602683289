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
    tableRow.dataset.id = dog.id
    tableRow.innerHTML = `
    <td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td><td><button id="${dog.id}">Edit Dog</button></td>
    `
    tableBody.append(tableRow)
}

function clickHandler() {
    document.addEventListener("click", e => {
        if(e.target.matches("button")) {
        const form = document.querySelector("#dog-form")
        let dogData = e.target.parentElement.parentElement
        form.name.value = dogData.children[0].innerText
        form.breed.value = dogData.children[1].innerText
        form.sex.value = dogData.children[2].innerText
        form.name.id = e.target.id
        }
    })
}

function submitHandler() {
    document.addEventListener("submit", e => {
        e.preventDefault()
        const form = document.querySelector("#dog-form")
        let dogName = form.name.value
        let dogId = form.name.id
        let dogBreed = form.breed.value
        let dogSex = form.sex.value
        updateDog(dogId, dogName, dogBreed, dogSex)
        form.reset()
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
        const dogElement = document.querySelector(`[data-id="${dog.id}"]`)
        dogElement.children[0].innerText = dog.name
        dogElement.children[1].innerText = dog.breed
        dogElement.children[2].innerText = dog.sex
    })
    .catch(error => {
        alert("Sorry, it seems your dog did not qualify. Better luck next year!")
    })
}