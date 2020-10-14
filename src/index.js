document.addEventListener('DOMContentLoaded', () => {
  const dogUrl = 'http://localhost:3000/dogs/'
  const fetchDogs = () => {
    fetch(dogUrl)
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs))
  }
  const tableBody = document.querySelector('tbody')

  const renderDogs = (data) =>{
    for(const dog of data){
      renderDog(dog)
    }
  }

  const renderDog = (dog) => {
    const tr = document.createElement('tr')
    tr.dataset.id = dog.id
    tr.innerHTML =
    `<td>${dog.name}</td>
     <td>${dog.breed}</td>
     <td>${dog.sex}</td>
     <td><button>Edit Dog</button></td>`
     tableBody.append(tr)
  }

  const dogFormInsertData = (tr) => {
    const trChildren = tr.children
    const form = document.querySelector('#dog-form')
    const name = form.querySelector(`[name='name']`)
    const breed = form.querySelector(`[name='breed']`)
    const sex = form.querySelector(`[name='sex']`)
    const id = document.querySelector(`[name='id']`)

    name.value = trChildren[0].innerHTML
    breed.value = trChildren[1].innerHTML
    sex.value = trChildren[2].innerHTML
    id.value = tr.dataset.id

  }

  const updateDog = (form) => {
    const name = form.children[0].value
    const breed = form.children[1].value
    const sex = form.children[2].value
    const id = form.children[3].value
    const object = {name: name, breed: breed, sex: sex}
    console.log()
    const options = {
      method: 'PATCH',
      headers:{
        'content-type' : 'application/json',
        'accepts' : 'application/json'
      },
      body: JSON.stringify(object)
    }
    fetch(dogUrl + id, options)
    .then(resp => resp.json())
    .then(data => fetchDogs())
  }

  const submitHandler = () => {
    document.addEventListener('submit', e => {
      const form = e.target
      if(form.matches('#dog-form')){
        updateDog(form)
        // e.preventDefault();
      }
    })
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      let button = e.target
      if(button.parentNode.parentNode.matches(`[data-id]`)){
        dogFormInsertData(e.target.parentNode.parentNode)
      }
    })
  }

  submitHandler();
  clickHandler();
  fetchDogs();
})
