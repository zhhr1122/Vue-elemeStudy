<template>
    <div class="seller">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc border-1px">
            <star :size="36" :score="seller.score"></star>
            <div class="text">({{seller.ratingCount}})</div>
            <div class="text">月售{{seller.sellCount}}单</div>
          </div>
          <ul class="remark">
            <li class="block">
              <h2 class="title-1">起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2 class="title-1">商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2 class="title-1">平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
          <div class="favorite">
            <span class="icon-favorite"></span>
            <span class="text">收藏</span>
          </div>
        </div>
        <split></split>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .seller
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    left: 0
    overflow: hidden
    .seller-content
      .overview
        position: relative
        padding: 18px
        .title
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
          margin-bottom: 8px
        .desc
          padding-bottom: 18px
          font-size: 0px
          border-1px(rgba(7, 17, 27, 0.1))
          .star
            vertical-align: top
            display: inline-block
            margin-right: 8px
          .text
            vertical-align: top
            margin-right: 12px
            font-size: 10px
            line-height: 18px
            color: rgb(75,85,93)
            display: inline-block
        .remark
          display: flex
          font-size: 0
          padding-top: 18px
          .block
            flex: 1
            display: inline-block
            border-right: 1px solid rgba(7,17,27,0.1)
            text-align: center
          .title-1
            font-size: 10px
            color: rgb(147,153,159)
            margin-bottom: 4px
            line-height: 10px
          .content
            line-height: 24px
            font-size: 10px
            color: rgb(7,17,27)
            .stress
              font-size: 24px
        .favorite
          width: 50px
          position: absolute
          right: 11px
          top: 18px
          text-align: center
          .icon-favorite
            margin-bottom: 4px
            display: block
            font-size: 24px
            color: rgb(240,20,20)
            line-height: 24px
            width: 50px
          .text
            line-height: 10px
            font-size: 10px
            color: rgb(77,85,93)


</style>
