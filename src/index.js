document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/dogs"
    const dogListBody = document.querySelector('#table-body')
    let dogId = 0

    const renderDogList = (dogs) => {
        for (const dog of dogs) {
            renderDogRow(dog)
        }
    }

    const renderDogRow = (dog) => {
        let newDogRow = dogListBody.insertRow(-1)
        newDogRow.setAttribute("id", `row-${dog.id}`)
        newDogRow.innerHTML = `<tr><td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button class="edit-button" data-id="${dog.id}">Edit</button></td></tr>`

    }

    const getDogs = () => {
        fetch(baseUrl)
        .then (response => response.json())
        .then (dogs => renderDogList(dogs))
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('.edit-button')) {
                dogId = e.target.dataset.id
                //console.log(dogId)
                let dogRow = e.target.parentElement.parentElement
                const dogForm = document.querySelector('#dog-form')
                let dogName = dogRow.cells[0].innerHTML
                let dogBreed = dogRow.cells[1].innerHTML
                let dogSex = dogRow.cells[2].innerHTML
                dogForm.querySelector("#name").value = dogName
                dogForm.querySelector("#breed").value = dogBreed
                dogForm.querySelector("#sex").value = dogSex
            } 
        })
    }

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            const form = e.target
            const name = form.name.value
            const breed = form.breed.value
            const sex = form.breed.value
            const id = DogId
            const newDog = { id: id, name: name, breed: breed, sex: sex }

            const options = {
                method: "PATCH",
                headers: {
                    "content-type": "appplication/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(newDog)
            }



            form.reset()
        })
    }

    getDogs()
    clickHandler()
})



//render list of dogs on table 
//<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
// table body: id="table-body"
//let specific_tbody = document.getElementById(tbody_id);
//let row = specific_tbody.insertRow(index)


//clicking on edit button should add dog to top form 

//submiting form sends patch request to updsate dog

//after submit, table should have all updated info 