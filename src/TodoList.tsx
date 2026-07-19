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
        placeholder="Add a new task..."
      />
      <button onClick={handleAdd}>ADD the TODO</button>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {todos.map(todo => {
          return (
            <li
              key={todo.id}
              className="flex justify-center items-baseline gap-6"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  setTodos(todos => toggleTodo(todos, todo.id))
                }}
              />
              <span className="text-3xl">{todo.text}</span>{' '}
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
