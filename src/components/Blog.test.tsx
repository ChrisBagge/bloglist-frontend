import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { BlogDB } from '../interfaces/Blog'

describe('<Blog />', () => {
  
  test('<Blog /> renders the blogs title and author, but not url or likes', () => {
    const blog: BlogDB = { author: "Christopher Bagge", likes: 5, user: { name: "ChristBagge", id: "1" }, id: "123", title: "test title", url: "www.example.com" }
    const deleteBlog = jest.fn()
    const likeBlog = jest.fn()
    
    const { container } = render(<Blog id ={blog.id} />)
    const div = container.querySelector('.simpleBlog')
    expect(div).toHaveTextContent('test title Christopher Bagge')
    expect(div).toBeDefined()
  })
  test('<Blog /> renders the blogs url and likes after view button is pressed', async () => {
    const blog: BlogDB = { author: "Christopher Bagge", likes: 5, user: { name: "ChristBagge", id: "1" }, id: "123", title: "test title", url: "www.example.com" }
    const deleteBlog = jest.fn()
    const likeBlog = jest.fn()
    
    const { container } = render(<Blog id={blog.id} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.advancedBlog')
    expect(div).toHaveTextContent('www.example.comlikes 5')
    

    screen.debug(container)

  })
  test('<Blog /> if like button is pressed twice the event handler is called twice', async () => {
    const blog: BlogDB = { author: "Christopher Bagge", likes: 5, user: { name: "ChristBagge", id: "1" }, id: "123", title: "test title", url: "www.example.com" }
    const deleteBlog = jest.fn()
    const likeBlog = jest.fn()
    
    render(<Blog id={blog.id} />)

    const user = userEvent.setup()
    
    let button = screen.getByText('view')
    await user.click(button)
    
    button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(likeBlog.mock.calls).toHaveLength(2)

  })


})