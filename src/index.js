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
        let table = document.querySelector('#table-body')
        let tr = document.createElement('tr')
        tr.innerHTML=`
        <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-set-id="${dog.id}" class="edit">Edit</button></td>
        `
        table.appendChild(tr)
    }
}



const clickHandler = () =>{
    document.addEventListener('click', e => {
        if(e.target.matches('.edit')){
            let editButton = e.target
            let dogId = editButton.dataId
            let form = document.querySelector('.dog-form')
            console.log(dogId)




        }
    })
}
