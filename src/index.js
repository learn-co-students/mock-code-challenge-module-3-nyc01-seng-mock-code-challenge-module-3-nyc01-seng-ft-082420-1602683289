document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    editDog()
    submitHander()
})


function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => renderDogs(dogs))
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
    <td><button class="edit" data-id=${dog.id}>Edit</button></td></tr>
    `
    const dogTable = document.querySelector("#table-body")
    dogTable.append(dogRow)
}

function editDog() {
    const form = document.querySelector("#dog-form")
    document.addEventListener("click", e=> {
        if (e.target.matches(".edit")) {
            //form.name.value = e.target.nextSibling.textContent

            //adding hidden 'id' attribute to form based on which edit button was pressed
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
        console.log(form.id.value)
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
            console.log(dog.name, dog.breed, dog.sex, dog.id)
            const allDogs = document.querySelectorAll(".edit")
            for (doge of allDogs) {
                console.log(doge.dataset.id)
                if (parseInt(doge.dataset.id) === parseInt(dog.id)) {
                    console.log("match")
                    doge.parentElement.parentElement.innerHTML = `
                    <td>${dog.name}</td>
                    <td>${dog.breed}</td>
                    <td>${dog.sex}</td>
                    <td><button class="edit" data-id=${dog.id}>Edit</button></td></tr>`
                    
                }
            }
        })
        form.querySelector("#id-field").remove()

    })
}