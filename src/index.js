document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000/dogs'
    
    const getDogs = () => {
        fetch(baseUrl)
            .then(resp => resp.json())
            .then(dogs => console.log(dogs))
    }

    const renderDogs = dogs => {
        for (const toy of toys){}

    }

    const renderDog = (dog) => {
        
        const tableRow = document.querySelector('#tableBody')
        tableRow.classList.add('row')
        tableRow.innerHTML = `<tr><td>${dogs.name}</td> <td>${dogs.breed}</td> <td>${dogs.sex}</td> <td><button>Edit</button></td></tr>`
        tableRow.append(dogs)
    }

    const submitHandler = () => {
        const submitDog = document.querySelector('submit')
        const dogName = document.querySelector('name="name"').value
        const dogBreed = document.querySelector('name="breed"').value
        const dogSex = document.querySelector('name="sex"').value
        fetch(baseUrl,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({dogName, dogBreed, dogSex})
    })
    .then(function(res => res.json())
    .then(dog =>{
        const tableRow = document.querySelector('#tableBody')
        tableRow.classList.add('row')
        tableRow.innerHTML = `<tr><td>${dogName}</td> <td>${dogsBreed}</td> <td>${dogSex}</td> <td><button>Edit</button></td></tr>`
        tableRow.append(dogs)
    })
    }

getDogs()
renderDogs()
})

// - load and render dogs from http://localhost:3000/dogs.
// - The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`
// - Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
// - On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// - Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.