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

  const baseUrl = "http://localhost:3000/dogs/"
  const tableBod = document.getElementById('table-body')


  const getDogs = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(dogs => {
      renderDogs(dogs)
    })
  }

  const renderDogs = dogs => {
    tableBod.innerHTML = ""
    for (const dog of dogs) {
      renderDog(dog)
      
    }
  }

  
  const renderDog = dog => {
    
    const tableRow = document.createElement('tr')
    tableRow.classList.add('dog-info')
    tableRow.innerHTML = `
    <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-dog-id="${dog.id}">Edit</button></td>`

    tableBod.append(tableRow)
  }

  const clickhandler = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('button')) {
        const editButton = e.target
        const form = document.getElementById('dog-form')
        let editDogName = editButton.parentElement.parentElement.children[0].textContent
        let editDogBreed = editButton.parentElement.parentElement.children[1].textContent
        let editDogSex = editButton.parentElement.parentElement.children[2].textContent

        form.name.value = editDogName
        form.breed.value = editDogBreed
        form.sex.value  = editDogSex
        form.dataset.dogId = editButton.dataset.dogId
        
      }
    })
  }

  const submitHandler = () => {
    const form = document.getElementById('dog-form')
    form.addEventListener('submit', e => {
      e.preventDefault()
      const dogForm = e.target
      const dogId = dogForm.dataset.dogId
      const name = dogForm.name.value
      const breed = dogForm.breed.value
      const sex = dogForm.sex.value
      
      const updatedDog = {name: name, breed: breed, sex: sex}
      
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
      .then(dog => {

        getDogs()
      }) 
    })
  }



  submitHandler()
  clickhandler()
  getDogs()
})


//////////////////////////////////////////////////////////////////////////////


