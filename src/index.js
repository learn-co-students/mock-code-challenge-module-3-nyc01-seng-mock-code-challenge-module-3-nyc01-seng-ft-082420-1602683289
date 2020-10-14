document.addEventListener('DOMContentLoaded', () => {


fetchDogs

})

const fetchDogs = () => {
fetch('http://localhost:3000/dogs')
.then(resp => resp.json())
.then(dogs => renderDogs(dogs));

}

const renderDogs = (dogs) => {
for(const dog of dogs){
    addDogToDom(dog)
}
}

const addDogToDom = (dog) => {
    const tableBody = document.getElementById('table-body')
    const dogDiv = document.createElement('div')
    dogDiv.dataset.id('dog.id')


    tableBody.appendChild(dogDiv)

}




// document.addEventListener("click", function(e));

// function e(){
//    body of function
//}