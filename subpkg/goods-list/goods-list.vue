<template>
	<view>
		<view class="goods-list" @click="getGoodsList(goodItem)">
			<view class="goods-item" v-for="(goodItem,goodIndex) in goodsList" :key="goodIndex"
				@click="goToDetail(goodItem)">
				<image class="goods-pic" mode="" :src="goodItem.goodPic"></image>
				<view class="goods-info">
					<view class="">{{goodItem.goodsName}}</view>
					<view class="">{{goodItem.price|handlePrice}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryInfo: {
					// 搜索关键词
					query: '',
					// 商品所属分类
					cname: '',
					// 当前的页码
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				// 商品数组
				goodsList: [],
				// 定义节流阀
				isLoading: false
			};
		},
		onLoad: function(options) {
			this.queryInfo.query = options.query || ''
			this.queryInfo.cname = options.cname || ''
			// 获取接口并且给商品数组赋值
			this.getGoodsList()
		},
		// 定义处理商品价格的过滤器
		filters: {
			handlePrice: function(num) {
				return '¥' + num.toFixed(1)
			}
		},
		methods: {
			async getGoodsList() {
				// 请求前打开节流阀
				this.isLoading = true
				const res = await uni.$http.get('/goodslist', this.queryInfo)
				const {
					data,
					status
				} = res.data
				// 请求结束后关闭节流阀
				this.isLoading = false
				if (status != 200) {
					return uni.showToast({
						title: '加载数据失败',
						duration: 1000,
						icon: 'none'
					})
				} else {
					// this.goodsList=data 原来没有添加上拉加载更多的写法
					this.goodsList = [...this.goodsList, ...data]
				}
			},

			// 跳转到商品详情页面
			goToDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods-detail/goods-detail?goodId=' + item.goodsId
				})
			}
		},

		// 添加上拉触底事件
		onReachBottom: function() {
			// 上拉触底事件前先判断是否开着节流阀，开着代表正在请求数据，return关掉
			if (this.isLoading == true) {
				return
			}
			this.queryInfo.pagenum++; //让页码增加
			this.getGoodsList();
		}
	}
</script>

<style lang="scss">
	.goods-list {
		.goods-item {
			width: 100%;
			height: 220rpx;
			margin-bottom: 10rpx;
			display: flex;
			border-bottom: 1px solid #f0f0f0;

			.goods-pic {
				display: block;
				width: 220rpx;
				height: 220rpx;
				margin-right: 10rpx;
			}

			.goods-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.price {
					color: #FF5A5F;
				}
			}
		}
	}
</style>