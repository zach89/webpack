import axios from 'axios';

export async function getUser(sgsid) {
  return axios.get('/', { params: { sgsid } });
}
