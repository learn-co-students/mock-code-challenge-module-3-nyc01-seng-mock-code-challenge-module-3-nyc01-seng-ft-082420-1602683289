// document.addEventListener("DOMContentLoaded", () => {

//     baseUrl = "http://localhost:3000/dogs/"

//     // create row for each dog (<tr>)
//     // add inner HTML to the row (<td>)
//     // append the row the table's body
//     const renderDog = (dog, dogTableBody) => {
//         const dogRow = document.createElement("tr")
//         dogRow.innerHTML = `
//         <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-purpose="edit" data-dog-id="${dog.id}">Edit</button></td>
//         `
//         dogTableBody.append(dogRow)
//     }

//     // //renderDogs to iterate through & render each dog to DOM
//     const renderDogs = dogs => {
//         const dogTableBody = document.querySelector("#table-body")
//         for(const dog of dogs){
//             renderDog(dog, dogTableBody)
//         }
//     }

//     // GET to /dogs to get all dogs from server 
//     const getDogs = () => {
//         fetch (baseUrl)
//         .then(response => response.json())
//         .then(dogs => {
//             renderDogs(dogs)
//         })
//     }
    
//     // Edit dog w/ clickHandler 
//     // Populate the top form with that dog's current information
//     const clickHandler = () => {
//         document.addEventListener("click", e => {
//             if(e.target.matches(`[data-purpose="edit"]`)){
//                 const button = e.target
//                 const dogId = button.dataset.dogId
                
//                 // options = {
//                 //     method: "PATCH"
//                 //     headers: {
//                 //         "content-type": "application/json"
//                 //         "accept": "application/json"
//                 //     },
//                 //     body: JSON.stringify({//WHAT ARE WE STRINGIFYING HERE})
//                 // }

//                 // fetch(baseUrl + dogId, options)
//                 // .then(response => response.json())
//                 // .then(dog => {
//                 //     const button = document.querySelector(`data-dog-id="${dog.id}"`)
//                 // })
//             }
//         })
//     }

//     // submit edits 
//     // PATCH request to "http://localhost:3000/dogs/:id" to update dog information
//     const submitHandler = () => {
//         document.addEventListener("submit", e => {}

//     }


//     // Updates should persists
//     // Make new GET request for all dogs and re-render all of them in the table.
//     // Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.



 
//     getDogs()
//     clickHandler()
//     submitHandler()

// });
