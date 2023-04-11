<template>
	<!-- 分类页面 -->
	<view>
		<view>
			<Search></Search>
		</view>
		<view class="cate-container">
			<!-- 左侧导航 -->
			<scorll-view scroll-y :style="{height:h+'px'}" class="cate-left">
				<block v-for="(cateItem,i) in cateList" :key="i">
					<view :class="['cate-item-left',i===active?'active':'']" @click="changeNav(i)">{{cateItem.cateName}}
					</view>
				</block>
			</scorll-view>
			<!-- 右侧商品 -->
			<scorll-view scroll-y :style="{height:h+'px'}" class="cate-right">
				<view class="pro-content" v-for="(goodItem,goodIndex) in goodsList" :key="goodIndex">
					<image src="pro-pic" :src="goodItem.picUrl" class="pro-pic"></image>
					<view class="pro-right">
						<view class="pro-name">{{goodIndex.pname}}</view>
						<view class="pro-price">价格：{{goodItem.price}}</view>
					</view>
				</view>
			</scorll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				h: 0,
				cateList: [],
				active: 0,
				goodsList: []
			};
		},
		methods: {
			// 获取商品分类信息
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
					// 获取右侧的数据并给goodsList赋值
					this.goodsList = cateList[0].children
				}
			},
			// 切换导航的处理事件
			changeNav: function(i) {
				this.active = i
				// 点击左侧分类切换的时候把当前项的分类下面的所有商品数据赋值
				this.goodsList = this.cateList[i].children
			},
			// 搜索框的事件
			// goTosearch:function(){
			// 	uni.navigateTo({
			// 		url:'../../subpkg/goods-search/goods-search'
			// 	})
			// }
		},
		onLoad: function() {
			const systemInfo = uni.getSystemInfoSync() // 获取设备相关的信息
			const systemHight = systemInfo.windowHeight // 获取设备的页面高度
			this.h = systemHight - 100
			// 获取商品分类信息
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	.cate-container {
		width: 100%;
		height: 600rpx;
		display: flex;

		.cate-left {
			width: 100px;
		}
	}

	.cate-item-left {
		height: 87rpx;
		line-height: 87rpx;
		padding-left: 12rpx;
		background-color: #f7f7f7;

		&.active {
			background-color: #fff;
			position: relative;

			&::before {
				content: '';
				display: block;
				width: 3px;
				height: 40rpx;
				background-color: #FF0000;
				position: absolute;
				top: 24rpx;
				left: 0;
			}
		}
	}

	.cate-right {
		.pro-content {
			width: 100%;
			height: 260rpx;
			border-bottom: 1rpx solid #f0f0f0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.pro-pic {
				width: 200rpx;
				height: 200rpx;
			}

			.pro-right {
				flex: 1;
				padding-left: 20rpx;
			}
		}
	}
</style>