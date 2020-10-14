document.addEventListener('DOMContentLoaded', () => {

const fetchUrl = " http://localhost:3000/dogs"
const tableBody = document.querySelector("tbody#table-body")
// console.log(tableBody)

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
    const trTag1 = document.createElement("tr")
    const trTag2 = document.createElement("tr")

    trTag1.innerText = `${dogObj.name}`
    trTag2.innerText = `${dogObj.breed}`
    //  `
    // <td>${dogObj.name}</td>
    //  <td>*${dogObj.breed}</td> 
    //  <td>${dogObj.sex}</td> 
    //  <td><button>Edit</button></td>
    // `
   
    tableBody.append(trTag1)
    tableBody.append(trTag2)
    // console.log(trTag1)
}

const submitHandler = () => {
    document.addEventListener('submit', (e) => {
        e.preventDefault()
        const form = e.target
        // console.log(form)

    })

}

 

submitHandler()
getDogs()
})