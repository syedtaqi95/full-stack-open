import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with the react-testing-library',
    important: true,
  }

  const component = render(
    <Note note={note} />
  )

  // Method 1
  expect(component.container).toHaveTextContent(note.content)

  // Method 2
  const element = component.getByText(note.content)
  expect(element).toBeDefined()

  // Method 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(note.content)

  const li = component.container.querySelector('li')
  console.log(prettyDOM(li))

})

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})