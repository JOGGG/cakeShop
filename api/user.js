import request from '@/utils/request' 


export function getMsg() {
	var newR = '/AK'
	var URL =  '/homepage/nihao'
	return request({
		// url:URL.replace(/\/nihao/,newR) ,
		url:'about',
		method: 'get'
	})
}
