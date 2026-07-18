import { render, screen, fireEvent } from '@testing-library/react'
import TodoList from './TodoList'

test('Add functionality works', () => {
  render(<TodoList />)
  const input = screen.getByPlaceholderText('Hello D')
  fireEvent.change(input, { target: { value: 'buy milk' } })
  fireEvent.click(screen.getByText('ADD the TODO'))
  expect(screen.getByText('buy milk')).toBeInTheDocument()
})
test('delete functionality works', () => {
  render(<TodoList />)
  expect(screen.getByText('acting tough')).toBeInTheDocument()
})
