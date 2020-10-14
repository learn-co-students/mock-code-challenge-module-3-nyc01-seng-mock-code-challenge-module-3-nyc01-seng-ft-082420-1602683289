const url = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {

  const renderDogs = (dogs) => {
    for (const dog of dogs) {
      renderDog(dog)
    }
  }

  const renderDog = (dog) => {
    const dogTable = document.querySelector('#table-body')
    const dogRow = document.createElement('tr')
    dogRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td>
      <button data-dog-id="${dog.id}">Edit</button>
    </td>
    `
    dogTable.append(dogRow)
  }

  const renderData = () => {
    fetch(url)
      .then(resp => resp.json())
      .then(renderDogs)
  }

  const editDog =(dog)=>{
    const form = document.querySelector('#dog-form')
    form.setAttribute('data-id',`${dog.id}`)
    form.name.value = `${dog.name}`
    form.breed.value = `${dog.breed}`
    form.sex.value = `${dog.sex}`
  }


  const submitHandler = () =>{
    document.addEventListener('submit', e=>{
      const form = document.querySelector('#dog-form')
      const dogId = form.dataset.id
      const name = form.name.value
      const breed = form.breed.value
      const sex = form.sex.value
      const newDogInfo = { name: name, breed: breed, sex: sex}

      const options = {
        method: "PATCH",
        headers:{
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(newDogInfo)
      }

      fetch(url + dogId, options)
      .then(resp => resp.json())
      .then(dog=>{
        renderDog(dog)
      })
    })
  }


  const clickHandler = () =>{
    document.addEventListener('click', e=>{
      const button = e.target
      const dogId = button.dataset.dogId
      if (dogId){
        fetch(url + dogId)
        .then(resp => resp.json())
        .then(editDog)
      }
    })
  }



  /*--------------*/
  renderData()
  clickHandler()
  submitHandler()
})
