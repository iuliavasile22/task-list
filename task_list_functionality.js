const inputElement = document.getElementById("inputElement");

const listContainerElement = document.getElementById("list-container");

const errorMessage = document.getElementById("error-message");

const counter = document.getElementById("counter");

const MAX_LENGTH = 50;

let list_task = [];

  inputElement.addEventListener("inputElement",() => {
    const len = inputElement.value.length;
    counter.textContent = `${len} / ${MAX_LENGTH}`;

  //it exceeds the limmit, shows error

  if(len > MAX_LENGTH){
    showErrorMessage( `Max ${MAX_LENGTH} characters allowed`);
  }else{
    disableErrorMessage();
  }
  });

  function showErrorMessage(message){
    errorMessage.textContent = message //set text
    errorMessage.style.display = "block"; //display message
  }
   

  function disableErrorMessage(){
   errorMessage.textContent = "";
   errorMessage.style.display = "none";
  }

  function handleAddTask(){
    const task_text = inputElement.value.trim();

    if(!task_text){
      showErrorMessage("Field empty. Please enter a task.");
      return;
    }
    disableErrorMessage();

    
    addTask(task_text);

    inputElement.value = "";
    counter.textContent = `0 / ${MAX_LENGTH}`;

  }

  function addTask() {
      const value = inputElement.value.trim();   // removes spaces

      if (value === "") {
        alert("Textbox empty! Error!");
        return;   // stop execution here
      }

      //duplicate tasks check
      const defaultText = value.toLowerCase();

      const duplicate = list_task.some(t => typeof t.title === "string" && t.title.trim().toLowerCase() === defaultText);

      if(duplicate){
        alert("Duplicate task! Can't add to the list!");
        inputElement.value = "";
        inputElement.focus();
        return;
      }

      const task = {
      id: Date.now(),
      title: value,
      done: false
     };

      list_task.push(task);
      saveListData();
      renderTasks();

      inputElement.value ="";
      inputElement.focus();

    }

    inputElement.addEventListener("keydown", function(event){
      if (event.key === "Enter") {
        addTask();
      }
    });


    function renderTasks(){
      listContainerElement.innerHTML = ""; //clear list

      list_task.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.title;

        if(task.done){
          li.classList.add("checked");
        }

        li.dataset.id = task.id;

        let span = document.createElement("span");
        span.textContent = "\u00d7";

        li.appendChild(span);
        listContainerElement.appendChild(li);
        
      
      })
    }

    listContainerElement.addEventListener("click", function(e){
       if(e.target.tagName === "SPAN"){
        const li = e.target.parentElement;
        const id = Number(li.dataset.id);

        deleteTask(id);
    }
    });

    function deleteTask(id){
      const itemDelete = document.querySelector(`li[data-id="${id}"]`);

      if(!itemDelete) return;

      itemDelete.remove();

      //for storage and reload
      list_task = list_task.filter(task => task.id !== id);

      saveListData();
      renderTasks();
    }
    

    function saveListData(){
      localStorage.setItem("list_task", JSON.stringify(list_task));
    }

    function showTask(){
      const data = localStorage.getItem("list_task");
      if(data){
        list_task = JSON.parse(data);
      }
      renderTasks();
    }

showTask();