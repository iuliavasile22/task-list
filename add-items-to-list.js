const inputBoxElement = document.getElementById("input-box");

const listContainerElement = document.getElementById("list-container");

function addTask() {
  const value = inputBoxElement.value.trim();   // removes spaces

  if (value === "") {
    alert("Textbox empty! Error!");
    return;   // stop execution here
  }
  else{

  let li = document.createElement("li");
  li.textContent = value;  
  listContainerElement.appendChild(li);
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
  }
  inputBoxElement.value = "";
  saveListData();
}


inputBoxElement.addEventListener("keydown", function(event){
  if (event.key === "Enter") {
    addTask();
  }
});


listContainerElement.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveListData();
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveListData();
  }
}, false);


function saveListData(){
  localStorage.setItem("data", listContainerElement.innerHTML);
}

function showTask(){
  listContainerElement.innerHTML = localStorage.getItem("data");
}

showTask();