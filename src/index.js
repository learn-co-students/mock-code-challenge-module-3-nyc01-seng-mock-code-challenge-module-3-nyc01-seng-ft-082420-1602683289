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
    const dogDiv = document.createElement('div')
//    console.log(dogDiv)
    let dogTR = document.querySelector('.dogTR')
    dogDiv.dataset.id = dog.id
    dogDiv.innerHTML = `
    <tr class="dogTR">
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
    </tr>

    `

    tableBody.appendChild(dogDiv)
}




// document.addEventListener("click", function(e));

// function e(){
//    body of function
//}