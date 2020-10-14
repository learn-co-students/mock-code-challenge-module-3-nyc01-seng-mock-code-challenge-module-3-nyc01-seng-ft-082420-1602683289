/* Deliverables:
1. ✅ On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
2. ✅ The dog should be put on the table as a table row. 
    The HTML might look something like this 
    <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
3. Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
4. On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
5. Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.
*/

document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/dogs/"

    // fetch dogs
    const getDogs = () => {
        fetch(baseUrl)
            .then(response => response.json())
            .then(dogs => renderDogs(dogs))
            // console.log(dogs)
    }
    
    const renderDogs = dogs => {
        for (let dog of dogs)
        renderDog(dog)
    }

    // render individual dog where for each dog, the inner HTML should be a table arrangement
    const renderDog = dog => {
        // select where the dogs should appear
        const tableBody = document.querySelector("#table-body")
        const dogRow = document.createElement("tr")
        dogRow.dataset.id = dog.id
        dogRow.innerHTML = `
        <tr>
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button>Edit</button></td>
        </tr>
        `
        // remember to append to tableBody
        tableBody.append(dogRow)
    }

    // Clicking on the edit button next to a dog should populate the top form with that dog's current information.
    const clickHandler = () => {
        document.addEventListener("click", (e) => {

        })
    }





    getDogs();
})