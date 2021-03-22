//Add task
showtask();
let addtaskinput = document.getElementById('addtaskinput');
let addtaskbtn = document.getElementById('addtaskbtn');

addtaskbtn.addEventListener('click', function(){
    addtaskinputVal = addtaskinput.value;
    if(addtaskinputVal.trim() != 0){
        let webTask = localStorage.getItem("localTask");
        if(webTask == null){
            taskObj = [];
        }else{
            taskObj = JSON.parse(webTask);
        }
        taskObj.push(addtaskinputVal)
        localStorage.setItem("localTask", JSON.stringify(taskObj));
        addtaskinput.value = '';
    }
  
    showtask();

});

function showtask(){
    let webTask = localStorage.getItem("localTask");
    if(webTask == null){
        taskObj = [];
    }else{
        taskObj = JSON.parse(webTask);
    }
    let html = '';
    let addedtasklist = document.getElementById('addedtasklist');
    taskObj.forEach((item, index) => {
        html += `<tr>
                    <th scope = "row">${index+1}</th>
                    <td>${item}</td>
                    <td><button type = "button" onclick= "editTask(${index})" class="text-primary"><i class = "fa fa-edit"></i>Edit</button></td>
                    <td><button type= "button" onclick = "deleteTask(${index})" class="text-danger"><i class = "fa fa-trash"></i>Delete</button></td>
                </tr>`;

    });
    addedtasklist.innerHTML = html;

}

//edit task code
function editTask(index){
    let saveindex = document.getElementById('saveindex');
    let addtaskbtn = document.getElementById('addtaskbtn');
    let savetaskbtn = document.getElementById('savetaskbtn');
    //index value sore in hidden filed...using index
    saveindex.value = index;
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    addtaskinput.value = taskObj[index];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
}

//Save the task
let savetaskbtn = document.getElementById('savetaskbtn');
savetaskbtn.addEventListener('click', function(){
    let addtaskbtn = document.getElementById('addtaskbtn');
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    let saveindex = document.getElementById('saveindex').value;
    taskObj[saveindex] = addtaskinput.value;
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    addtaskinput.value = '';
    showtask();

});

//Delete task
function deleteTask(index){
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    taskObj.splice(index, 1);
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showtask();
}

//Delete all Task
let deleteallbtn = document.getElementById('deleteallbtn');
deleteallbtn.addEventListener('click', function(){
    let savetaskbtn = document.getElementById('savetaskbtn');
    let addtaskbtn = document.getElementById('addtaskbtn');
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    if(webTask == null){
        taskObj = [];
    }else{
        taskObj = JSON.parse(webTask);
        taskObj = [];
    }
    savetaskbtn.style.display = "none";
    addtaskbtn.style.display = "block";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    addtaskinput.value = '';
    showtask();

})


// serachlist
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let reg = new RegExp(searchtextboxval, 'gi');
        if(searchedtext.match(reg)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})
