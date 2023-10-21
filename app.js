// Define constants and select DOM elements
const listholder = document.querySelector(".listholder");
const addInput = document.querySelector("#addinput");
const addBtn = document.querySelector("#addbtn");
const removeBtn = document.querySelector("#removebtn");
const searchInput = document.querySelector("#searchInput");

// Add event listeners
addBtn.addEventListener('click', addTasks);
removeBtn.addEventListener('click', removeAllTasks);
searchInput.addEventListener('keydown', searchTasks);
listholder.addEventListener('click', removeTask);

// Load tasks from localStorage
window.addEventListener('load', loadTasksFromLocalStorage);

// Function to add a task
function addTasks(e) {
    e.preventDefault();
    const taskText = addInput.value.trim();
    if (taskText) {
        addTask(taskText);
        saveTasksToLocalStorage();
    }
}

// Function to add a task to the list
function addTask(taskText) {
    const li = document.createElement('li');
    li.className = "m-1 p-1 w-75 tasks border-dark li-item d-flex justify-content-between align-items-center rounded-1";
    const divv = document.createElement('div');
    divv.textContent = taskText;
    const icon = document.createElement('i');
    icon.className = "fa-solid fa-xmark text-primary removeIcon";
    li.appendChild(divv);
    li.appendChild(icon);
    listholder.appendChild(li);
    
    addInput.value = '';
}

// Function to remove all tasks
function removeAllTasks(e) {
    e.preventDefault();
    listholder.innerHTML = '';
    saveTasksToLocalStorage();
}

// Function to search tasks
function searchTasks(e) {
    const taskItems = document.querySelectorAll('.li-item');
    taskItems.forEach(li => {
        if (li.textContent.indexOf(e.target.value) != -1) {
          li.classList.add("d-flex")
          li.style.display = "block"
       }
       else{
        li.classList.remove("d-flex")
        li.style.display = "none"
       }
     });
}

// Function to remove a task
function removeTask(e) {
    if (e.target.classList.contains('removeIcon')) {
        e.target.parentElement.remove();
        saveTasksToLocalStorage();
    }
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.li-item');
    taskItems.forEach((item) => {
        const taskText = item.querySelector('div').textContent;
        tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((taskText) => {
        addTask(taskText);
    });
}








