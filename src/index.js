document.addEventListener('DOMContentLoaded', () => {
DOGS_URL = 'http://localhost:3000/dogs/'


getDogs()
clickHub()




function getDogs() {
    fetch(DOGS_URL).then(function(response) {
        return response.json()
    }).then(function(data) {
        renderDogs(data)
    }
    )}




function renderDogs(obj) {
    for (const element of obj) {
        renderDog(element)
    }
}

function renderDog(obj){

    const dogTable = document.getElementById('table-body')
    const dogData = document.createElement('tr')
    dogData.classList.add(`${obj.id}`)
    dogTable.append(dogData)
    dogData.innerHTML = `<td>${obj.name}</td> <td>${obj.breed}</td> <td>${obj.sex}</td> <td><button class="edit" data-dog=${obj.id}>Edit</button></td>`


}

function clickHub() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('.edit')) {
            const editButton = e.target
            const dogId = editButton.dataset.dog
            //console.dir(editButton)
            fetchDogData(dogId)
            
            
            
        }

        
    })
}


function submitHub() {
    document.addEventListener('submit', function(e) {
        e.preventDefault()
        const id = 1
        dogForm(id)
    })
}




function fetchDogData(id) {
    // fetch(DOGS_URL + id).then(function(response){
    //     return response.json()
    // }).then(function(data) {
    //     const form = document.getElementById('dog-form')
    //     console.log(data.length)
    //     // for (let i = 1; i < 4; i++) {
            
    //     // // const dogName = form[`[name="${key[name]}"`].value
    //     // // const dogBreed = form[`[name="${key[breed]}"`].value
    //     // // const dogSex = form[`[name="${key[sex]}"`].value
    //     // }
    // })


    const dogRow = document.getElementById('table-body')
    // dogRow.rows[id]
    
    const dogName = dogRow.rows[parseInt(id)].cells[0]
    const dogBreed = dogRow.rows[parseInt(id)].cells[1]
    const dogSex = dogRow.rows[parseInt(id)].cells[2]
    
    const form = document.getElementById('dog-form')
     form["name"].value = dogRow.rows[parseInt(id)].cells[0].textContent
     form["breed"].value = dogRow.rows[parseInt(id)].cells[1].textContent
    form["sex"].value = dogRow.rows[parseInt(id)].cells[2].textContent

}


function dogForm(id) {
    

    const form = document.getElementById('dog-form')
    const name = form["name"].value
    const breed = form["breed"].value
    const sex = form["sex"].value

    options = {name: name, breed: breed, sex: sex}

    config = {method: "PATCH",
    headers: {
        "content-type" : "application/json",
        "accept" : "application/json"

    }, body: JSON.stringify(options)
}

fetch(DOGS_URL + id, config).then(function(response) {
    return response.json()
}).then(function(data) {
    renderDogs(data)

})



}
    
    
    








})