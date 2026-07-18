import { useState } from 'react'
import './App.css'
import { type Todo, addTodo, removeTodo, toggleTodo } from './todo.ts'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { text: 'acting tough', id: 2, done: false },
  ])
  const [text, setText] = useState('')
  const handleAdd = () => {
    setTodos(todos => addTodo(todos, text))
    setText('')
  }
  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        type="text"
        placeholder="Hello D"
      />
      <button onClick={handleAdd}>ADD the TODO</button>
      <ul>
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  setTodos(todos => toggleTodo(todos, todo.id))
                }}
              />
              <span>{todo.text}</span>{' '}
              <button
                onClick={() => {
                  setTodos(todos => removeTodo(todos, todo.id))
                }}
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
