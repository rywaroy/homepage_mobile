<template>
  <div class="app-content">
    <div class="scroll single-box">
      <div class="single-title">{{title}}</div>
      <div v-if="$route.params.type === '3'">
        <div class="single-author">{{asker}}</div>
        <div class="single-content" v-html="askContent"></div>
        <div class="single-author">{{answerer}}</div>
        <div class="single-content" v-html="content"></div>
      </div>
      <div v-else>
        <div class="single-author">{{author}}</div>
        <div class="single-content" v-html="content"></div>
      </div>

    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  async asyncData({ route, store }) {
    store.commit('magazine/setBack', true);
    store.commit('magazine/setTitle', 'ONE · 一个');
    let res = null;
    let data = null;
    switch (route.params.type) {
      case '1':
        // 文章获取详情
        res = await axios.get(`http://v3.wufazhuce.com:8000/api/essay/${route.params.id}?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`);
        data = res.data.data;
        return {
          title: data.hp_title,
          author: data.author[0].user_name,
          content: data.hp_content,
        };
        break;
      case '2':
        // 获取连载详情
        res = await axios.get(`http://v3.wufazhuce.com:8000/api/serialcontent/${route.params.id}?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
        data = res.data.data;
        return {
          title: data.title,
          author: data.author.user_name,
          content: data.content,
        }
        break
      case '3':
        // 获取问答详情
        res = await axios.get(`http://v3.wufazhuce.com:8000/api/question/${route.params.id}?channel=wdj&source=channel_reading&source_id=9254&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`);
        data = res.data.data;
        return {
          title: data.question_title,
          content: data.answer_content,
          asker: data.asker.user_name,
          askContent: data.question_content,
          answerer: data.answerer.user_name,
        };
        break;
      case '4':
        // 获取音乐详情
        res = await axios.get(`http://v3.wufazhuce.com:8000/api/music/detail/${route.params.id}?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
        data = res.data.data;
        return {
          title: data.story_title,
          author: data.author_list[0].user_name,
          content: data.story,
        };
        break;
      case '5':
        // 获取影视详情
        res = await axios.get(`http://v3.wufazhuce.com:8000/api/movie/${route.params.id}/story/1/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
        data = res.data.data.data[0];
        return {
          title: data.title,
          author: data.author_list[0].user_name,
          content: data.content,
        }
        break;
      default:
        return null;
    }
  },
}
</script>
