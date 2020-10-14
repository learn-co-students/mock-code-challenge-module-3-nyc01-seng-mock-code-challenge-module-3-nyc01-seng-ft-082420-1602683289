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
//This part messed me up because I'm very confused on how to create a table
const renderDog = (dogObj) => {
    const tableBody = document.querySelector("tbody#table-body")
    const trTag = document.createElement("tr")
    const tdTag = document.createElement("td")
trTag.append(tdTag)
tableBody.append(trTag)
// document.querySelector()
//     tdTag.textContent= `
//   <td>${dogObj.name}</td> <td>*${dogObj.breed}</td> <td>${dogObj.sex}</td> <td><button>Edit</button></td>
//   `
   
    // console.log(trTag)
}

//I couldn't continue to this part because I wasn't able to create an edit button. For this part, I knew that I was supposed to create a submit listener and then create another fetch request, which in this case is a PATCH.
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