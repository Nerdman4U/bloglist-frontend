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

  it('renders content', () => {
    render(<Blog blog={blog} removeBlog={removeBlog} increaseLikes={increateLikes} setNoteMessage={setNoteMessage} />)
    const element = screen.getByText('Title: my great new log title')
    expect(element).toBeDefined()
  })

  it('shows additional content after clicking view', async () => {
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

  it.only('runs event handler after clicking like', async () => {
    const loggedin = { name: 'me' }
    render(<Blog blog={blog} removeBlog={removeBlog} increaseLikes={increateLikes} setNoteMessage={setNoteMessage} user={loggedin}/>)
    const user = userEvent.setup()
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(increateLikes).toHaveBeenCalledTimes(2)

  })

})

