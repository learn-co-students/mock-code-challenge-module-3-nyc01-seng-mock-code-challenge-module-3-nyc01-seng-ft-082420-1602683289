const BASE = "http://localhost:3000"
const DOGS = `${BASE}/dogs/`


document.addEventListener('DOMContentLoaded', () => {
    
    const getDogs = () => {
        fetch(DOGS)
        .then(resp => resp.json())
        .then(dogs => addDogs(dogs))
    }
    const addDogs = () => {
        for(const dog of dogs){
            addDogToDom(dog)
        }
    }
    const addDogToDom = (dog) => {
        let tbody = document.querySelector('tbody')
        

    }
    

})