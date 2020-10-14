document.addEventListener('DOMContentLoaded', () => {


//fetchDogs

})

//const fetchDogs = () => {
fetch('http://localhost:3000/dogs')
.then(resp => resp.json())
.then(dogs => renderDogs(dogs));
//}

const renderDogs = (dogs) => {
for(const dog of dogs){
    addDogToDom(dog)
}
}

const addDogToDom = (dog) => {
    const tableBody = document.getElementById('table-body')
//    const dogDiv = document.createElement('div')
    const dogTR = document.createElement('tr')
//    console.log(dogDiv)
//    let dogTbl = document.querySelector('.dogTR')
    dogTR.dataset.id = dog.id
    dogTR.innerHTML = `
    
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
   
    `
    tableBody.appendChild(dogTR)
}




// document.addEventListener("click", function(e));

// function e(){
//    body of function
//}