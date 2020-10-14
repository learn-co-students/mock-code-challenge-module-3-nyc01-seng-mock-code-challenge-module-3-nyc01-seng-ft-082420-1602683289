document.addEventListener('DOMContentLoaded', () => {
    const DOGS_URL = "http://localhost:3000/dogs/"
    const getDogs = () => {
        fetch(DOGS_URL)
            .then(response => response.json())
            .then(dogs => renderDogs(dogs)) 
    }

    const renderDogs = (dogs) => {
        dogs.forEach(dogObj => {
            renderDog(dogObj)
        }) 
    }

    const renderDog = (dogObj) => {
        buildDog(dogObj)
    }

    const buildDog = (dogObj) => {
        const head = document.querySelector('.blue')
        const newRow = document.createElement("tr")
        newRow.dataset.dogId = dogObj.id

        newRow.innerHTML = `
            <td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td> <td><button class="btn-edit">Edit Dog</button></td></tr>
        `
        head.append(newRow)

    }

    function clickHandler(){
        document.addEventListener("click", e => {
            if (e.target.matches(".btn-edit")) {
                const button = e.target
                const name = button.parentElement.parentElement.querySelectorAll("td")[0].innerText
                const breed = button.parentElement.parentElement.querySelectorAll("td")[1].innerText
                const sex = button.parentElement.parentElement.querySelectorAll("td")[2].innerText
                const form = document.querySelector('#dog-form')
                form.dataset.dogId = button.parentElement.parentElement.dataset.dogId
                
                form.name.value = name
                form.breed.value = breed
                form.sex.value = sex
                 
            }
        })
    }

    
    function submitHandler() {
        document.addEventListener("submit", e => {
            e.preventDefault()
            const form = document.querySelector('#dog-form')
            const name = form.name.value
            const breed = form.breed.value
            const sex = form.sex.value
            const dogId = form.dataset.dogId
            const table = document.querySelector('#table')
            const dogObj = { name: name, breed: breed, sex: sex }
            const options = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({ name: name, breed: breed, sex: sex })
            }

            fetch(DOGS_URL + dogId, options)
                .then(response => response.json())
                .then()
                
                    
            fetch(DOGS_URL)
                .then(response => response.json())
                .then(dogs => renderDogs(dogs))    
              

            

            form.reset()
        })
    }
    submitHandler();
    clickHandler();
    getDogs();
})