import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const print = () => { console.log('token:', token )}
const setToken = newToken => { token = `Bearer ${newToken}` }
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  if (!token) {
    console.error('no token')
    return
  }
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  if (!token) {
    console.error('no token')
    return
  }
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = async (id) => {
  if (!id) {
    console.error('No id')
    return
  }
  const config = {
    headers: { Authorization: token }
  }
  axios.delete(`${baseUrl}/${id}`, config)
    .then(response => response.data )

}

export default { getAll, create, update, setToken, print, remove }

