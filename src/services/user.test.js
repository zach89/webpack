import axios from 'axios';
import { getUser } from './user';
jest.mock('axios');

describe('user test', () => {
  it('getUser test', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
    const sgsid = '01371059';
    const res = await getUser(sgsid);
    expect(axios.get).toBeCalledWith('/', { params: { sgsid } });
    expect(res).toEqual({ data: {} });
  });
});
