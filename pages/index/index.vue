<template>
	<view class="content">
		
		
		<view class="">
			<u-button @click="getClick()" text="清清子的小蛋糕铺" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">
			</u-button>
			
		</view>
		<view style="margin-top: 50rpx;" v-show="showHi">
			<u-button   :text="title" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"  @click="showHi=false">
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		getMsg
	} from '../../api/user.js'
	export default {
		data() {
			return {
				title: '刘玉清你好呀',
				showHi:false,
			}
		},
		onLoad() {

		},
		mounted() {
			this.getData()
		},
		methods: {
			async getData(){
				var res = await getMsg()
				if(res){
					console.log(res)
				}else{
					console.log('请求失败')
				}
			},
			getClick(){
				console.log('getClick')
				this.showHi = true
				// this.getData()
			}
		}
	}
</script>

<style>
	
.content{
	
	padding: 50rpx;
}
	
</style>
