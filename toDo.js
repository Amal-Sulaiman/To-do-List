//لاختيار 
const taskInput = document.querySelector('#taskInput');
const statusInput = document.querySelector('#statusInput');
const addTaskButton = document.querySelector('#addTaskButton');
const searchInput = document.querySelector('#searchInput');
const taskList = document.querySelector('#taskList');
const filterSelect = document.querySelector('#filterSelect');

//from json to object js
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Initial render
renderTasks();


// Render tasks to the list
function renderTasks() {
    taskList.innerHTML = ''; //empty taskList
   
    tasks.forEach((task, index) => {  //looping
       const SearchCondition = task.name.toLowerCase().includes(searchInput.value.toLowerCase()); // Compare texts regardless of case
       const FilterCondition = filterSelect.value === "all" || task.status === filterSelect.value; // To check the filter

        if ( FilterCondition && SearchCondition ) {  
 
            const li = document.createElement('li'); //creat li
            li.innerHTML = `
                <div> ${index+1}: ${task.name } <br>  Status: ${task.status} </div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
       }
    });
}


// 3- Add task
addTaskButton.addEventListener('click', () => {
 
    if (taskInput.value) {
        tasks.push({ name: taskInput.value , status: statusInput.value });// add task and status
        taskInput.value = ''; // empty input field
        saveTasks();
        renderTasks();
    }
});



// 4- Edit task
function editTask(index) {
    const newName = prompt('Edit task name:', tasks[index].name);
    const newStatus = prompt('Edit task status (todo/inprogress/done):', tasks[index].status);
    
    const Status = ['todo', 'inprogress', 'done'];
    
    if (!Status.includes(newStatus)) {
    alert ("Error in editing, please check the text entered in the task status.");
    return;
   }
    else if (newName && newStatus) {
        tasks[index] = { name: newName, status: newStatus };
        saveTasks();
        renderTasks();
    }
}


// 5- Delete task
function deleteTask(index) {
    const userConfirmed = confirm(`Are you sure you want to delete task number: ${index+1}`);
    if(userConfirmed){
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    }
    else
    return;
}

// 7- Search tasks
searchInput.addEventListener('input', renderTasks);


// 6- Filter tasks by status
filterSelect.addEventListener('change',  renderTasks);


// 8- Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));//from js to object json
}



