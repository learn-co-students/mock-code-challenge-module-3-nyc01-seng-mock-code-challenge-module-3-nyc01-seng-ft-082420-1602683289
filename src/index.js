document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/dogs'



    renderDogs = (dogs) => {
        const table = document.querySelector("#table-body")

        for (const dog of dogs) {
            const newDogEl = document.createElement("tr")
            newDogEl.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit">Edit</button></td>
            `
            table.append(newDogEl)
        }
    }
    
    document.addEventListener('click', function(e){
        const target = e.target
        const dog = target.parentElement
        const form = document.querySelector("#dog-form")
        if (target.matches(".edit")){
            
            console.log(dog)

        }
        

    })



    fetch(URL)
    .then(res =>res.json())
    .then(dogs => {renderDogs(dogs)})


})