document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = "http://localhost:3000/dogs/"
    
    //get existing dogs on show page 
    const getDogs = () => {
        fetch(BASE_URL)
        .then(resp => resp.json())
        .then(renderDogs)

        
    }
    //getDogs()

    const renderDogs = dogs => {
        dogs.forEach(dogObj => {
            renderDogs(dogObj)
        })
        
    }

    const renderDog = (dogObj) => {
        const dogTr = document.createElement('tr')
        
        dogTr.classList.add("dog")
        dogTr.dataset.dogId = dogObj.dogId

        dogTr.innerHTML = `
        <tr><td> ${dogObj.name}</td> 
        <td>${dogObj.breed}</td> 
        <td>${dogObj.sex}</td> 
        `

        const dogList = document.querySelector('.table-body')
        
        dogList.append(dogTr)
        
        
        
        

    

    }

        

      //`<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`




    

})