import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'


describe('<NewBlog addNewBlog={handleNewBlog} />', () => {

  test('<NewBlog /> event handler for adding a new blog is called with the right details', async () => {
    //const blog: iBlog = { author: "Christopher", title: "title", url: "www.example.com" }

    const handleNewBlog = jest.fn()
    

    render(<NewBlog addNewBlog={handleNewBlog} />)

    const user = userEvent.setup();

    const title = screen.getByPlaceholderText('blog title')
    const author = screen.getByPlaceholderText('blog author')
    const url = screen.getByPlaceholderText('blog url')

    const submitButton = screen.getByText('create')

    await user.type(title, 'title')
    await user.type(author, 'Christopher')
    await user.type(url, 'www.example.com')

    
    await user.click(submitButton)
    screen.debug()
    expect(handleNewBlog.mock.calls).toHaveLength(1)

    const call = handleNewBlog.mock.calls[0][1].content
   
    
    expect(handleNewBlog.mock.calls[0][0]).toBe("title") // is called with an object of type blog
    expect(handleNewBlog.mock.calls[0][1]).toBe("Christopher") // is called with an object of type blog
    expect(handleNewBlog.mock.calls[0][2]).toBe("www.example.com") // is called with an object of type blog

  })

})

