import { useState } from 'react';
import { iBlog } from '../interfaces/Blog';

function NewBlog({ addNewBlog }: { addNewBlog: (newBlog: iBlog) => void }) {
  const [newBlog, setNewBlog] = useState<iBlog>({
    author: '',
    title: '',
    url: '',
    //likes: 0,
    //user: null,
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };

  const addBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewBlog(newBlog);
    setNewBlog({ author: '', title: '', url: ''/*, likes: 0, user: null*/ });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input type="text" value={newBlog.title} name="Title" onChange={handleTitleChange} />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={(event) => setNewBlog({ ...newBlog, author: event.target.value })}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={(event) => setNewBlog({ ...newBlog, url: event.target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
}

export default NewBlog;
