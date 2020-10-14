/*

1. On page load, render list of dogs in table
    GET "http://localhost:3000/dogs"

    fetch request here
2. Dog put on table as row. HTML should look like:
    <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
    render dogs 
3. Dog editable. Clicking edit button next to a dog should populate the form,
  with current dog's info.
  clickhandler to create form?
4. Submit of form, A PATCH request should be made to "http://localhost:3000/dogs/:id"
    to update dog info (include name, breed, and sex attributes)
  submit handler to patch the form 
5. Once form is submitted, the table should reflect updated dog information.
    make new get request after Patch to rerender all the dogs put on the DOM with new dog info

*/



document.addEventListener('DOMContentLoaded', () => {

  const baseUrl = "http://localhost:3000/dogs"
  
  const getDogs = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(dogs => {
      renderDogs(dogs)
    })
  }

  const renderDogs = dogs => {

    for (const dog of dogs) {
      renderDog(dog)
      
    }
  }

  const table = document.querySelector('table')
  
  const renderDog = dog => {
    const tableBod = document.getElementById('table-body')

    const tableRow = document.createElement('tr')
    tableRow.innerHTML = `
    <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td>`

    tableBod.append(tableRow)
  }

  getDogs()
})