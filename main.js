// import vueResource from 'vue-resource'
// Vue.use(vueResource)
// Vue.use(require('vue-moment'));

var mainapp = new Vue({
  el: '#main-app',
  data:{
    blogs: [],
    loading: true,
    lboard_loading: false,
    load_error: false,
    leaderboard: [],
    blog_by_id: [],
    token: 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im5vYmluOTdAZ21haWwuY29tIiwidXNlcl9pZCI6IjA1YzU5MmZjLTQzNWEtNGZiNS1hYzdiLWM0OTdiMDY1ZmQ5OCIsImV4cCI6MTU2OTg2OTIzMywiZW1haWwiOiJub2Jpbjk3QGdtYWlsLmNvbSJ9.l9qd8UknYxz9OSF7d_GmWZh5YRk8cCfnweYbSpNC-NE',
    newBlog: {'title': null, 'text': null}
  },
  mounted: function(){
    this.get_all_blogs();
    this.get_leaderboard();
  },
  methods:{
    get_all_blogs: function(){
      this.loading = true;
      this.$http.get('http://localhost:8000/api/v1/share/blogs/', {
        headers: {
          'Authorization': this.token
        }
      })
      .then((response) => {
        this.blogs = response.data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.load_error = true;
        console.log(err);
      })
    },
    get_blog : function(id){
      console.log(id);
      this.loading = true;
      this.$http.get(('http://localhost:8000/api/v1/share/blogs/'+ id + '/'), {
        headers: {
          'Authorization': this.token
        }
      })
      .then((response) => {
        this.upvote = response.status;
        this.loading = false;
        this.get_all_blogs();
      })
      .catch((err) => {
        this.loading = false;
        console.log("some error");
        console.log(err);
      })
    },
    up_vote : function(id){
      this.$http.get(('http://localhost:8000/api/v1/share/blogs/'+ id + '/upvote/'), {
        headers: {
          'Authorization': this.token
        }
      })
      .then((response) => {
        console.log(this.blog_by_id)
        this.loading = false;
        this.get_all_blogs();
        this.get_leaderboard();
      })
      .catch((err) => {
        this.loading = false;
        console.log("some error");
        console.log(err);
      })
    },
    get_leaderboard: function(){
      this.lboard_loading = true;
      this.$http.get('http://localhost:8000/api/v1/share/blogs/leaderboard/', {
        headers: {
          'Authorization': this.token
        }
      })
      .then((response) => {
        this.leaderboard = response.data;
        // console.log(this.leaderboard)
        this.lboard_loading = false;
      })
      .catch((err) => {
        this.lboard_loading = false;
        this.load_error = true;
        console.log(err);
      })
    },
    post_blog: function(){
      this.loading = true;
      this.$http.post('http://localhost:8000/api/v1/share/blogs/', this.newBlog, {
        headers: {
          'Authorization': this.token
          }
        })
      .then((response) => {
        // this.leaderboard = response.data;
        console.log(response.data)
        this.loading = false;
        console.log('going to run');
        this.get_all_blogs();
        this.get_leaderboard();
        $('#myModal').modal('hide');
        console.log('ran');
      })
      .catch((err) => {
        this.loading = false;
        this.load_error = true;
        console.log(err);
      })
    }
  }
})

// var leaderboard = new Vue({
//   el:"#leaderboard",
//   data:{
//     leaderboard: [],
//     load_error: false,
//     loading: false,
//     token:'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmVjZGNlNWEtNzhiYy00NmViLTk4ZmMtNzUyMTRiNjhkYzA3IiwiZXhwIjoxNTY5Njk0NTM2LCJlbWFpbCI6Im5vYmluOTdAZ21haWwuY29tIiwidXNlcm5hbWUiOiJub2Jpbjk3QGdtYWlsLmNvbSJ9.ZJuLTZfYi5RXy2xt_DlnkM-6bSlrtNjgzEt2Df6Isf0'
//   },
//   mounted: function() {
//     this.get_leaderboard();
//   },
//   methods:{
//     get_leaderboard: function(){
//       this.loading = true;
//       this.$http.get('http://localhost:8000/api/v1/share/blogs/leaderboard/', {
//         headers: {
//           'Authorization': this.token
//         }
//       })
//       .then((response) => {
//         this.leaderboard = response.data;
//         this.loading = false;
//       })
//       .catch((err) => {
//         this.loading = false;
//         this.load_error = true;
//         console.log(err);
//       })
//     }
//   }
// })
