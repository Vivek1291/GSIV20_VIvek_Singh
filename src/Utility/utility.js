import config from './config';
import axios from 'axios';

const Utility = {
    ajaxCall: function(args) {
        var timeout = 120000;
        var data = args.data || {};
        let method = args.method.toLowerCase();
        let URL;
        URL = config.baseURL + args.url;
        URL += (URL.indexOf('?') > -1 ? '&' : '?') + (config.api_key);
        if(method === 'get') {
            return axios.get(URL, { timeout: timeout }).then(res => {
				return new Promise(function (resolve, reject) {
					resolve(res);
				});
			}).catch(err => {
				console.log(err);
			})
        }
        if(method === 'post') {
            return axios.post(URL, data, { timeout: timeout }).then(res => {
				return new Promise(function (resolve, reject) {
					resolve(res);
				});
			}).catch(err => {
				console.log(err);
			})
        }
    }
}

export default Utility;