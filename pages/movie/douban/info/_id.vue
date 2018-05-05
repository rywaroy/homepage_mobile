<template>
  <div class="app-content">
    <div class="scroll single-box">
      <div class="single-title">{{info.title}}</div>
      <div class="movie-infos">地区：<span class="movie-infos-text" v-for="(item,index) in info.countries" :key="index">{{item}}</span>
      </div>
      <div class="movie-infos">时长：<span class="movie-infos-text" v-for="(item,index) in info.durations" :key="index">{{item}}</span>
      </div>
      <div class="movie-infos">类型：<span class="movie-infos-text" v-for="(item,index) in info.genres" :key="index">{{item}}</span>
      </div>
      <div class="movie-infos">语言：<span class="movie-infos-text" v-for="(item,index) in info.languages" :key="index">{{item}}</span>
      </div>
      <div class="movie-infos">豆瓣评分：{{info.rating.average}}</div>
      <div class="movie-infos">上映时间：{{info.pubdate}}</div>
      <div class="single-subtitle">剧情简介：</div>
      <div class="single-content">{{info.summary}}</div>
      <div class="single-subtitle">导演：</div>
      <div class="movie-actors">
        <div class="movie-people" v-for="(item,index) in info.directors" :key="index">
          <img :src="item.avatars.medium | getImgUrl" width="100%" alt="">
          <div class="movie-people-name">{{item.name}}</div>
          <div class="movie-people-name">{{item.name_en}}</div>
        </div>
      </div>
      <div class="single-subtitle">演员：</div>
      <div class="movie-actors">
        <div class="movie-people" v-for="(item,index) in info.casts" :key="index">
          <img :src="item.avatars.medium | getImgUrl" width="100%" alt="">
          <div class="movie-people-name">{{item.name}}</div>
          <div class="movie-people-name">{{item.name_en}}</div>
        </div>
      </div>
      <div class="single-subtitle">剧照：</div>
      <div class="movie-actors">
        <div class="movie-people" v-for="(item,index) in info.photos" :key="index">
          <img :src="item.image | getImgUrl" width="100%" alt="">
        </div>
      </div>
      <div class="comment-box">
        <div class="comment-box-title">精彩评论</div>
        <commentItem v-for="(item,index) in info.popular_comments" :key="index" :avatar="item.author.avatar"
                     :name="item.author.name" :time="item.created_at" :content="item.content"></commentItem>
      </div>
    </div>
  </div>
</template>
<style>
  .movie-people {
    width: 50%;
    margin-top: 5px;
    padding: 5px;
  }

  .movie-people-name {
    font-size: 12px;
    line-height: 24px;
    color: #333;
  }

  .movie-actors {
    display: flex;
    flex-wrap: wrap;
  }

  .movie-infos {
    font-size: 14px;
    line-height: 24px;
    color: #666;
  }

  .movie-infos-text {
    margin-right: 6px;
  }
</style>
<script>
import axiosPlus from '../../../../plugins/axios';
import commentItem from '../../../../components/CommentItem';

export default {
  async asyncData({ route, store }) {
    store.commit('movie/setTitle', '豆瓣电影');
    store.commit('movie/setBack', true);
    const info = await axiosPlus.axios.get('douban/info', { params: { id: route.params.id } });
    return {
      info: info.data.data,
    };
  },
  filters: {
    getImgUrl(url) { // 处理图片资源403
      return url.replace(/http\w{0,1}:\/\//g, 'https://images.weserv.nl/?url=');
    },
  },
  components: {
    commentItem,
  },
};
</script>
