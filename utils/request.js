import axios from "axios"
import Vue from "vue"


const service = axios.create({
	withCredentials: true,
	crossDomain: true,
	baseURL: Vue.prototype.baseURL,
	timeout: 6000
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
	config => {
		console.log('请求拦截成功')
		console.log(config)
		return config;
	},
	error => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

//配置成功后的拦截器
service.interceptors.response.use(res => {
	if (res.data.status == 200) {
		return res.data
	} else {
		return Promise.reject(res.data.msg);
	}
}, error => {
	return Promise.reject(error)
})

axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
	 console.error(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		let req = {
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		}
		
		uni.request(req)
	})
}
export default service