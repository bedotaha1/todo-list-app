export interface Todo {
  id: number
  text: string
  done: boolean
}

export function addTodo(todos: Todo[], text: string): Todo[] {
  if (!text.trim()) return todos
  const newTodo = {
    id: Date.now(),
    text: text,
    done: false,
  }
  return [...todos, newTodo]
}

export function removeTodo(todos: Todo[], id: number): Todo[] {
  return todos.filter(todo => todo.id !== id)
}

export function toggleTodo(todos: Todo[], id: number): Todo[] {
  return todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  )
}
