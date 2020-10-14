document.addEventListener('DOMContentLoaded', () => {
const baseUrl = 'http://localhost:3000/dogs/'

const getDogs = () => {
    return fetch(baseUrl)
    .then(response => response.json())
}

const showOneDog = (dog) => {
    const oneDog = document.querySelector('#table-body')
    const displayRow = document.createElement('tr')
    const displayName = document.createElement('td')
    displayName.innerHTML = dog.name
    const displayBreed = document.createElement('td')
    displayBreed.innerHTML = dog.breed
    const displaySex = document.createElement('td')
    displaySex.innerHTML = dog.sex

    const displayButton = document.createElement('td')
    displayButton.innerHTML = `
    <button dataset-id= ${dog.id} type="button">Edit</button>
    `
    displayButton.addEventListener('click', e => {
        const 
    })


    displayRow.append(displayName)
    displayRow.append(displayBreed)
    displayRow.append(displaySex)
    displayRow.append(displayButton)
    oneDog.append(displayRow)
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