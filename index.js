const list = document.querySelector("#list"); 
const btn = document.querySelector("button");
const ol = document.createElement("ol");
const form = document.getElementById("form");
const input = document.getElementById("input-fld");
const removeBtn = document.getElementById("remove-btn");
const noTaskMessage = document.getElementById("noTaskMessage");
const select = document.getElementById("colors");
//  const colorOptions = select.querySelectorAll("option");
const taskNumber = document.getElementById("taskNumber");
let taskCount;      //  Stores the count of the task
let tasks = {};     //  Objects that hold the tasks
let date;




function displayMessage(){
  taskCount = Object.keys(JSON.parse(localStorage.getItem('tasks'))).length;
  taskNumber.innerHTML = taskCount;

  if(taskCount == 0){
    noTaskMessage.style.display = "flex"
  }else{
    noTaskMessage.style.display = "none"
  }

}



//  This checks the amount of tasks in the tasks object and assign it to the number of tasks section
if(localStorage.getItem('tasks') == null){
  taskNumber.innerText = 0;
  noTaskMessage.style.display = "flex";
}else {
  taskNumber.innerHTML = Object.keys(JSON.parse(localStorage.getItem('tasks'))).length;
}


//  This adds the tasks to the list and also adds the tasks to the tasks object, which is then added to localStorage
function addTask(event){
  event.preventDefault();

  if(input.value == ""){
    return;
  }
  
  const label = document.createElement("label");
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const dateSpan = document.createElement("span");
  const removeSpan = document.createElement("span");
  const deleteMsg = document.createElement("span");
  checkbox.type = "checkbox";

  date = new Date().toLocaleDateString("en-US");

  dateSpan.textContent = date;
  dateSpan.setAttribute("class", "taskDates");

  removeSpan.textContent = "x";
  removeSpan.setAttribute('class', 'removeSpan');
  //removeSpan.setAttribute('onmouseover', "deleteMsg.style.display = 'block'")

  deleteMsg.textContent = 'Delete';
  deleteMsg.setAttribute('class', 'deleteMsg');

  
  label.textContent = input.value;
  label.appendChild(dateSpan);
  label.appendChild(removeSpan);
  label.appendChild(deleteMsg);
  li.appendChild(checkbox);
  li.appendChild(label);

  if(localStorage.getItem('tasks') == null){
    tasks[label.textContent] = li.innerHTML;
    localStorage.setItem("tasks", JSON.stringify(tasks));

  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[label.textContent] = li.innerHTML;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  ol.appendChild(li);
  list.appendChild(ol);
  input.value = "";  
  
  displayMessage();
}



// This removes a task from the list and also removes that same task from the tasks object stored in localStorage
function removeTask(event){
  event.preventDefault();

  const liTags = list.querySelectorAll("li");
  
  liTags.forEach(element => {
    if(element.querySelector("input").checked){
      tasks = JSON.parse(localStorage.getItem('tasks'));

      delete tasks[element.querySelector("label").textContent];
      
      ol.removeChild(element);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    
  });

  displayMessage();
  
}

form.addEventListener("submit", addTask); //Event listener that adds the tasks
removeBtn.addEventListener("click", removeTask); //Event listener that removes the tasks


//After reload, this will get display the tasks stored in the localStorage to the page
function displayAfterReload(){

  if(localStorage.getItem('tasks') == null){
    return;
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

    for(let i in tasks){
      const li = document.createElement("li");// Creating a list element
      li.innerHTML = tasks[i];
      ol.appendChild(li);
      list.appendChild(ol);
    }

  }
}

displayMessage();
displayAfterReload();


// const allTheRemoveSpan = document.querySelectorAll('removeSpan');

// for(const rs of allTheRemoveSpan){
//   rs.addEventListener("onclick", function(){
//     localStorage.removeItem()
//   })
// }