/*
√ - On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

√ - The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`

- Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.

- On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).

- Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information. */

const baseUrl = `http://localhost:3000/dogs/`;

document.addEventListener('DOMContentLoaded', () => {
  
  // fetch all dogs from http://localhost:3000/dogs

  const getDogs = () => {
    return fetch(baseUrl)
    .then(response => response.json())
    .then(data => renderDogsTable(data))
  }

  // render all dogs from ^^ as table row 
    // add id to edit button

  const renderDogsTable = (data) => {
    for(const dog of data){
      renderDog(dog)
    }
  }

  const renderDog = (dog) => {
    // console.log(dog)
    let dogRow = document.createElement('tr');
    dogRow.innerHTML = `
    <td>Dog ${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td>
    `
    document.querySelector('tbody').append(dogRow)
  }

  // edit button click
    // fill out form with dog info
    // 

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if(e.target.matches('[data-id]')){
        let id = e.target.dataset.id
        const dogForm = document.querySelector('#dog-form');
        dogForm.dataset.dogId = id;
      }
    })
  }

  // form submit
    // patch request to http://localhost:3000/dogs/:id 
    // update dog's info - suggested calling render dogs table again

  clickHandler();
  getDogs();
})