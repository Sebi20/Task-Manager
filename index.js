// Defining different elements for the page
const list = document.querySelector("#list"); //This is the div that the list will be added to. 
const btn = document.querySelector("button");// This holds the add task button
const ol = document.createElement("ol");// Creating a ordered list element
const form = document.getElementById("form");// This holds the form to with the search field and button
const input = document.getElementById("input-fld");// This is the input field where you add the task
const removeBtn = document.getElementById("remove-btn");// This is the remove button that will remove all checked tasks
//-------------------------------------------------------------------------------------------------------------------------

localStorage.removeItem("Tasks"); //TODO: Continue to work on localStorage.
// Adding a submit event listener on the search form on the page
form.addEventListener("submit", function(event){
  event.preventDefault();

  if(input.value == ""){
    return;// return nothing if the input field is empty
  }
  
  const label = document.createElement("label");// Creating a label element for the checkbox
  const li = document.createElement("li");// Creating a list element
  const checkbox = document.createElement("input");// Creating an input element
    checkbox.type = "checkbox";// Changing the input type into checkbox
  
  label.textContent = input.value;// Adding the text from the input field to the label to display the task

  
  li.appendChild(checkbox);// Adding the checkbox to the list element
  li.appendChild(label);// Adding a label with the checkbox; in order to display the task that was written in the inout field
  localStorage.setItem(label.textContent, li);
  ol.appendChild(li);// Adding the list element to the ordered list tag
  list.appendChild(ol);// Adding the ordered list tag to the div for displaying the whole thing
  input.value = "";

  //localStorage.setItem('Tasks', ol.innerHTML);
  
  
})// End of eventlistener for submitting a task to the list


removeBtn.addEventListener("click", function(event){
  event.preventDefault();
  const liTags = list.getElementsByTagName("li");// Returns an array like object all the li tags in the list div
  //console.log("Old list" + list.innerHTML);

  //localStorage.removeItem('Tasks')
  /*The for loop goes through all the li tags in the list div*/
  for(let i = 0; i < liTags.length; i++){

    /*When a checkbox is found that has a check
    it will be removed*/
    if(liTags[i].querySelector("input").checked == true){
      localStorage.removeItem(liTags[i].querySelector("label").innerHTML);
      //console.log(liTags[i].querySelector("label").innerHTML);
      ol.removeChild(liTags[i]);//removing the list element
      
    }// End of the if statement
    //localStorage.setItem('Tasks', ol.innerHTML);

  }// End of the for loop
  //console.log("new list" + list.innerHTML); 

  
})// End of the eventListener that was on the remove button. When clicked the button removes an item on the list that is checked.

 
// let saved = localStorage.getItem('Tasks');

// if(saved){
//   ol.innerHTML = localStorage.getItem('Tasks');
// }



