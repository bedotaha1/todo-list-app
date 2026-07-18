import { render, screen, fireEvent } from '@testing-library/react'
import TodoList from './TodoList'

test('Add functionality works', () => {
  render(<TodoList />)
  const input = screen.getByPlaceholderText('Type the to-do here')
  fireEvent.change(input, { target: { value: 'buy milk' } })
  fireEvent.click(screen.getByText('ADD the TODO'))
  expect(screen.getByText('buy milk')).toBeInTheDocument()
})
