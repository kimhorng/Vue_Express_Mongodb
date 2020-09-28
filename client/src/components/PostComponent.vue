<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <form v-if="!loading" class="form" @submit.prevent="createPost" style="position: inline">
            <input 
                  type="text" 
                  id="create-post" 
                  placeholder="Create Task.." 
                  v-model="task" 
                  :class="[errors.task ? 'invalid' : 'validate']"
            >
            <span class="helper-text" data-error="Task must not be empty"></span>
            <button type="submit">Post</button>
      </form>
      <div class="progress" v-else-if="loading">
            <div class="indeterminate"></div>
      </div>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="posts_container">
      <div class="post"
        v-for="(mytask, index) in mytasks"
        v-bind:item="mytask"
        v-bind:index="index"
        v-bind:key="mytask._id"
        v-on:dblclick="deletePost(mytask._id)"
      >
        {{`${mytask.createAt.getDate()}/${mytask.createAt.getMonth()}/${mytask.createAt.getFullYear()}`}}
        <p class="task">{{ mytask.task }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService'
export default {
  name: 'PostComponent',
  data (){
      return{
        loading: false,
        mytasks: [],
        error: '',
        task: '',
        errors:{}
      }
  },
  async created(){
    try{
      this.mytasks = await PostService.getPosts();
    } catch (err){
      this.error = err.message;
    }

  },
  methods: {
    async createPost(){
       if(!this.validForm()){
        this.loading - false;
        return;
      }
      this.loading = true;
      await PostService.insertPost(this.task);
      this.mytasks = await PostService.getPosts()
      this.task="";
      this.loading = false;
    },
    async deletePost(id){
      await PostService.deletePost(id);
      this.mytasks = await PostService.getPosts()
    },
    validForm(){
          this.errors ={};
          if(this.task.trim() === ""){
                this.errors.task ="Task"
          }
          if(Object.keys(this.errors).length > 0){
            return false;
          }else return true;
    }
    
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.container{
    max-width: 800px;
    margin: 0 auto;
  }

  p.error{
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }
  div.post{
    position: relative;
    border: 1px solid #5bd658;
    background-color: #bcffb8;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;
  }
  div.created_at{
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 15px 5px 15px;
    background-color: darkgreen;
    color: white;
    font-size: 13px;
  }
  p.task{
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
  }
</style>
