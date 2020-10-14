document.addEventListener('DOMContentLoaded', () => {
const url = "http://localhost:3000/dogs"

const renderDogs = (dogs) =>{
    for(const dog of dogs){
        console.log(dog.name)
        renderDog(dog)
    }
}

const renderDog = (dog) =>{
    const thread = document.querySelector(".blue")
    console.log(thread)
    const table = `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td></tr>`
    thread.insertAdjacentHTML('beforeend', table)
}

const getDogs = () =>{
    fetch(url)
    .then(res => res.json())
    .then(dogs => renderDogs(dogs))
}

getDogs()
})