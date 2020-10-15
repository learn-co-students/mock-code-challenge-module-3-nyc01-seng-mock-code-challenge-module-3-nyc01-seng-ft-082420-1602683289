    // Start back end
    // In terminal: open index.html 

// 1. On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
// 2. The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`
    // Step 3. GET request on page load
    // Step 4. Render each dog returned by the server into the table 
    
// 3. Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
    // Step 5: click listener on the edit button 
    // Step 6: Get data off somehow (it's on the DOM in the tr)
    // Step 7: Populate the form with this dog's info

// 4. On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// 5. Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.
    // Step 8: submit listener on the form
    // Step 9: get data out of form
    // Step 10: PATCH request to update the dog 
    // Step 11: Re-render the dogs to relflect that change 


    document.addEventListener("DOMContentLoaded", () => {
        // 2
        const baseUrl = "http://localhot:3000/dogs/"
        const tableBody = document.querySelector("#table-body")
        
        // 1 - need to invoke at bottom
        const getDogs = () => {
            fetch(baseUrl)
            .then (response => response.json())
            //.then(console.log) --> refresh page, dog array prints to console
            .then(dogs => renderDogs(dogs))
        }
        
        //4 - iterate over collection and pass each to renderDog
        const renderDogs = dogs => {
            tableBody.innerHTML = ""
            // ^^ this is for clearing out the old record / not making duplicates when updated/submitting
            dogs.forEach(dog => renderDog(dog))
        }
    
        //5
        const renderDog = dog => {
            //console.log(dog) --> will render each dog object, pulled out of array
            // no trs on the DOM that we can manipulate, must build from scratch
            const dogTr = document.createElement("tr")
            dogTr.innerHTML = `
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button data-dog-id="${dog.id}">Edit</button></td>
            `
            //console.log(dogTr) --> will see individual table rows w/ dog info
            //const tableBody = document.querySelector("#table-body") --> inject as secnond arg works too
            tableBody.append(dogTr)
        }
    
        //6 - need to invoke at bottom - on clicking the edit button, the dog's info populates the form
        const clickHandler = () => {
            tableBody.addEventListener("click", e=> {
                if(e.target.textContent === "Edit"){
                //console.log("edit") --> will only print to console when edit button is clicked
                // need info in other cells - get those cells (get the tr then get it's children - all the tds)
                    const button = e.target
                    // .closest searches up the DOM tree, searches the ancestors that match the selector params
                    const dogTr = button.closest("tr")
                    //console.log(dogTr) --> click edit button, prints proper true
                    const cells = dogTr.children
                    // console.log(cells) --> returns HTML collection  of children - need to index in to get cell values
                    const name = cells[0].textContent
                    const breed = cells[1].textContent
                    const sex = cells[2].textContent
                    //console.log(name, breed, sex) --> can pass multiple args in, click edit button, returns name, breed and sex pulled out of collection
                    const form = document.querySelector("#dog-form")
                    // putting values into form - populate textfield on form with text from cell
                    form.name.value = name
                    form.breed.value = breed
                    form.sex.value = sex
                    form.dataset.dogId = button.dataset.dogId
                    // Now when I click edit, that dog's info populates the form
                    //Pass in ID - not putting in in form but attaching to dataset for later requests - form is target of submit event and this is easy to access to PATCH
                }
            })
        }
    
        //7 - submit needs to go on a form node or on one of it's ancestors like document
        const submitHandler = () => {
            const form = document.querySelector("#dog-form")
            form.addEventListener("submit", e => {
                e.preventDefault()
                //console.log("submit") --> hit submit and see it printed to console - have right target
                const dogForm = e.target
                const dogId = dogForm.dataset.dogId
                // getting values out of form and saving them to a variable
                name = dogForm.name.value
                breed = dogForm.breed.value
                sex = dogForm.sex.value
                //console.log(name, breed, sex) - hit submit, logs info
    
                const dog = {name: name, breed: breed, sex: sex}
    
                const options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(updatedDog)
                }
    
                fetch(baseUrl + dogId, options)
                .then(response => response.json())
                .then(_dog => {
                    getDogs()
                })
                // _dog - not doing anything with this variable - for other devs to know that
            })
        }

        // CREATING A NEW DOG:
            // need submit listener - can change existing using event delegation 
            // get data out of the form 
            // POST request to create a new record with that data
    
    getDogs()
    clickHandler()
    submitHandler()
    
    }