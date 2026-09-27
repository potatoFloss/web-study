<template>
  <div class="article-page">
    <div
      class="article-item"
      v-for="item in articles"
      :key="item.id"
      @click="$router.push(`/detail/${item.id}`)"
    >
      <div class="head">
        <img
          src="http://teachoss.itheima.net/heimaQuestionMiniapp/%E5%AE%98%E6%96%B9%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F%402x.png"
          alt=""
        />
        <div class="con">
          <p class="title">{{ item.title }}</p>
          <p class="other">{{ item.source }} | {{ item.time }}</p>
        </div>
      </div>
      <div class="body">
        {{ item.content }}
      </div>
      <div class="foot">
        点赞 {{ item.likeCount }} | 浏览 {{ item.cmtcount }}
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 首页请求渲染
 * 1. 安装axios  npm i axios
 * 2. 看接口文档，确认请求方式、请求地址、请求参数
 * 3. created中发送请求、获取数据，存起来
 * 4. 页面动态渲染
 */
// 原请求地址（405）: https://mock.boxuegu.com/mock/3083/articles
// day03新闻列表请求地址: http://hmajax.itheima.net/api/news
// 请求方式: get

/**
 * 跳转详情页传参
 * 方案1. 查询参数传参(更适合多个参数)
 *        ?参数名=参数值 -> this.$route.query.参数名
 * 方案2. 动态路由传参(更适合单个参数)
 *        改造路由(/路径/:) -> /路径/参数 -> this.$route.params.参数名
 */

import axios from "axios";
export default {
  name: "ArticlePage",
  data() {
    return {
      articles: [],
    };
  },
  async created() {
    const res = await axios.get("http://hmajax.itheima.net/api/news");
    this.articles = res.data.data;
    // 因为原来接口的挂了，新接口有的属性没有，所以需要手动添加
    this.articles.map((item) => {
      item.likeCount = Math.floor(Math.random() * item.cmtcount);
      item.content =
        "虽然百度这几年发展势头落后于AT，甚至快被京东赶上了，毕竟瘦死的骆驼比马大，面试还是相当有难度和水准的。一面1.询问你的项目经验、学习经历、主修语言（照实答）2.解释ES6的暂时性死区（let 和 var的区别）3.箭头函数、闭包、异步（老生常谈，参见上文）4.高阶函数（呃……我真不太清楚这是啥，听起来挺像闭包的）5.求N的阶乘末尾有多少个0，在线码代码或讲思路（求因数，统计2、5、10的个数";
    });
    console.log(this.articles);
  },
};
</script>

<style lang="less" scoped>
.article-page {
  background: #f5f5f5;
}
.article-item {
  margin-bottom: 10px;
  background: #fff;
  padding: 10px 15px;
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 15px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>