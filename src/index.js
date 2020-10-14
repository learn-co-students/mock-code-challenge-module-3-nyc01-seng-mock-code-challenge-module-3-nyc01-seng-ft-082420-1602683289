document.addEventListener('DOMContentLoaded', () => {

    const baseURL = 'http://localhost:3000/dogs/'



    const getDogs = () => {
        fetch(baseURL)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    }

    const renderDogs = (dogs) => {
        for (const dog of dogs) {
            renderDog(dog)
            eventHandler(dog)
        }
    }

    const renderDog = (dog) => {
        const tableBody = document.querySelector('#table-body') 
        const tableRow  = document.createElement('tr')
        

        // console.log(tableBody)
        // console.log(margin)

        tableRow.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button class='${dog.id}'>Edit</button></td>
        `

        tableBody.appendChild(tableRow)
    }


    const eventHandler = (dog) => {

        const dogId = `${dog.id}`

        document.addEventListener('click' , function(e) {
            console.log(e.target.textContent === 'Edit')
            // if(e.target.class.matches(dogId)){
            //     console.log('SUCCESS')
            // }
        })
    }



   
    getDogs()
})