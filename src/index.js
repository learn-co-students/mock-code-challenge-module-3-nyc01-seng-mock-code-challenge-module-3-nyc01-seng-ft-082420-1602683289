document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000/dogs/'
  
  const getDogs = () => {
    document.querySelector('#table-body').innerHTML = ''
    
    fetch(baseUrl)
      .then(response => response.json())
      .then(dogs => {
        for(const dog of dogs) {
          renderDog(dog)
        }
      })
  }

  const renderDog = dogObj => {
    const dogsTable = document.querySelector('#table-body')
    const dogRow = document.createElement('tr')
    dogRow.dataset.dogId = dogObj.id

    dogRow.innerHTML = `
      <td>${dogObj.name}</td> 
      <td>${dogObj.breed}</td> 
      <td>${dogObj.sex}</td> 
      <td><button>Edit</button></td>
    `
    dogsTable.append(dogRow)
  }

  const clickHandler = () => {
    const dogsTable = document.querySelector('#table-body')

    dogsTable.addEventListener('click', e => {
      if(e.target.matches('button')) {
        const editBtn = e.target
        const dogRow = editBtn.parentElement.parentElement
        const dogId = dogRow.dataset.dogId
        const editForm = document.querySelector('#dog-form')

        const dogInfo = dogRow.querySelectorAll('td')

        const dogName = dogInfo[0].textContent
        const dogBreed = dogInfo[1].textContent
        const dogSex = dogInfo[2].textContent

        editForm.dataset.dogId = dogId
        editForm.name.value = dogName
        editForm.breed.value = dogBreed
        editForm.sex.value = dogSex
      } 
    })
  }

  const submitHandler = () => {
    document.addEventListener('submit', e => {
      e.preventDefault()
      const editForm = document.querySelector('#dog-form')
      const dogId = editForm.dataset.dogId

      const dogInfo = {
        name: editForm.name.value,
        breed: editForm.breed.value,
        sex: editForm.sex.value
      }
      
      const options = {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(dogInfo)
      }
      
      fetch(baseUrl + dogId, options)
        .then(response => response.json())
        .then(dog => {
          console.log(dog)
          editForm.reset()
          getDogs()
        })
      
    })
  }
  
  submitHandler()
  clickHandler()
  getDogs()
})



// ✅ 1. GET to /dogs 
// ✅ 2. render those dogs to the page (table)
// ✅ 3. click listener on the edit button
// ✅ 4. when clicked should populate the form with the current dog(table row) info
// ✅ 5. submit listener on that edit form
// ✅ 6. on submit, PATCH request to /dogs/:id with info from form
// ✅ 7. update table i.e. go get the dogs again