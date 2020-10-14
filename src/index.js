document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/dogs/"

    const fetchDogs = () => {
        fetch(baseUrl)
        .then(res => res.json())
        .then(dogs => renderDogs(dogs))
    };

    const renderDogs = dogs => {
        const tableBody = document.querySelector("#table-body")
        tableBody.innerHTML = ""
        for (let dog of dogs){
            renderDog(dog, tableBody)
        }
    };

    const renderDog = (dog, tableBody) => {
        const tableRow = document.createElement("tr")
        tableRow.dataset.dogId = dog.id

        tableRow.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
             <td><button>Edit</button></td>
        `
        tableBody.append(tableRow)
    };

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if (e.target.matches("button")){
                const button = e.target
                const form = document.querySelector("#dog-form")
                const dogInfo = button.closest("tr")
                const dogIndex = dogInfo.children
                const name = dogIndex[0].textContent
                const breed = dogIndex[1].textContent
                const sex = dogIndex[2].textContent
                const dogId = dogInfo.dataset.dogId

                form[0].value = name
                form[1].value = breed
                form[2].value = sex
                form.dataset.dogId = dogId
            };
        });
    };

    const submitHandler = () => {
        document.addEventListener("submit", e => {
            e.preventDefault();
            const formButton = e.target
            const name = formButton[0].value
            const breed = formButton[1].value
            const sex = formButton[2].value
            const dogId = formButton.dataset.dogId

            const dogUpdate = {
                name: name,
                breed: breed,
                sex: sex,
            };

            const options = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accepts": "application/json"
                },
                body: JSON.stringify(dogUpdate)
            }
            fetch(baseUrl + dogId, options)
            .then(res => res.json())
            .then(dog => fetchDogs(dog) )
        })
    }
   
    fetchDogs();
    clickHandler();
    submitHandler();
});