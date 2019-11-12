import axios from 'axios'

class Api {
    constructor(baseurl, resource) {
        this.resource = resource
        this.baseurl = baseurl
        this.client = axios.create({
            baseURL: this.baseurl,
            maxRedirects: 0,
        })
        this.client.defaults.timeout = 60 * 100 * 3
        this.defaultHeaders = {}
    }

    request(config) {
        const c = {
            baseURL: this.baseurl,
            ...config,
        }
        return axios.request(c)
    }

    call(method, url, params, data, headers, responseType = 'json') {
        headers = headers || {}

        const h = {
            ...this.defaultHeaders,
            ...headers,
        }

        return this.client.request({
            method: method,
            url: `${this.baseurl}${url}`,
            params: params,
            headers: h,
            data: data,
            responseType: responseType,
        })
    }

    /**
     * Get resource
     * @param {number} id resource id
     */
    get(id, action) {
        let url = `${this.resource}/${id}`;
        if(action) {
            url = `${this.resource}/${id}/${action}`
        }

        return this.call('get', url)
    }

    getAll() {
        return this.call('get', `${this.resource}`)
    }

    search(data) {
        return this.call('post', `${this.resource}/search`, null, data)
    }

    create(data) {
        return this.call('post', `${this.resource}`, null, data)
    }

    update(id, data, action) {
        let url = `${this.resource}/${id}`;
        if (action) {
            url = `${this.resource}/${id}/${action}`
        }

        return this.call('put', url, null, data)
    }

    delete(id, action) {
        let url = `${this.resource}/${id}`;
        if (action) {
            url = `${this.resource}/${id}/${action}`
        }
        return this.call('delete', url)
    }

    action(id, action, data) {
        let url
        if (id) {
            url = `${this.resource}/${id}/${action}`
        } else {
            url = `${this.resource}/${action}`
        }

        return this.call('post', url, null, data, {})
    }
}

export default Api;