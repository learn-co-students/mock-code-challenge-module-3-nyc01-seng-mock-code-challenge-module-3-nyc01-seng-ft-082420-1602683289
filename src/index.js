document.addEventListener('DOMContentLoaded', () => {

    const baseURL = 'http://localhost:3000/dogs/'
    const dogName = document.getElementsByName('name').value
    const dogBreed = document.getElementsByName('breed').value
    const dogSex = document.getElementsByName('sex').value



    const getDogs = () => {
        fetch(baseURL)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    }

    const renderDogs = (dogs) => {
        for (const dog of dogs) {
            renderDog(dog)
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
        <td><button dataset.id = '${dog.id}'>Edit</button></td>
        `

        tableBody.appendChild(tableRow)
    }


    const eventHandler = () => {
        document.addEventListener('click' , function(e) {

        })
    }




    eventHandler()
    getDogs()
})