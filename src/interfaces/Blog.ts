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