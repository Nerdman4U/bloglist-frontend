import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'my great new log title',
    author: 'me',
    likes: 1,
    url: 'http://exampl.e.com'
  }

  const removeBlog = jest.fn()
  const increateLikes = jest.fn()
  const setNoteMessage = jest.fn()

  render(<Blog blog={blog} removeBlog={removeBlog} increaseLikes={increateLikes} setNoteMessage={setNoteMessage} />)

  const element = screen.getByText('Title: my great new log title')
  expect(element).toBeDefined()
})

