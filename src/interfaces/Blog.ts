interface iUser {
  token: string,
  username: string,
  name: string,
  id: string
}

interface UserDB {
  name: string,
  id: string
}

export interface BlogDB {
  title: string,
  author: string,
  url: string,
  likes: number,
  user: UserDB
  id: string,

}

export interface iBlog {
  //id?: string,
  title: string,
  author: string,
  url: string,
  //likes?: number,
  //user: iUser | null
}

interface Blog {
  title: string,
  url: string,
  likes: number,
  id: string
}

export interface UserWithBlogs {
  userName: string,
  name: string,
  blogs: Blog[],
  id: string

}