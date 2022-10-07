//TODO: There's a bug where the rendered list elements from local storage gets rendered in different orders.
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
let tasks = [];//Array to hold the tasks

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

  tasks.push(li);
  console.log(tasks);
  console.log(JSON.stringify(tasks));

  
  localStorage.setItem(label.textContent, li.innerHTML);

  ol.appendChild(li);
  list.appendChild(ol);
  input.value = "";  
});


removeBtn.addEventListener("click", function(event){
  event.preventDefault();

  const liTags = list.querySelectorAll("li");
  
  liTags.forEach(element => {
    if(element.querySelector("input").checked){
      localStorage.removeItem(element.querySelector("label").innerHTML);
      ol.removeChild(element);
    }
  });
  
});

function displayAfterReload(){
  for(let i = localStorage.length - 1; i >= 0; i--){
    const li = document.createElement("li");// Creating a list element
    li.innerHTML = localStorage.getItem(localStorage.key(i));
    ol.appendChild(li);
    list.appendChild(ol);
  }
}


displayAfterReload();
