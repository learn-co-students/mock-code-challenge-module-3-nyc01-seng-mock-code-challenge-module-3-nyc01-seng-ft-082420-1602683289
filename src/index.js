document.addEventListener('DOMContentLoaded', () => {


    fetchDogs();
})

const dogsUrl = "http://localhost:3000/dogs/"

const fetchDogs = () => {
    fetch(dogsUrl)
    .then(resp => resp.json())
    .then(dogs => addDogs(dogs))
}

const addDogs = (dogs) => {
    for(const dog of dogs){
        addDogToDom(dog)
    }
}

const addDogToDom = (dog) => {
    let table = document.querySelector('tr')
    
}

