import { useEffect, useState } from 'react'
import { type Todo, addTodo, removeTodo, toggleTodo } from './todo.ts'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { text: 'acting tough', id: 2, done: false },
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState('')
  const handleAdd = () => {
    setTodos(todos => addTodo(todos, text))
    setText('')
  }

  document.body.classList.add('dark')
  useEffect(() => {
    const wait = async () => {
      await new Promise(resolve => setTimeout(resolve, 4000))
      setIsLoading(false)
    }
    wait()
  }, [])
  return isLoading ? (
    <h1 className="absolute top-1/2 right-1/2 duration-200 animate-pulse">
      ⏳
    </h1>
  ) : (
    <div className="h-100 flex-row">
      <>
        <input
          value={text}
          className="p-3 m-10 border-b-4 border-purple-600 rounded-xl shadow-2xl shadow-purple-600"
          onChange={e => setText(e.target.value)}
          type="text"
          placeholder="Add a new task..."
        />
        <button
          className="border-b-4 border-b-purple-600 rounded-2xl p-3 hover:border-rose-500"
          onClick={handleAdd}
        >
          ADD the TODO
        </button>
      </>
      {todos.length ? (
        <ul className="grid grid-cols-1 p-2 m-2 border-2 rounded-2xl sm:grid-cols-2 lg:grid-cols-3 border-rose-500 shadow-lg shadow-rose-500 xl:grid-cols-4 gap-3">
          {todos.map(todo => {
            return (
              <li
                key={todo.id}
                className="flex justify-evenly items-baseline gap-6"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 appearance-none rounded border border-rose-600 transition-colors
         bg-gray-900 checked:bg-rose-900 checked:border-rose-900 self-center"
                  checked={todo.done}
                  onChange={() => {
                    setTodos(todos => toggleTodo(todos, todo.id))
                  }}
                />
                <span className="text-xl">{todo.text}</span>{' '}
                <button
                  className="px-2 rounded-2xl shadow-xl shadow-rose-900 hover:bg-rose-900"
                  onClick={() => {
                    setTodos(todos => removeTodo(todos, todo.id))
                  }}
                >
                  🗑️
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="relative flex justify-center items-center mx-auto w-5/6 h-100 p-4 rounded-2xl ring-2 ring-rose-900 bg-rose-600/5">
          <h2 className="text-white ">Your TODO List is empty</h2>
        </div>
      )}
    </div>
  )
}
