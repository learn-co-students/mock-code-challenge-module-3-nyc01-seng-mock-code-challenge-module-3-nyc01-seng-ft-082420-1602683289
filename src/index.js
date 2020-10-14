document.addEventListener('DOMContentLoaded', () => {

    BASEURL = "http://localhost:3000/dogs/"

    const getDogs = () => {
        fetch(BASEURL)
        .then(response => response.json())
        .then(dogsData => renderDogs(dogsData))
    }

    const renderDogs = (dogsData) => {
        const tableDog = document.querySelector("table")
        tableDog.dataset.id = "dogTable"

        for(const dogObj of dogsData) {
            renderDog(dogObj, tableDog)
        }
    }

    const renderDog = (dogObj, tableDog) => {
        newThead = document.createElement("thead")
        newThead.innerHTML = `
            <tr class='padding'>
                <td class="name">${dogObj.name}</td>
                <td class="breed">${dogObj.breed}</td>
                <td class="sex">${dogObj.sex}</td>
                <td><button data-dog-id=${dogObj.id} class="edit" >Edit</button></td>
            </tr>
        `
        tableDog.appendChild(newThead)
    }
    
    const clickHandler = () => {
        document.addEventListener("click", e => {
            if(e.target.matches(".edit")) {
                const button = e.target
                const buttonId = button.dataset.dogId
                const dogRow = button.parentElement
                const dogObj = dogRow.parentElement
                const dogName = dogObj.querySelector(".name")
                const dogBreed = dogObj.querySelector(".breed")
                const dogSex = dogObj.querySelector(".sex")

                let name = dogName.innerText
                let breed = dogBreed.innerText
                let sex = dogSex.innerText
                const form = document.querySelector("#dog-form")
                form.dataset.id = buttonId
                
                form.innerHTML = `
                <input type="text" name="name" placeholder="dog's name" value= ${name} />
                <input type="text" name="breed" placeholder="dog's breed" value= ${breed} />
                <input type="text" name="sex" placeholder="dog's sex" value= ${sex} />
                <input type="submit" value="Submit" />
                `
            }
        })
    }

    const submitHandler = () => {
        document.addEventListener("submit", e => {
            e.preventDefault()
            const form = e.target

            const name = form.name.value
            const breed = form.breed.value
            const sex = form.sex.value
            const dogId = form.dataset.id


            const editedDogObj = {
                "id": dogId,
                "name": name,
                "breed": breed,
                "sex": sex
                }

            options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(editedDogObj)
        }

            fetch(BASEURL + dogId, options)
            .then(response => response.json())
            .then(data => renderDog(data))


        })

        
    }


    getDogs();
    clickHandler();
    submitHandler();

})