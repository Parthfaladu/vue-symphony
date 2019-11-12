import Api from "./api";

const api = new Api(process.env.VUE_APP_BASE_URL, '/auth');

export default {
	getDetail: () => api.call('get', `/detail`),
}