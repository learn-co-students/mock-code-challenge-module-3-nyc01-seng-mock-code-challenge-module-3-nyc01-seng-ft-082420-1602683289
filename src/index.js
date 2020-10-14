




document.addEventListener('DOMContentLoaded', () => {


    fetch("http://localhost:3000/dogs/")
    .then(resp => resp.json())
    .then(json => addDogsToDom(json))

function addDogsToDom(dogs) {
    dogs.forEach(function(dog){
        addDogToTable(dog)
    })
}

function addDogToTable(dog) {
    const dTable = document.getElementById("table-body")
	const newDogTr = document.createElement("tr");
	newDogTr.innerHTML = `<tr>
		<td>${dog.name}</td> 
		<td>${dog.breed}</td> 
		<td>${dog.sex}</td> 
		<td><button data-id=${dog.id}>Edit</button></td>
	</tr>`
	dTable.append(newDogTr);


}
})
