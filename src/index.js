document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/dogs"
    const dogListBody = document.querySelector('#table-body')

    const renderDogList = (dogs) => {
        for (const dog of dogs) {
            renderDogRow(dog)


        }

    }

    const renderDogRow = (dog) => {
        let newDogRow = dogListBody.insertRow(-1)
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

    getDogs()
})



//render list of dogs on table 
//<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
// table body: id="table-body"
//let specific_tbody = document.getElementById(tbody_id);
//let row = specific_tbody.insertRow(index)


//clicking on edit button should add dog to top form 

//submiting form sends patch request to updsate dog

//after submit, table should have all updated info 