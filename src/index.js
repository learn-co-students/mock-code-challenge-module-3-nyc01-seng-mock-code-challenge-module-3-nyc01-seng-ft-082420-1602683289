document.addEventListener('DOMContentLoaded', () => {

    baseUrl = "http://localhost:3000/dogs/"

    // GET to /dogs to get all dogs from server 
    const getDogs = () => {
        fetch (baseUrl)
        .then(response => response.json())
        .then(dogs => {
            renderDogs(dogs)
        })
    }

    //renderDogs to iterate through & render each dog to DOM
    const renderDogs = dogs => {
        const dogTable = document.querySelector(".margin")
        for(const dog of dogs){
            renderDogs(dog, dogTable)
        }
    }

    // create row for each dog (<tr> with <th>)
    // add HTML to the row
    // append the row the table ( <table class='margin' border="1"> )
    const renderDog = (dog, dogTable) => {
        const dogRow = document.querySelector(".padding")
        dogRow.innerHTML = `
        <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td></tr>
        `
        dogTable.append(dogRow)
        console.log(dogRow)
    }





getDogs();

})