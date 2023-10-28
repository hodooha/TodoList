let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("tab-underline");
let taskList = [];
let filterList = [];
let mode = "all";

console.log(tabs);

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    addTask();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", (e) => {
    filter(e);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  console.log(taskList);
  filter();
}

function render() {
  let list = [];
  let resultHTML = "";
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-done">
        <span>${list[i].taskContent}</span>
        <div class="button-area">
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left" style="color: #878f9b;"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can" style="color: #e01010;"></i></button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <span>${list[i].taskContent}</span>
        <div class="button-area">
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color: #1dd320;"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can" style="color: #e01010;"></i></button>
        </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top = e.target.offsetHeight - 4 + e.target.offsetTop + "px";
  }

  filterList = [];
  if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}
