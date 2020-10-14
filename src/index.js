// first things first is DOM content loaded which is already provided
document.addEventListener('DOMContentLoaded', () => {
const baseUrl = 'http://localhost:3000/dogs/'
// always add the backslash at the end for easier use later
const getDogs = () => {
    return fetch(baseUrl)
    .then(response => response.json())
}
// making request to get all the dog infomation 

const showOneDog = (dog) => {
    const oneDog = document.querySelector('#table-body')
    const displayRow = document.createElement('tr')
    const displayName = document.createElement('td')
    displayName.innerHTML = dog.name
    const displayBreed = document.createElement('td')
    displayBreed.innerHTML = dog.breed
    const displaySex = document.createElement('td')
    displaySex.innerHTML = dog.sex

    // getting info from inspect and using the HTML provided to create Element
    // referred to ReadMe to get td and tr

    const displayButton = document.createElement('td')
    displayButton.innerHTML = `
    <button dataset-id= ${dog.id} type="button">Edit</button>
    `
    displayButton.addEventListener('click', e => {
        handleEdit(e, dog) 
    })
    // getting button to actually respond to a click and change it to say edit
    // this needs to take in two arguments the event and dog  

    displayRow.append(displayName, displayBreed, displaySex,displayButton)
    // displayRow.append(displayBreed)
    // displayRow.append(displaySex)
    // displayRow.append(displayButton)

    oneDog.append(displayRow)
}
// need to append to actually display all this info 
const handleEdit = (e, dog) => {
    const dogForm = document.querySelector('#dog-form')
    populateForm(dog, dogForm)
    dogForm.addEventListener('click', e => {
        const newDog = {
            name:dogForm.name.value,
            breed:dogForm.breed.value,
            sex:dogForm.sex.value         
        }

        const options = {
            method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDog),
        }
        fetch(baseUrl + dog.id, options )
        .then(response => response.json())
    })
    // looked up syntax to make sure it was correct 
}

const populateForm = (dog, dogForm) => {
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex
}

const showDogs = () => {
    getDogs()
    .then(response => {
        
        for(const dog of response){
        showOneDog(dog)
        }
    })
}
showDogs()
})