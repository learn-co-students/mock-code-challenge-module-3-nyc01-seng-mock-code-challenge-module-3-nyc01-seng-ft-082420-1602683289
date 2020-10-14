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
            console.log(e.target.dataset.id)
            const hiddenId = document.createElement("input")
            hiddenId.setAttribute("type", "hidden");
            hiddenId.setAttribute("name", "id");
            hiddenId..setAttribute("value", `${e.target.data.set.id}`);
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
        fetch
    })
}