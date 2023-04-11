<template>
	<view>
		<!-- 搜索组件 -->
		<view class="home-search-container">
			<Search></Search>
		</view>
		<!-- 轮播 -->
		<swiper class="swiper-home" indicator-dots="true" autoplay="true" interval="2000" circular="true"
			indicator-color="#000" indicator-active-color="#FF0000">
			<swiper-item v-for="(item,index) in bannerList" :key="index">
				<!-- <image :src="item.picUrl"></image> -->
				<navigator :url="'/subpkg/goods-detail/goods-detail?goodid='+item.id">
					<image :src="item.picUrl" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="cates">
			<view class="cate-item" v-for="(cateItem,cateIndex) in cateList" :key="cateIndex"
				@click="goToCate(cateItem)">
				<image :src="cateItem.catePic"></image>
				<text>{{cateItem.cateName}}</text>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-list">
			<view v-for="(floorItem,floorIndex) in floorList" :key="floorIndex" class="floor-item">
				<view class="floor-title">{{floorItem.floor_title}}</view>
				<view class="floor-con">
					<view v-for="(floorSubItem,floorSubIndex) in floorItem.floor_con" class="sub-item">
						<navigator :url="floorSubItem.url">
							<image :src="floorSubItem.imgPic" mode=""></image>
							<view class="proname">{{floorSubItem.name}}</view>
							<view class="proprice">{{floorSubItem.price}}</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [],
				cateList: [],
				floorList: [],
			};
		},
		methods: {
			// 获取Banner数据
			async getBannerList() {
				// 发送数据请求获取列表数据
				// console.log(123)
				const {
					data: res
				} = await uni.$http.get('/bannerlist')
				// 判断是否请求成功
				if (res.status === 200) {
					// 将响应数据存到bannerList
					this.bannerList = res.data.list
				}
			},
			// 获取分类数据
			async getCateList() {
				const res = await uni.$http.get('/cates')
				const {
					data: {
						cateList
					},
					status
				} = res.data
				if (status != 200) {
					return uni.showToast({
						title: '加载数据失败',
						duration: 1000,
						icon: 'none'
					})
				} else {
					this.cateList = cateList
				}
			},
			// 获取楼层数据
			async getFloorList() {
				const res = await uni.$http.get('/floors')
				const {
					data: {
						floorList
					},
					status
				} = res.data
				if (status != 200) {
					return uni.showToast({
						title: '加载数据失败',
						duration: 1000,
						icon: 'none'
					})
				} else {
					floorList.forEach((product) => {
						product.floor_con.forEach(subProduct => {
							subProduct.url = "/subpkg/goods-list/goods-list?name=" + subProduct.name
						})
					})
					this.floorList = floorList
				}
			},
			// 跳转到分类页面	
			goToCate: function(cateItem) {
				if (cateItem.cateName == "分类") {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 搜索框的事件
			// goToSearch: function() {
			// 	uni.navigateTo({
			// 		url: '../../subpkg/goods-search/goods-search'
			// 	})
			// }
		},
		onLoad() {
			// 调用获取数据方法
			this.getBannerList()
			this.getCateList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	.swiper-home {
		width: 100%;
		background-color: #E43D33;

		swiper-item {
			width: 100%;

			image {
				width: 100%;
				height: 300rpx;
			}
		}
	}

	.cates {
		width: 100%;
		height: 320rpx;
		border-bottom: 1rpx solid #c7c7c7;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;

		.cate-item {
			width: 20%;
			height: 150rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			image {
				width: 78rpx;
				height: 78rpx;
			}

			text {
				font-size: 26rpx;
			}
		}
	}

	.floor-list {
		width: 100%;

		.floor-item {
			width: 100%;
			height: 840rpx;
			background-color: #fff;

			.floor-title {
				height: 60rpx;
				line-height: 60rpx;
				font-weight: 900;
			}

			.floor-con {
				width: 100%;
				height: 400rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				align-items: center;

				.sub-item {
					width: 50%;
					height: 400rpx;
					display: flex;
					flex-wrap: wrap;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;

					image {
						width: 220rpx;
						height: 220rpx;
					}
				}
			}
		}
	}

	.home-search-container {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>