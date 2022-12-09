import { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

function App() {

  const [isFormEdit, setIsFormEdit] = useState(false);
  const [editValue, setEditValue] = useState({
    editTitle: '',
    editDescr: '',
    editId: ''
  });

  return (
    <div className="App">
      <h2>TASK LIST</h2>
      <TaskForm
        isFormEdit={isFormEdit}
        setIsFormEdit={setIsFormEdit}
        editValue={editValue}
        setEditValue={setEditValue}
      />
    <TaskFilter />
    <TaskList
      setIsFormEdit={setIsFormEdit}
      editValue={editValue}
      setEditValue={setEditValue}
    />
    </div >
  );
}

export default App;
