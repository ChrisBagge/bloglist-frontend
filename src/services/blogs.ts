import axios from "axios";
import { iBlog } from "../interfaces/Blog";

const baseUrl = '/api/blogs';

let token = ''

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request;
  return response.data;
}

//const create = async (newObject: Omit<iBlog, "id" | "likes">) => {
const create = async (newObject: iBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  const response = await request;
  return response.data;
}

async function update(id: string, newObject: iBlog) {  
  console.log(`${baseUrl}/${id}`)
  const request = axios.put(`${baseUrl}/${id}`, newObject //{
    //"title": "test",
    //"author": "test",
    //"url": "",
    //"likes": 4,
    //"userId": "6269dd140268f4ee4389290a"
//}
);//newObject);
  const response = await request;
  return response.data;
}

async function deleteBlog(id: string) {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config);
  const response = await request;

  return response.data;
}


export default { getAll, create, setToken, update, deleteBlog }

