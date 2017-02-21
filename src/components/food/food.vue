<template>
  <div v-show="isShow" class="food" transition="move">
    <div class="icon">
      <img :src="food.image" width="100%" height="375">
    </div>
    <div class="content">
      <div class="name">{{food.name}}</div>
      <div class="extra">
        <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
      </div>
      <div class="price-add">
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  export default {
    props: {
      food: {
        type: Object
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    background: #fff
    width: 100%
    transition: all 0.5s
    &.move-transition
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      transform: translate3d(100%, 0, 0)
</style>
