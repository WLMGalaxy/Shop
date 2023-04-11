<template>

	<view class="search-container">
		<uni-search-bar @input="input" :radius="40" cancelButton="none"></uni-search-bar>
		<!-- 显示搜索列表 -->
		<view class="search-list" v-if="searchList.length!=0">
			<view class="search-item" v-for="(item,index) in searchList" :key="index" @click="goToDetail(index)">
				{{item.word}}
			</view>
		</view>
		<!-- 显示搜索历史 -->
		<view class="history-container" v-else-if="historyList.length!=0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-content">
				<view class="history-item" v-for="(historyItem,historyIndex) in historyList" :key="historyIndex"
					@click="goToGoods(historyItem)">{{historyItem}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {
				time: null,
				keyword: '',
				searchList: [],
				historyList: [

				]
			};
		},
		methods: {
			searhHandle() {
				this.$emit('click')
			},
			// 延迟500毫秒
			input(e) {
				// console.log(e)
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyword = e
					// console.log(e)
					this.getSearchContent()
				}, 500)
			},
			async getSearchContent() {
				if (this.keyword.length === 0) {
					this.searchList = []
					return
				} else {
					const {
						data: res
					} = await uni.$http.get('/search')
					if (res.status !== 200) {
						console.log('获取数据失败')
					} else {
						this.searchList = res.data
						this.saveHistory()
					}
				}
			},
			// 把用户输入的数组存储到本地存储中才方便持久保存
			saveHistory() {
				let index = this.searchList.findIndex(item => {
					return item === this.keyword
				})
				if (index == -1) {
					this.historyList.unshift(this.keyword)
					// 把历史记录数组存储到本地存储
					uni.setStorageSync('kw', JSON.stringify(this.historyList))
				}
			},
			// 跳转详情页面
			goToDetail(index) {
				uni.navigateTo({
					url: '/subpkg/goods-detail/goods-detail?goodId=' + index
				})
			},
			// 清除历史记录
			clearHistory() {
				this.historyList = []
				uni.setStorageSync('kw', [])
			},
			// 点击历史记录跳转商品详情
			goToGoods(item) {
				uni.navigateTo({
					url: '/subpkg/goods-list/goods-list?query=' + item
				})
			}
		},
		onLoad() {
			// 页面加载的时候读取存储的历史记录
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		}
	}
</script>

<style lang="scss">
	.search-container {
		// width: 100%;
		// height: 100rpx;
		// background-color: #e43d33;
		// .search-inner{
		// 	width: 90%;
		// 	height: 80rpx;
		// 	background-color: #fff;
		// 	border-radius: 40rpx;
		// 	margin:0 auto;
		// 	display: flex;
		// 	justify-content: flex-start;
		// 	align-items: center;
		// 	padding-left: 10rpx;
		// }
		height: 100rpx;
		background-color: #E43D33;
		position: sticky;
		top: 0;
		z-index: 999;

		.search-list {
			width: 100%;
			background-color: #fff;
			// border-bottom:1rpx solid #C0C4CC;
			// border-top:1rpx solid #C0C4CC;
			margin-top: -12rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-content: center;

			.search-item {
				// width:100rpx;
				height: 50rpx;
				background-color: #F0F0F0;
				border-radius: 20rpx;
				text-align: center;
				line-height: 50rpx;
				margin: 8rpx;
			}

		}

		.history-container {
			margin-top: -12rpx;
			// margin-top:20rpx;
			width: 100%;
			padding: 0 10rpx;
			box-sizing: border-box;
			background-color: #fff;

			.history-title {
				width: 100%;
				height: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.history-content {
				width: 100%;

				// border-bottom:1rpx solid #C0C4CC;
				// border-top:1rpx solid #C0C4CC;
				margin-top: 10rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-content: center;

				.history-item {
					width: 100rpx;
					height: 50rpx;
					background-color: #F0F0F0;
					border-radius: 20rpx;
					text-align: center;
					line-height: 50rpx;
					margin: 8rpx;
				}
			}
		}
	}
</style>