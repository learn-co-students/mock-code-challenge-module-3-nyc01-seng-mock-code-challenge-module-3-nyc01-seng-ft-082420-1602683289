// BE: Start server, FE: open index.html (will test in console in FE)

// 1. On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
    //DONE// GET request to /dogs
    //DONE// iterate through dogs and render them on page w/ render(dogs)

// 2. The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`
    //DONE// No table elements in the HTML (Table Body) - must create from scratch
    //DONE// Inject HTML into created elements w/ .innerHTML

// 3. Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
    // Put click listener on the edit button 
    // Get specific dog's data & populate the form 

// 4. On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// 5. Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.
    // Put submit listener on the form
    // Get data out of form
    // PATCH request to update the dog 
    // Re-render the dogs to relflect that change 

    document.addEventListener("DOMContentLoaded", () => {
        //2
        const baseUrl = "http://localhost:3000/dogs/"
        
        //1A
        const getDogs = () => {
            fetch(baseUrl)
            .then(response => response.json())
            //.then(data => console.log(data)) --> make sure you have getDogs() at bottom, this prints nested array of all dogs
            .then(dogs => {
                renderDogs(dogs)
            })
        }

        //3
        const renderDogs = dogs => {
            const dogTableBody = document.querySelector("#table-body")
            for(const dog of dogs){
                renderDog(dog, dogTableBody)
            }
        }

        //4
        const renderDog = (dog, dogTableBody) => {
            const dogTr = document.createElement("tr")
            dogTr.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button data-purpose="edit" data-dog-id="${dog.id}">Edit</button></td>
            `
            //console.log(dogTr) --> should see individual rows printed to console
            dogTableBody.append(dogTr)
        }

        //5B
        const clickHandler = () => {
            document.addEventListener("click", e=> {
          if(e.target.matches(`[data-purpose="edit"]`)){
              console.log(e.target) //--> button element prints to console when edit button is clicked
              const button = e.target
              //const dogId = button.dataset.dogId
              // need info in other cells - get those cells (get the tr then get it's children - all the tds)
              // .closest searches up the DOM tree, searches the ancestors that match the selector params
              const dogTr = button.closest("tr")
              //console.log(dogTr) //--> click edit button, prints correspdoning Tr
              const cells = dogTr.children
              //console.log(cells) //--> returns HTML collection  of children (Td - cell content) - need to index in to get cell values
              const name = cells[0].textContent
              const breed = cells[1].textContent
              const sex = cells[2].textContent
              //console.log(name, breed, sex) --> returns all row's values - name, age, sex pulled out of collection
              //putting values into form to populate textfield on form
              const form = document.querySelector('#dog-form')
              form.name.value = name
              form.breed.value = breed
              form.sex.value = sex
              form.dataset.dogId = button.dataset.dogId //--> already did this in the button
          }
            })
        }

        //6B
        const submitHandler = () => {
            const form = document.querySelector("#dog-form") // submit has to go on form
            form.addEventListener("submit", e => {
                e.preventDefault()
                //console.log("submit") //--> hit submit and see "submit" printed to console - have right target
                const dogForm = e.target
                const dogId = dogForm.dataset.dogId
                // get values out of form and saving them to a variable
                const name = dogForm.name.value
                const breed = dogForm.breed.value
                const sex = dogForm.sex.value
                //console.log(name, breed, sex) //--> click edit then hit submit, logs name, breed, sex to console
                
                const dog = { name: name, breed: breed, sex: sex }
                
                const options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(dog)
                }

                fetch(baseUrl + dogId, options)
                .then(response => response.json())
                .then(_dog => {
                    getDogs()
                })
            })
        }            
        

        //1B
        getDogs()
        //5A
        clickHandler()
        //6A
        submitHandler()
    })
