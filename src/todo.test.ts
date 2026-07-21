import { removeTodo, addTodo, toggleTodo, type Todo } from './todo'

test('removeTodo removes the only item, leaving an empty array', () => {
  const todo: Todo[] = [{ id: 1, text: 'playing games', isDone: false }]
  expect(removeTodo(todo, 1)).toEqual([])
})
test('addTodo appends a new todo with the given text', () => {
  const todos: Todo[] = []
  const result = addTodo(todos, 'buy milk')

  expect(result).toEqual([
    { id: expect.any(Number), text: 'buy milk', done: false },
  ])
})
test('toggle todo actually does it', () => {
  const todos: Todo[] = [{ id: 1, text: 'buy Milk', isDone: false }]
  const result = toggleTodo(todos, 1)

  expect(result[0].isDone).toBe(true)
})
test('removeTodo with a non-existent id leaves the array unchanged', () => {
  const todos: Todo[] = [{ id: 1, text: 'buy milk', isDone: false }]
  const result = removeTodo(todos, 999) // 999 doesn't exist in todos

  expect(result).toEqual([{ id: 1, text: 'buy milk', done: false }])
})

test('toggling twice returns done back to its original value', () => {
  const todos: Todo[] = [{ id: 1, text: 'buy milk', isDone: false }]

  const firstToggle = toggleTodo(todos, 1)
  const secondToggle = toggleTodo(firstToggle, 1) // toggle the RESULT, not the original

  expect(secondToggle[0].isDone).toBe(false)
})
