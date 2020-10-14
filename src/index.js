document.addEventListener('DOMContentLoaded', () => {
  const dogUrl = 'http://localhost:3000/dogs'

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
    console.log(tr.childElements)
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      let button = e.target
      if(button.parentNode.parentNode.matches(`[data-id]`)){
        dogFormInsertData()
      }
    })
  }

  clickHandler();
  fetchDogs();
})
