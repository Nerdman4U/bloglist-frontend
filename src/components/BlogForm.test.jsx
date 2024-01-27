import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('BlogForm', () => {

  it('renders content', () => {
    render(<BlogForm createBlog={() => {}} />)
    const element = screen.getByText('Add new blog')
    expect(element).toBeDefined()
  })

  it('runs event handler after submitting form', async () => {
    const createBlog = jest.fn()
    render(<BlogForm createBlog={createBlog} />)
    const user = userEvent.setup()
    const button = screen.getByText('Save')
    const title = screen.getByPlaceholderText('write title')
    const url = screen.getByPlaceholderText('write url')

    await user.type(title, 'title')
    await user.type(url, 'url')
    await user.click(button)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0]).toEqual({ title: 'title', url: 'url' })
  })

})