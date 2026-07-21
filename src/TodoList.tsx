import {
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ChangeEvent,
} from 'react'
import { type Todo, addTodo, removeTodo, toggleTodo } from './todo.ts'
//-------------------------------------------Utilities----------------------------------------
type TodoAction =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'remove'; id: number }

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'add':
      return addTodo(state, action.text)
    case 'toggle':
      return toggleTodo(state, action.id)
    case 'remove':
      return removeTodo(state, action.id)
    default:
      return state
  }
}

function useInput(initialValue: string = '') {
  const [text, setText] = useState<string>(initialValue)
  function reset() {
    setText(initialValue)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return { text, reset, onChange }
}

//---------------------------------------------------Main----------------------------------------------

export default function App() {
  const [todos, dispatch] = useReducer(todoReducer, [
    { text: 'acting tough', id: 2, isDone: false },
  ])
  const [isLoading, setIsLoading] = useState(true)

  const input = useInput()

  const completedTodos = useMemo(() => {
    return todos.reduce((accumulator, todo) => {
      return todo.isDone ? accumulator + 1 : accumulator
    }, 0)
  }, [todos])

  const handleAdd = () => {
    dispatch({ type: 'add', text: input.text })
    input.reset()
  }

  useEffect(() => {
    document.body.classList.add('dark')
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
    <div className="min-h-100vh flex-row">
      <div className="flex justify-evenly items-center mt-5 mb-3">
        <input
          value={input.text}
          className="p-3 m-5 border-b-4 border-purple-600 rounded-xl shadow-2xl shadow-purple-600"
          onChange={input.onChange}
          type="text"
          placeholder="Add a new task..."
        />
        <button
          className="border-b-4 border-b-purple-600 rounded-2xl p-3  hover:border-rose-500"
          onClick={handleAdd}
        >
          ADD the TODO
        </button>
        <h2 className="px-5 border-b-4 border-b-purple-600 m-0 rounded-2xl p-3 text-white  hover:border-rose-500">
          ✅ : {completedTodos}
        </h2>
      </div>
      <div className="relative flex flex-col justify-start items-center overflow-scroll mx-auto w-5/6 overflow-x-hidden min-h-100 max-h-[80vh] px-3 py-2 rounded-2xl ring-2 ring-rose-900 bg-rose-600/5">
        {todos.length ? (
          <ul className="grid w-full grid-cols-1 p-2 m-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
            {todos.map(todo => {
              return (
                <li
                  key={todo.id}
                  className="flex justify-evenly items-baseline gap-6 border-2 rounded-2xl border-rose-500 shadow-lg shadow-rose-500 py-4"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 appearance-none rounded border border-rose-600 transition-colors
         bg-gray-900 checked:bg-rose-900 checked:border-rose-900 self-center"
                    checked={todo.isDone}
                    onChange={() => {
                      dispatch({ type: 'toggle', id: todo.id })
                    }}
                  />
                  <span className="text-xl min-w-30">{todo.text}</span>{' '}
                  <button
                    className="px-2 rounded-2xl shadow-xl shadow-rose-900 hover:bg-rose-900"
                    onClick={() => {
                      dispatch({ type: 'remove', id: todo.id })
                    }}
                  >
                    🗑️
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <h2 className="text-white ">Your TODO List is empty</h2>
        )}
      </div>
    </div>
  )
}
