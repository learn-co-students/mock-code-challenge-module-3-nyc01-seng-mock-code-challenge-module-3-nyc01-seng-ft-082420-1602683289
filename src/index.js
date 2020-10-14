document.addEventListener("DOMContentLoaded", () => {

    baseUrl = "http://localhost:3000/dogs/"

    // create row for each dog (<tr> with <th>)
    // add HTML to the row
    // append the row the table
    const renderDog = (dog, dogTableBody) => {
        const dogRow = document.createElement("tr")
        dogRow.innerHTML = `
        <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-dog-id ="${dog.id}">Edit</button></td>
        `
        dogTableBody.append(dogRow)
    }

    // //renderDogs to iterate through & render each dog to DOM
    const renderDogs = dogs => {
        const dogTableBody = document.querySelector("#table-body")
        for(const dog of dogs){
            renderDog(dog, dogTableBody)
        }
    }

    // GET to /dogs to get all dogs from server 
    const getDogs = () => {
        fetch (baseUrl)
        .then(response => response.json())
        //.then(console.log)
        .then(dogs => {
            renderDogs(dogs)
        })
    }

 


    getDogs()

});