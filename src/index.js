document.addEventListener('DOMContentLoaded', () => {
const url = "http://localhost:3000/dogs"

const renderDogs = (dogs) =>{
    for(const dog of dogs){
        
        renderDog(dog)
    }
}

function clickHandler(){
    document.addEventListener('click', e =>{
        if(e.target.innerHTML == 'Edit'){
            const button = e.target
            const parentli = button.parentElement
            const grandPopsLI = parentli.parentElement
            const dogId = grandPopsLI.dataset.id

            const options = {
                method: "PATCH",
                headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
                },
                body: JSON.stringify({  })
              }

        }
    })
}
clickHandler()
const submitHandler =() =>{
    document.addEventListener("submit", e =>{
        e.preventDefault()
        const form = e.target

        const name = form.name.value
        const breed = form.breed.value
        const sex = form.sex.value

        const fullDog = {name: name, breed: breed, sex: sex}

        const options ={
            method: "POST",
            headers: {"content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(fullDog)
        }
        fetch(url, options)
        .then(res => res.json())
        .then(newDog =>{
            renderDog(newDog)
        })

    })
}

const renderDog = (dog) =>{
    const thread = document.getElementById("table-body")
    
    const table = `<tr data-id = ${dog.id} ><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td></tr>`
    thread.insertAdjacentHTML('beforeend', table)
}

const getDogs = () =>{
    fetch(url)
    .then(res => res.json())
    .then(dogs => renderDogs(dogs))
}
submitHandler()
getDogs()
})