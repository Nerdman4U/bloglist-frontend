import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog', () => {
  let blog, removeBlog, increateLikes, setNoteMessage
  beforeEach(() => {
    blog = {
      title: 'my great new log title',
      author: 'me',
      likes: 1,
      url: 'http://exampl.e.com'
    }
    removeBlog = jest.fn()
    increateLikes = jest.fn()
    setNoteMessage = jest.fn()
  })

  test('renders content', () => {
    render(<Blog blog={blog} removeBlog={removeBlog} increaseLikes={increateLikes} setNoteMessage={setNoteMessage} />)
    const element = screen.getByText('Title: my great new log title')
    expect(element).toBeDefined()
  })

  test('click how more button to view full details of blog post', async () => {
    render(<Blog blog={blog} removeBlog={removeBlog} increaseLikes={increateLikes} setNoteMessage={setNoteMessage} />)
    const user = userEvent.setup()
    const button = screen.getByText('View')
    expect(button).toBeDefined()
    await user.click(button)

    expect(screen.getByText('Title: my great new log title') ).toBeDefined()
    expect(screen.findByText('Author: me')).toBeDefined()
    expect(screen.findByText('Likes: 1')).toBeDefined()
    expect(screen.findByText('Url: http://exampl.e.com')).toBeDefined()
  })

})

