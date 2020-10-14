document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/dogs/"
    const tableBody = document.getElementById('table-body')

    const fetchDogs = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(dogs => renderDogs(dogs));
        }
        
        const renderDogs = (dogs) => {
        for(const dog of dogs){
            addDogToDom(dog)
        }
        }
        
        const addDogToDom = (dog) => {
        //    const dogDiv = document.createElement('div')
            const dogTr = document.createElement('tr')
        //    console.log(dogDiv)
        //    let dogTbl = document.querySelector('.dogTr')
            dogTr.dataset.id = dog.id
            dogTr.innerHTML = `
            
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button data-dog-id=${dog.id}>Edit</button></td>
           
            `
            tableBody.appendChild(dogTr)
        }
        
        const clickHandler = () => {
            tableBody.addEventListener('click', e => {
              if(e.target.textContent === "Edit"){
                const button = e.target
        
                const dogTr = button.closest('tr')
                const cells = dogTr.children
        
                const name = cells[0].textContent
                const breed = cells[1].textContent
                const sex = cells[2].textContent
        
                const form = document.querySelector('#dog-form')
                form.name.value = name
                form.breed.value = breed
                form.sex.value = sex
        
                form.dataset.dogId = button.dataset.dogId
              }
            })
          }
        
          const submitHandler = () => {
            const form = document.querySelector('#dog-form')
            form.addEventListener('submit', e => {
              e.preventDefault()
        
              const dogForm = e.target
              const dogId = dogForm.dataset.dogId
              
              const name = dogForm.name.value
              const breed = dogForm.breed.value
              const sex = dogForm.sex.value
              
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
                fetchDogs()

              })
            })
        
          }
        
    fetchDogs()
    clickHandler()
    submitHandler()

})

//Make a dog editable.
//Clicking on the edit button next to a dog should populate
//the top form with that dog's current information.

//- On submit of the form, a PATCH request should
//be made to http://localhost:3000/dogs/:id to update the dog information
//(including name, breed and sex attributes).

//- Once the form is submitted, the table should reflect the updated dog information.
//There are many ways to do this. You could search for the table fields you need
//to edit and update each of them in turn, but we suggest making a new get request
//for all dogs and rerendering all of them in the table. Make sure this GET
//happens after the PATCH so you can get the most up-to-date dog information.