const taskInput = document.getElementById('taskInput')
const addTaskBtn = document.getElementById('addTaskBtn')
const taskList = document.getElementById('taskList')

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  tasks.forEach((task) => addTaskToDOM(task.text, task.completed, task.id))
}

function addTaskToDOM(text, completed = false, id = Date.now()) {
  const taskItem = document.createElement('li')
  taskItem.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-center'
  )
  if (completed) taskItem.classList.add('completed')
  taskItem.dataset.id = id

  taskItem.innerHTML = `
    <span contenteditable="true">${text}</span>
    <div>
        <button style="background-color: rgb(227, 142, 189); color: white; border: none; border-radius: 3px" onclick="toggleComplete(${id})">Concluir</button>
        <button style="background-color: #dc3545; color: white; border: none; border-radius: 3px" onclick="deleteTask(${id})">Excluir</button>
    </div>
`

  taskList.appendChild(taskItem)

  saveTask({ text, completed, id })
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  const taskIndex = tasks.findIndex((t) => t.id === task.id)

  if (taskIndex >= 0) {
    tasks[taskIndex] = task
  } else {
    tasks.push(task)
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

addTaskBtn.addEventListener('click', () => {
  if (taskInput.value.trim()) {
    addTaskToDOM(taskInput.value)
    taskInput.value = ''
  }
})

function deleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  const updatedTasks = tasks.filter((task) => task.id !== id)
  localStorage.setItem('tasks', JSON.stringify(updatedTasks))

  const taskItem = document.querySelector(`[data-id='${id}']`)
  if (taskItem) taskItem.remove()
}

function toggleComplete(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  const task = tasks.find((t) => t.id === id)
  if (task) {
    task.completed = !task.completed
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const taskItem = document.querySelector(`[data-id='${id}']`)
  if (taskItem) taskItem.classList.toggle('completed')
}

document.addEventListener('DOMContentLoaded', loadTasks)
