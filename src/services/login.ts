import axios from "axios";
//import { iBlog } from "../interfaces/Blog";

const baseUrl = '/api/login';


const login = async (credentials: {username:string, password:string}) => {
  const request = axios.post(baseUrl, credentials)
  const response = await request;
  return response.data;
}
/*
async function update(id: number, newObject: NoteType) {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
}
*/


export default { login };//, update }

