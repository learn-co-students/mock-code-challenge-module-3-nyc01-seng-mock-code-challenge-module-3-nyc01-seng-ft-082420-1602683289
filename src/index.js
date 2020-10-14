document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/dogs/"
    const dogListBody = document.querySelector('#table-body')
    

    const renderDogList = (dogs) => {
        dogListBody.innerHTML = ''
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
        <td><button class="edit-button" data-dog-id="${dog.id}">Edit</button></td></tr>`

    }

    const getDogs = () => {
        fetch(baseUrl)
        .then (response => response.json())
        .then (dogs => renderDogList(dogs))
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('.edit-button')) {
                const editButton = e.target
                let dogRow =  editButton.closest('tr') //e.target.parentElement.parentElement 
                const form = document.querySelector('#dog-form')
                let dogName = dogRow.cells[0].textContent
                let dogBreed = dogRow.cells[1].textContent
                let dogSex = dogRow.cells[2].textContent
                form.name.value = dogName
                form.breed.value = dogBreed
                form.sex.value = dogSex
                dogId = editButton.dataset.dogId
                form.setAttribute('data-dog-id', `${dogId}`)
            } 
        })
    }

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            const form = e.target
            const name = form.name.value
            const breed = form.breed.value
            const sex = form.sex.value
            const id = form.dataset.dogId
            const editDog = { name: name, breed: breed, sex: sex }


            console.log(id)

            const options = {
                method: "PATCH",
                headers: {
                    "content-type": "appplication/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(editDog)
            }

            fetch(baseUrl + id, options)
            .then (response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .then (_dog => getDogs())
            


            
            form.reset()
        })
    }

    getDogs()
    clickHandler()
    submitHandler()
})



//render list of dogs on table 
//<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
// table body: id="table-body"
//let specific_tbody = document.getElementById(tbody_id);
//let row = specific_tbody.insertRow(index)


//clicking on edit button should add dog to top form 

//submiting form sends patch request to updsate dog

//after submit, table should have all updated info 