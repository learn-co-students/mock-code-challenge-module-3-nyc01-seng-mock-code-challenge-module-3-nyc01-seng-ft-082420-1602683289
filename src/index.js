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

  // const editDog =(dog)=>{
  //   document.addEventListener('submit', e=>{
  //     e.preventDefault()
  //     const form  = e.target
  //     console.log(form)
  //   })
  //
  // }


  const submitHandler = () =>{
    document.addEventListener('submit', e=>{
      e.preventDefault()
      const form = e.target
      console.log(form)
    })
  }


  const clickHandler = () =>{
    document.addEventListener('click', e=>{
      const button = e.target
      const dogId = button.dataset.dogId
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //     "accept":  "application/json"
      //   },
      //   body: JSON.stringify()
      // }
      fetch(url + dogId)
      .then(resp => resp.json())
      .then(editDog)
    })
  }



  /*--------------*/
  renderData()
  clickHandler()
})
