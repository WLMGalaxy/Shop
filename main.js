// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 按需导入 $http 对象
import {
	$http
} from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 请求接口根路径
$http.baseUrl = 'https://www.fastmock.site/mock/6c3454cb9716e486ccedb6060afe9551/shop'

// 请求拦截器
$http.beforeRequest = function(options) {
	wx.showLoading({
		title: '数据加载中...',
	})
}
// 响应拦截器 就是响应完成之后做一些事
$http.afterRequest = function() {
	wx.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
