<template>
    <div class="ratings" v-el:rating-wrapper>
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="ratings && ratings.length">
            <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating)">
              <div class="avatar-wrapper">
                <img class="avater" width="28" height="28" :src="rating.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <div class="delivery">{{rating.deliveryTime}}分钟送达</div>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend">
                  <span :class="{'icon-thumb_up' :rating.rateType ===0,'icon-thumb_down' :rating.rateType ===1}"></span>
                  <span v-for="recommend in rating.recommend" class="item">
                  {{recommend}}
                </span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  import {formatDate} from 'common/js/date';
  const ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: 2,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        if (!this.ratingScroll) {
          this.ratingScroll = new BScroll(this.$els.ratingWrapper, {
            click: true
          });
        } else {
          this.ratingScroll.refresh();
        }
      },
      needShow(rating) {
        if (this.onlyContent && !rating.text) {
          return false;
        }
        if (this.selectType === 2) {
          return true;
        } else {
          return rating.rateType === this.selectType;
        }
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    events: {
      'ratingtype.select'(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        });
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        });
      }
    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    left: 0
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(7,17,27,0.1)
        text-align: center
        padding: 6px 0
        .score
          margin-bottom: 6px
          font-size: 24px
          color: rgb(255,153,0)
          line-height: 28px
        .title
          margin-bottom: 8px
          font-size: 12px
          color: rgb(7,17,27)
          line-height: 12px
        .rank
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 10px
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        .score-wrapper
          font-size: 0
          margin-bottom: 8px
          .title
            vertical-align: top
            display: inline-block
            font-size: 12px
            line-height: 18px
            color: rgb(7,17,27)
          .star
            vertical-align: top
            display: inline-block
            padding: 0 12px
          .score
            vertical-align: top
            font-size: 12px
            color: rgb(255,153,0)
            line-height: 18px
        .delivery-wrapper
          font-size: 0
          .title
            vertical-align: top
            display: inline-block
            font-size: 12px
            line-height: 18px
            color: rgb(7,17,27)
          .delivery
            padding-left: 12px
            font-size: 12px
            color: rgb(147,153,159)
            line-height: 18px

    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        position: relative
        border-1px(rgba(7,17,27,0.1))
        .avatar-wrapper
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          .avater
            border-radius: 50%
        .content
          flex: 1
          .name
            font-size: 10px
            color: rgb(7,17,27)
            line-height: 12px
            margin-bottom: 4px
          .star-wrapper
            font-size: 0
            margin-bottom: 6px
            .star
              display: inline-block
              vertical-align: top
            .delivery
              margin-left: 6px
              display: inline-block
              vertical-align: top
              font-size: 10px
              color: rgb(147,153,159)
              line-height: 12px
          .text
            font-size: 12px
            color: rgb(7,13,27)
            line-height: 18px
            margin-bottom: 8px
          .recommend
            font-size: 0px
            .icon-thumb_up
              display: inline-block
              font-size: 9px
              line-height: 16px
              margin-right: 8px
              color: rgb(0,160,220)
            .icon-thumb_down
              display: inline-block
              font-size: 9px
              line-height: 16px
              margin-right: 8px
              color: rgb(183,187,191)
            .item
              margin-bottom: 4px
              margin-right: 8px
              border: 1px solid rgba(7,17,27,0.1)
              padding: 0 6px
              display: inline-block
              font-size: 9px
              line-height: 16px
              color: rgb(147,153,159)
              border-radius: 2px

          .time
            position: absolute
            right: 0
            top: 18px
            font-size: 10px
            color: rgb(147,153,159)
            line-height: 12px
</style>
