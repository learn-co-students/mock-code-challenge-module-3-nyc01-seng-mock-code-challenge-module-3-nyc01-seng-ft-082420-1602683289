document.addEventListener('DOMContentLoaded', () => {

    clickHandler();
    fetchDogs();
})

const dogsUrl = "http://localhost:3000/dogs/"

const fetchDogs = () => {
    fetch(dogsUrl)
    .then(resp => resp.json())
    .then(dogs => addDogs(dogs))
}

const addDogs = (dogs) => {
    for(const dog of dogs){
        addDogToDom(dog)
    }
}

const addDogToDom = (dog) => {
    let table = document.querySelector('#table-body')


    table.innerHTML= `
    <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit">Edit</button></td></tr>
    `
}

const clickHandler = () =>{
    document.addEventListener('click', e => {
        if(e.target.matches('.edit')){
            let form = e.target
            

        }
    })
}
