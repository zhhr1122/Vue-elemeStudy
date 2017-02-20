<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 只有当vue和v-if,v-show,v-for使用时，才可使用动画transition
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {

    },
    methods: {
      addCart(event) {
        if (!event._constructed) { // 防止两次点击情况发生
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
          // this.food.count = 1;通过Vue.set 来设置一开始没有的字段，不能直接 = 1，否则检测不到
        } else {
          this.food.count++;
        }
        this.$dispatch('cart.add', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) { // 防止两次点击情况发生
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3d(0, 0, 0)// 开启硬件加速，让动画流畅
        .inner
          display: inline-block
          font-size: 24px
          line-height: 24px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter, &.move-leave
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      font-size: 10px
      color: rgb(143, 153, 159)
      line-height: 24px
      width: 12px
      padding-top: 6px
      text-align: center
    .cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)

</style>
