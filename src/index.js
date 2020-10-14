document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/dogs"

    const getDogs = () => {
        fetch(baseUrl)
        .then (response => response.json())
        .then (dogs => console.log(dogs))
    }

    getDogs()
})



//render list of dogs on table 
//<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
// table body: id="table-body"


//clicking on edit button should add dog to top form 

//submiting form sends patch request to updsate dog

//after submit, table should have all updated info 