const inputElement = document.getElementById("inputElement");

const listContainerElement = document.getElementById("list-container");

const errorInput = document.getElementById("error");

const counter = document.getElementById("counter");

const MAX_LENGTH = 50;

let list_task = [];

  inputElement.addEventListener("inputElement",() => {
    const len = inputElement.value.length;
    counter.textContent = `${len} / ${MAX_LENGTH}`;

  //it exceeds the limmit, shows error

  if(len > MAX_LENGTH){
    showError( `Max ${MAX_LENGTH} characters allowed`);
  }else{
    clearError();
  }
  });

  function showError(msg){
    errorInput.style.display = "block";
    errorInput.textContent = msg;
  }

  function clearError(){
    errorInput.style.display = "none";
    errorInput.textContent = msg;
  }


  function handleAddTask(){
    const task_text = inputElement.value.trim();

    if(task_text.length === 0){
      showError("Task added is empty! ERROR!");
      return;
    }
    clearError();

    //add list task
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
     const task = {
      id: Date.now(),
      title: value,
      done: false
     };

      list_task.push(task);

      renderTasks();
      saveListData();

      inputElement.value ="";

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
        span.innerHTML = "\u00d7";

        li.appendChild(span);
        listContainerElement.appendChild(li);
        
      });
    }
    function saveListData(){
      localStorage.setItem("task", JSON.stringify(task));
    }

    function showTask(){
      const data = localStorage.getItem("task");
      if(data){
        task = JSON.parse(data);
      }
      renderTasks();
    }

showTask();