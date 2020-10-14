
const baseUrl = `http://localhost:3000/dogs/`;

document.addEventListener('DOMContentLoaded', () => {
  
  const getDogs = () => {
    return fetch(baseUrl)
    .then(response => response.json())
    .then(data => renderDogsTable(data))
  }

  const renderDogsTable = (data) => {
    // re-render only works with this next line
    document.querySelector('tbody').innerHTML = '';
    for(const dog of data){
      renderDog(dog)
    }
  }

  const renderDog = (dog) => {
    let dogRow = document.createElement('tr');
    dogRow.innerHTML = `
    <td>Dog ${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}" data-name="${dog.name}" data-breed="${dog.breed}" data-sex="${dog.sex}">Edit</button></td>
    `
    document.querySelector('tbody').append(dogRow);
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if(e.target.matches('[data-id]')){
        let id = e.target.dataset.id
        let name = e.target.dataset.name
        let breed = e.target.dataset.breed
        let sex = e.target.dataset.sex
        
        const dogForm = document.querySelector('#dog-form');
        dogForm.dataset.dogId = id;
        let formName = dogForm.querySelector('input[name="name"]');
        let formBreed = dogForm.querySelector('input[name="breed"]');
        let formSex = dogForm.querySelector('input[name="sex"]');
        formName.value = name;
        formBreed.value = breed;
        formSex.value = sex;

        /// extra style thing:
        let tBody = document.querySelector('tbody')
        let allRows = tBody.children
        for(const row of allRows){
          row.style.background = "none"
        }
        let row = e.target.parentElement.parentElement
        row.style.background = "#ffc2c2"
      }
    })
  }

  const submitHandler = () => {
    document.addEventListener('submit', e => {
      e.preventDefault();
      const dogForm = document.querySelector('#dog-form');
      let id = dogForm.dataset.dogId
      let options = {
        method: "PATCH",
        headers: {
          "content-type":"application/json",
          "accept":"application/json",
        },
        body: JSON.stringify({
          name: dogForm.name.value,
          breed: dogForm.breed.value,
          sex: dogForm.sex.value,
        })
      }
      fetch(baseUrl + id, options)
      .then(response => response.json())
      .then(getDogs)

      dogForm.reset();
    })
  }

  submitHandler();
  clickHandler();
  getDogs();
})