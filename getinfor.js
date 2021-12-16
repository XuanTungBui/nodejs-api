

const api_url = "http://localhost:8000/api/todos";
  

 function getAll() {
    
    var aPromise = fetch(api_url);
  
  aPromise
    .then(function(response) {
        if(!response.ok) {
           throw new Error("HTTP error, status = " + response.status);
        }
        
        var myJSON_promise = response.json();

        
        return myJSON_promise;
    })
    .then(function(myJSON) {
        show(myJSON);
        console.log(myJSON);
    })
    .catch(function(error)  {
        console.log(error);
    });
}




function show(data) {
    let heading = `<h4>TẤT CẢ THÔNG TIN</h4>`;
    let tab = 
        `<tr>
          <th>Id</th>
          <th>Công Việc</th>
          <th>CreatedAt</th>
          <th>UpdatedAt</th>
         </tr>`;
    
    
    for (let r of data) {
        tab += `<tr> 
    <td>${r._id} </td>
    <td>${r.task}</td>
    <td>${r.createdAt}</td> 
    <td>${r.updatedAt}</td>          
</tr>`;
    }
    document.getElementById("h4").innerHTML = heading;
    document.getElementById("get_all").innerHTML = tab;
}


  
function create(){
        var task = document.querySelector('input[name="task"]').value;
        console.log(`task:${task}`);
        const data = { "task": task };
        fetch('http://localhost:8000/api/todo/create', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
}

function updatebyId(){
    var update_task = document.querySelector('input[name="update_task"]').value;
    const data = { "task": update_task };
    const id = document.querySelector('input[name="updateId"]').value;

    console.log(`id:${id}`);
    console.log(`task:${update_task}`);

    fetch(`http://localhost:8000/api/todo/${id}/update`, {
    method: 'PUT', 
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function deletebyId(){
    var id = document.querySelector('input[name="delete_task"]').value;
    fetch(`http://localhost:8000/api/todo/${id}/delete`,
    { method: 'DELETE' })
    .then(response => {
        if (!response.ok) {
          console.log("Error");
        }
        else {
            console.log("Deleted");
        }
    })
     
}