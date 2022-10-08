//TODO: Write better comments to improve the readablitity of the code

const list = document.querySelector("#list"); 
const btn = document.querySelector("button");
const ol = document.createElement("ol");
const form = document.getElementById("form");
const input = document.getElementById("input-fld");
const removeBtn = document.getElementById("remove-btn");
const select = document.getElementById("colors");
//const colorOptions = select.querySelectorAll("option");
const taskNumber = document.getElementById("taskNumber");
let tasks = {};// Objects that hold the tasks

form.addEventListener("submit", function(event){
  event.preventDefault();

  if(input.value == ""){
    return;
  }
  
  const label = document.createElement("label");
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  label.textContent = input.value;
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
});


removeBtn.addEventListener("click", function(event){
  event.preventDefault();

  const liTags = list.querySelectorAll("li");
  
  liTags.forEach(element => {
    if(element.querySelector("input").checked){
      tasks = JSON.parse(localStorage.getItem('tasks'));

      delete tasks[element.querySelector("label").innerHTML];
      
      ol.removeChild(element);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    
  });
});

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



displayAfterReload();