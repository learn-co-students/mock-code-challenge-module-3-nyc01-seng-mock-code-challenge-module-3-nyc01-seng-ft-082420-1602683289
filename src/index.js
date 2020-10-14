document.addEventListener('DOMContentLoaded', () => {
  const dogUrl = 'http://localhost:3000/dogs/'

  const getDogs = () => {
    const tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ""
    fetch(dogUrl)
    .then(response => response.json())
    .then(dogData => {
      for (dog of dogData){
        const tableRow = document.createElement('tr')
        tableRow.innerHTML = `
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button data-dog-id= "${dog.id}">Edit</button></td>
        `
        tableBody.append(tableRow)
      }
    })
  }

  const editDog = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('[data-dog-id]')) {
        const dogId = e.target.dataset.dogId
        fetch(dogUrl + dogId)
        .then(response => response.json())
        .then(dogData => {
          dogForm = document.getElementById('dog-form')
          let inputs = dogForm.querySelectorAll("input")
          inputs[0].value = dogData.name
          inputs[1].value = dogData.breed
          inputs[2].value = dogData.sex
          inputs[3].id = dogData.id  //stored the dog's id on the submit button for some reason ¯\_(ツ)_/¯
        })
      }
    })
  }

  const postDog = () => {
    document.addEventListener('submit', e => {
      e.preventDefault()
      if (e.target.matches('#dog-form')){
        const dogForm = e.target
        let inputs = dogForm.querySelectorAll("input")
        let dogId = inputs[3].id
        options = {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({
            name: inputs[0].value,
            breed: inputs[1].value,
            sex: inputs[2].value,
          })
        }

        fetch(dogUrl+dogId, options)
        .then(response => response.json())
        .then(newDog => getDogs())
      }
    })
  }

  getDogs()
  editDog()
  postDog()


  // ----------------------- //
  // Additional Functionality //

  const renderForm = () => {
    const form =document.createElement('form')
    form.innerHTML = `
    <form id="new-dog-form" class="padding margin border-round border-grey">
        <input type="text" name="name" placeholder="dog's name" value="">
        <input type="text" name="breed" placeholder="dog's breed" value="">
        <input type="text" name="sex" placeholder="dog's sex" value="">
        <input type="submit" value="Submit">
      </form>
    `
    return form
  }

  const registerNewDogs = () => {
    newDogBtn = document.createElement('Button')
    newDogBtn.textContent = "Register Dog"
    newDogBtn.id = "register"
    form = document.getElementById('dog-form')
    form.insertAdjacentElement('afterend', newDogBtn)

    newDogBtn.addEventListener('click', e => {
      const newForm = renderForm()
      newDogBtn.insertAdjacentElement('afterend', newForm)

      //  1) grab values from form
      //  2) fetch POST to localhost3000/dogs
      //  3) assign values from Step 1 to Body of POST
      //  4) Run getDogs to update the table
    })
  }

registerNewDogs()

})
