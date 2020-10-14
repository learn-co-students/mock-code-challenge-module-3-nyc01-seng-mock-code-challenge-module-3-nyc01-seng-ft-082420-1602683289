document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = "http://localhost:3000/dogs/"
    
    //get existing dogs on show page 
    const getDogs = () => {
        return fetch(BASE_URL)
        .then(resp => resp.json())
        .then(renderDogs)
    }

    const renderDogs = dogs => {
        dogs.forEach(dogObj => {
            renderDog(dogObj)
        })

    }

    const renderDog = (dogObj) => {
        
    }


    

})