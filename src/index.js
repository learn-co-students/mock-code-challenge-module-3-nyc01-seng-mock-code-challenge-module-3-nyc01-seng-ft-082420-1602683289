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
        <td><button>Edit</button></td>
        `
        tableRow.dataset.id = dog.id
        tableBody.appendChild(tableRow)
    }


    const clickHandler = () => {

        document.addEventListener('click' , function(e) {
           if(e.target.textContent === 'Edit') {

               const row = e.target.closest('tr')
               const cell = row.children
               
                const name  = cell[0].textContent
                const breed = cell[1].textContent
                const sex =   cell[2].textContent

                const form = document.querySelector('#dog-form')

                form.name.value = name
                form.breed.value = breed
                form.sex.value = sex

                form.dataset.id = row.dataset.id

                console.log('Edit is Clicked!')

            }
        })
    
    }


    const submitHandler = () => {
        document.addEventListener('submit', function (e){
            e.preventDefault()

            const form = e.target

            const name = form.name.value
            const breed = form.breed.value
            const sex = form.sex.value

            const id = form.dataset.id

            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name: name, breed: breed, sex: sex})
            }

            fetch(baseURL + id, options)
            .then(response => response.json())
            .then(dog => {reload()})
        })
    }    


    const reload = () => {
        location.reload();
    }


    submitHandler()
    clickHandler()
    getDogs()
})