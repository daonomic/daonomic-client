import axios from 'axios';
import sale from '~/config/sale';
import auth from '~/stores/auth';

const apiSubDomain = process.env.API === 'development' ? 'dev-api' : 'api';
const daonomicUrl = `https://${apiSubDomain}.daonomic.io/v1`;
const daoxUrl = `https://${apiSubDomain}.daox.io/v1`;

const daonomicApi = axios.create({
  baseURL: daonomicUrl,
});
const daoxApi = axios.create({
  baseURL: daoxUrl,
});

const getDefaultOptions = () => ({
  headers: {
    'X-AUTH-TOKEN': auth.token,
  },
});

export default {
  auth: {
    login: ({ email, password }) => daonomicApi.post('/login', { username: email, password }),
    register: ({ email }) => daonomicApi.post('/register', { email }),
    resetPassword: ({ email }) => daonomicApi.post('/password/change', { email }),
    createNewPassword: ({ token, password, confirmedPassword }) => daonomicApi.post(`/password/change/${token}`, { password, password2: confirmedPassword }),
  },
  address: {
    get: () => daonomicApi.get('/address', getDefaultOptions()),
    set: ({ address }) => daonomicApi.post('/address', { address }, getDefaultOptions()),
  },
  getIcoInfo: () => daonomicApi.get(`/sales/${sale}`, getDefaultOptions()),
  issueToken: ({ token, to, data }) => daoxApi.post(`/tokens/${token}/issue`, { to, data }, getDefaultOptions()),
  getIssueRequestStatus: ({ id }) => daoxApi.get(`/requests/${id}/status`),
  getBalance: () => daonomicApi.get(`/sales/${sale}/balance`, getDefaultOptions()),
};
