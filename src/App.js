import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddTask from './components/AddTask'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTask = async () => {
      const getTasksFromServer = await fetchTasks()
      setTasks(getTasksFromServer)
    }
    getTask()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data;
  }

  // Add a task
  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await response.json()
    
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  // Delete a task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    console.log('res', res.status)
    return res.status === 200 ? setTasks(tasks.filter((task) => task.id !== id)) : alert('Error Deleting This Task')
  }

  // Toggle the reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-type': 'application/json', 
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
       task.id === id ? {...task, reminder: data.reminder} : task
       )
      )
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd = {() => setShowAddTask(!showAddTask)} showTask ={showAddTask} />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask &&<AddTask onAdd = {addTask} />}
            {tasks.length > 0 ?<Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder} /> : 'No Tasks to show'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
