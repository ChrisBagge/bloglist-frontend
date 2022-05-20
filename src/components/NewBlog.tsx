import { useState } from 'react';

function NewBlog({ addNewBlog }: { addNewBlog: (title: string, author: string, url: string) => void }) {

  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogURL, setBlogURL] = useState('')


  const addBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewBlog(blogTitle, blogAuthor, blogURL);
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input type="text" id="title" placeholder='blog title' value={blogTitle} name="Title" onChange={(event) => setBlogTitle(event.target.value)} />
      </div>
      <div>
        author
        <input
          type="text"
          placeholder='blog author'
          value={blogAuthor}
          name="Author"
          id="author"
          onChange={(event) => setBlogAuthor(event.target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          placeholder='blog url'
          value={blogURL}
          name="Url"
          id="url"
          onChange={(event) => setBlogURL(event.target.value)}
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  );
}

export default NewBlog;
