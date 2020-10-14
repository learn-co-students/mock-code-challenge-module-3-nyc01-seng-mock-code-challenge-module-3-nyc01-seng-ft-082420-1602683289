document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => renderDogs(dogs))
}

function renderDogs(dogs) {
    for (dog of dogs) {
        renderDog(dog)
    }
}

function renderDog(dog) {
    const dogRow = document.createElement("tr")
    dogRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button>Edit</button></td></tr>
    `
    const dogTable = document.querySelector("#table-body")
    dogTable.append(dogRow)
}