document.addEventListener('DOMContentLoaded', () => {

const fetchUrl = " http://localhost:3000/dogs"
const tableBody = document.querySelector("tbody#table-body")
console.log(tableBody)

const getDogs = () => {
    fetch(fetchUrl)
    .then(response => response.json())
    .then(dog => {
        renderDogs(dog)
    })
}

const renderDogs = (dog) => {
    for (const dogObj of dog) {
        // console.log(dogObj)
        renderDog(dogObj)
    }
}

const renderDog = (dogObj) => {
    const trTag = document.createElement("tr")
    // trTag.dataset.id = `${dogObj.id}`
    // trTag.innerText = `${dogObj.name}`
    // trTag.innerText = `${dogObj.breed}`
    // trTag.innerText = `${dogObj.sex}`
    

    
    console.log(dogObj)
}
 


getDogs()
})