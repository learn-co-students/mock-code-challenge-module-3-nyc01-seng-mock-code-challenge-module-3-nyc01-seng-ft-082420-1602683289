




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
const dTable = document.getElementById("table-body")
const form = document.getElementById("dog-form")

dTable.addEventListener("click", clicked)

function clicked() {
	if (event.target.dataset.id) {
		addDogToForm()
	}
}

function addDogToForm() {
	let row = event.target.parentElement.parentElement.children;
	form.children[0].value = row[0].innerText
	form.children[1].value = row[1].innerText
	form.children[2].value = row[2].innerText
	form.children[3].dataset.id = row[3].children[0].dataset.id
}

form.addEventListener("submit", submit)

function submit() {
	event.preventDefault();

	const name = form.children[0].value;
	const breed = form.children[1].value;
	const sex = form.children[2].value;
	const id = form.children[3].dataset.id;

	editDog(id, name, breed, sex)
		.then(resp => resp.json())
		.then(dog => {
			document.getElementById(dog.id).innerHTML = `
			<tr>
				<td>${dog.name}</td> 
				<td>${dog.breed}</td> 
				<td>${dog.sex}</td> 
				<td><button data-id=${dog.id}>Edit</button></td>
			</tr>
			`
        })
        function editDog(id, name, breed, sex) {
            return fetch(`http://localhost:3000/dogs/${id}`),{
                method: "PATCH",
                body: JSON.stringify({
                    name: name,
                    breed: breed,
                    sex: sex
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }
}
})
