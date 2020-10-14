document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    editDog()
    submitHander()
})


function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => {

        //disable submit button if no dog has been selected to be edited
        document.querySelector('input[type="submit"]').disabled = true
        renderDogs(dogs)
    })
}

function renderDogs(dogs) {
    for (dog of dogs) {
        renderDog(dog)
    }
}

function renderDog(dog) {
    const dogRow = document.createElement("tr")
    dogRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button class="edit" data-id=${dog.id}>Edit Dog</button></td></tr>
    `
    const dogTable = document.querySelector("#table-body")
    dogTable.append(dogRow)
}

function editDog() {
    const form = document.querySelector("#dog-form")
    document.addEventListener("click", e=> {
        if (e.target.matches(".edit")) {

            //id attribute on form resets upon each new click of 'edit' button
            if (form.querySelector("#id-field")) {
                form.querySelector("#id-field").remove()
            }

            //submit button is enabled once a dog is selected for editing
            form.querySelector('input[type="submit"]').disabled = false
            
            //populate form field with dog data from table
            form.name.value = e.target.parentElement.parentElement.children[0].textContent
            form.breed.value = e.target.parentElement.parentElement.children[1].textContent
            form.sex.value = e.target.parentElement.parentElement.children[2].textContent

            //add hidden 'id' to form based on which edit button was pressed
            const hiddenId = document.createElement("input")
            hiddenId.setAttribute("name", "id");
            hiddenId.setAttribute("value", `${e.target.dataset.id}`);
            hiddenId.setAttribute("type", "hidden");
            hiddenId.setAttribute("id", "id-field")
            form.append(hiddenId)
        }
    })
}

function submitHander() {
    const form = document.querySelector("#dog-form")
    form.addEventListener("submit", e => {
        e.preventDefault()
        const body = {
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value
        }
        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch(`http://localhost:3000/dogs/${form.id.value}`, options)
        .then(res => res.json())
        .then(dog => {
            const allDogs = document.querySelectorAll(".edit")

            //render dog info based on which dog has been edited (by id)
            for (doge of allDogs) {
                if (parseInt(doge.dataset.id) === parseInt(dog.id)) {
                    doge.parentElement.parentElement.innerHTML = `
                    <td>${dog.name}</td>
                    <td>${dog.breed}</td>
                    <td>${dog.sex}</td>
                    <td><button class="edit" data-id=${dog.id}>Edit Dog</button></td></tr>`
                    
                }
            }
        })
        form.reset()   
        
        //disable form submit again after submit as there is no longer a dog selected
        document.querySelector('input[type="submit"]').disabled = true
    })
}