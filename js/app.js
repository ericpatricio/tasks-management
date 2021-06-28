// Global variables
const form = document.querySelector('#task-form');
const inputTask = document.querySelector('#task');
const inputFilter = document.querySelector('#filter');
const listGroup = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');


// Event listener
form.addEventListener('submit', addTask);
// Add event delagation
listGroup.addEventListener('click', removeTask);
// Add event listener to clear button
clearBtn.addEventListener('click', clearTasks);
// Add event listener to filter
inputFilter.addEventListener('keyup', filterTasks);
// UI event load
document.addEventListener('DOMContentLoaded', getTasks);


// Functions

// Add task
function addTask(e) {
  if(inputTask.value === '') {
    showAlert('Add a new task');     
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class to li    
    li.className = 'list-group-item';    
    // Create text node and append
    li.appendChild(document.createTextNode(inputTask.value));
    // Create link
    const link = document.createElement('a');
    // Add classes to link
    link.className = "delete-item float-end";
    // Add icon to link
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    listGroup.appendChild(li);

    // Select odd li
    const liOdd = document.querySelectorAll('.list-group-item:nth-child(odd)');
    liOdd.forEach(function(li, index){
      li.style.background = '#fffbdf';
    });

    // Store in local storage
    saveInLocalStorage(inputTask.value);

    inputTask.value = "";
  } 
  
  e.preventDefault();
}


// Show alert
function showAlert(message) {
  // Create an div
  const div = document.createElement('div');
  // Get element
  const card = document.querySelector('#main');
  const cardBody =  document.querySelector('#card-body');
  // Add classes to div
  div.className = 'alert alert-danger';  
  // Create text node and append
  div.appendChild(document.createTextNode(message));
  // Insert error above heading
  card.insertBefore(div, cardBody);

  // Clear alert message
  setTimeout(clearMessage, 2000);
}

function clearMessage() {
  document.querySelector('.alert').remove();
}


// Save in local storage
function saveInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Get task from local storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement('li');
    // Add class to li    
    li.className = 'list-group-item';    
    // Create text node and append
    li.appendChild(document.createTextNode(task));
    // Create link
    const link = document.createElement('a');
    // Add classes to link
    link.className = "delete-item float-end";
    // Add icon to link
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    listGroup.appendChild(li);

    // Select odd li
    const liOdd = document.querySelectorAll('.list-group-item:nth-child(odd)');
    liOdd.forEach(function(li, index){
      li.style.background = '#fffbdf';
    });
  })
}

// Remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from local storage
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from local storage
function removeFromLocalStorage(taskList) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  
  tasks.forEach((task, index) => {
    if(taskList.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
  while(listGroup.firstChild) {
    listGroup.removeChild(listGroup.firstChild);
  }

  // Clear from local storage
  clearTasksFromLocalStorage();
}

// Clear taks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  
  const listItem = document.querySelectorAll('.list-group-item');

  listItem.forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    }else {
      task.style.display = 'none';
    }
  })
  
  
}