<template>
	<view class="search-container">
		<view class="search-inner">
			<uni-icons type="search" size="20"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.search-container{
		width: 100%;
		height: 100rpx;
		background-color: #E43D33;
		.search-inner{
			width: 90%;
			height: 90rpx;
			background-color: #fff;
			border-radius: 40rpx;
			margin: 0 auto;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding-left: 10rpx;
		}
	}
</style>