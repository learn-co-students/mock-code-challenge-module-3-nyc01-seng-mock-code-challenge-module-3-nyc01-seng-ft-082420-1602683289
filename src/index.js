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

    const getDogs = () => {
        fetch(baseUrl)
            .then(response => response.json())
            .then(dogs => renderDogs(dogs))
    }
    
    const renderDogs = dogs => {
        for (let dog of dogs)
        renderDog(dog)
    }

    const renderDog = dog => {
        const tableBody = document.querySelector("#table-body")
        const dogRow = document.createElement("tr")
        dogRow.dataset.id = dog.id
        dogRow.innerHTML = `
        <tr>
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button data-id=${dog.id}}>Edit</button></td>
        </tr>
        `
        tableBody.append(dogRow)
    }

    /* Clicking on the edit button next to a dog should populate the top form with that dog's current information. */
    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            if (e.target.matches("button")){
                const form = document.querySelector("#dog-form")
                // the text of the input form should be the dog's name, breed, and sex
                form.name.value = dog.name
                form.breed.value = dog.breed
                form.sex.value = dog.sex
            }
        })
    }

    /* NEED TO TEST - update table upon submitting */
    const submitHandler = () => {
        document.addEventListener("submit", (e) => {
            e.preventDefault();
            const options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "": "application/json"
                    },
                    body: JSON.stringify({
                        name: dog.name,
                        breed: dog.breed,
                        sex: dog.sex
                })
                }

            /* new get request */
                const getDogs = () => {
                    fetch(baseUrl, options)
                        .then(response => response.json)
                        .then(renderDogs(options))
                }
                getDogs();
        })
    }
            


    getDogs();
    clickHandler();
    // submitHandler();
})