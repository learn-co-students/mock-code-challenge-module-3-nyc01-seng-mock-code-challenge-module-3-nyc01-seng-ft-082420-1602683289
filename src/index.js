document.addEventListener('DOMContentLoaded', () => {

    BASEURL = "http://localhost:3000/dogs/"

    const getDogs = () => {
        fetch(BASEURL)
        .then(response => response.json())
        .then(dogsData => renderDogs(dogsData))
    }

    const renderDogs = (dogsData) => {
        const tableDog = document.querySelector("table")
        tableDog.dataset.id = "dogTable"

        for(const dogObj of dogsData) {
            renderDog(dogObj, tableDog)
        }
    }

    const renderDog = (dogObj, tableDog) => {
        newThead = document.createElement("thead")
        newThead.innerHTML = `
            <tr class='padding'>
                <td class="name">${dogObj.name}</td>
                <td class="breed">${dogObj.breed}</td>
                <td class="sex">${dogObj.sex}</td>
                <td><button data-dog-id=${dogObj.id} class="edit" >Edit</button></td>
            </tr>
        `
        tableDog.appendChild(newThead)
    }
    
    const clickHandler = () => {
        document.addEventListener("click", e => {
            if(e.target.matches(".edit")) {
                const button = e.target
                const buttonId = button.dataset.dogId
                const dogName = document.querySelector(".name")
                console.log(dogName)
                

        //         <form id='dog-form' class="padding margin border-round border-grey">
        //   <input type="text" name="name" placeholder="dog's name" value="" />
        //   <input type="text" name="breed" placeholder="dog's breed" value="" />
        //   <input type="text" name="sex" placeholder="dog's sex" value="" />
        //   <input type="submit" value="Submit" />
        // </form>
               
            }



        })
    }

    // const submitHandler = () => {


    //     options = {
    //         method: "PATCH",
    //         headers: {
    //             "content-type": "application/json",
    //             "accept": "application/json"
    //         },
    //         body: JSON.stringify(editedDog)
    //     }
    // }


    getDogs();
    clickHandler();
    // submitHandler();

})