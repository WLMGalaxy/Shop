<template>
	<view class="">
		<!-- 商品轮博图部分 -->
		<swiper class="good-container" indicator-dots=true autoplay="true" duration="2000" circular="true">
			<swiper-item v-for="(item,index) in goodInfo.pics" class="banner-item">
				<image :src="item.bigPic" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="good-info">
			<view>{{goodInfo.goods_name}}</view>
			<view class="price">¥{{goodInfo.goods_price}}</view>
			<view>{{goodInfo.goods_shopAddress}}</view>
			<view>联系客服</view>
		</view>
		<view class="good-attr">
			<view>商品详细图示区域</view>
			<image :src="goodInfo.goodAttr.pic1"></image>
			<image :src="goodInfo.goodAttr.pic2"></image>
			<image :src="goodInfo.goodAttr.pic3"></image>
			<image :src="goodInfo.goodAttr.pic4"></image>
			<image :src="goodInfo.goodAttr.pic5"></image>
		</view>
		<!-- 底部商品导航部分 -->
		<view class="good-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 定义商品详情信息对象
				goodInfo: {},
				// 商品导航部分
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		methods: {
			async goodsDetail(goodId) {
				const res = await uni.$http.get('/detail', {
					"goodId": goodId
				})
				const {
					data,
					status
				} = res.data
				if (status != 200) {
					return uni.showToast({
						title: '加载数据失败',
						duration: 1000,
						icon: 'none'
					})
				} else {
					this.goodInfo = data
				}
			},
			preview(index) {
				let arr = []
				this.goodInfo.pics.map(item => {
					arr.push(item.bigPic)
				})
				uni.previewImage({
					urls: arr,
					current: index
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: "/pages/shop/shop"
					})
				}
			},
		},
		onLoad() {
			this.goodsDetail()
		}
	}
</script>

<style lang="scss">
	.good-container {
		height: 600rpx;

		.banner-item {
			width: 100%;
			height: 600rpx;

			image {
				width: 100%;
				height: 600rpx;
			}
		}
	}

	.good-info {
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.price {
			color: #FF5A5F;
		}
	}

	.good-attr {
		image {
			width: 100%;
			// 取消图片底部的空白间隙
			display: block;
		}
	}

	.good-detail-container {
		// 设置底部的padding,避免压着页面
		padding-bottom: 100rpx;

		.good-nav {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999;
		}
	}
</style>