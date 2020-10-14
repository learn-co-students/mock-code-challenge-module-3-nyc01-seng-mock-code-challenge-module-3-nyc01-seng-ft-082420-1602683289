document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = "http://localhost:3000/dogs/"
    
    //get existing dogs on show page 
    const getDogs = () => {
        fetch(BASE_URL)
        .then(resp => resp.json())
        .then(renderDogs)

        
    }
    getDogs()

    const renderDogs = dogs => {
        dogs.forEach(dogObj => {
            renderDog(dogObj)
        })

    }

    const renderDog = (dogObj) => {
        const dogInfo = document.createElement("div")
        


        //`<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`

    }


    

})