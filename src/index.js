document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/dogs/'
    const form = document.querySelector("#dog-form")


    renderDogs = (dogs) => {

        const table = document.querySelector("#table-body")
        table.innerHTML = ''
        for (const dog of dogs) {
            const newDogEl = document.createElement("tr")
            newDogEl.innerHTML = `<td class = "name">${dog.name}</td> <td class = "breed">${dog.breed}</td> <td class = "sex">${dog.sex}</td> <td><button class="edit">Edit</button></td>
            `
            newDogEl.dataset.dogId = dog.id
            table.append(newDogEl)
        }
    }

    document.addEventListener('click', function (e) {
        const target = e.target
        const dog = target.parentElement.parentElement
        if (target.matches(".edit")) {
            form.dataset.dogId = dog.dataset.dogId
            form.name.value = dog.querySelector(".name").innerText
            form.breed.value = dog.querySelector(".breed").innerText
            form.sex.value = dog.querySelector(".sex").innerText

        }


    })

    form.addEventListener('submit', function (e) {

        e.preventDefault()
        newDog = {
            name: `${form.name.value}`,
            breed: `${form.breed.value}`,
            sex: `${form.sex.value}`
        }
        options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newDog)
        }
        fetch(URL + `${form.dataset.dogId}`, options)
            .then(res => res.json())
            .then(dogs => {
                console.log(dogs)
                getDogs()
            })

        e.target.reset()

    })



    getDogs = () => {
        fetch(URL)
            .then(res => res.json())
            .then(dogs => {
                renderDogs(dogs)
            })
    }

    getDogs()
})