// import vueResource from 'vue-resource'
// Vue.use(vueResource)
// Vue.use(require('vue-moment'));

var main = new Vue({
  el: '#main',
  data:{
    blogs: [],
    loading: false,
    blog_by_id: []
  },
  mounted: function(){
    this.get_all_blogs();
  },
  methods:{
    get_all_blogs: function(){
      this.loading = true;
      this.$http.get('http://localhost:8000/api/v1/share/blogs/', {
        headers: {
          'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOGNjZGFhZWQtNWM5Yy00YmNmLTg4MDMtNmU4YjliM2EwOWRhIiwidXNlcm5hbWUiOiJub2JpbmpAcWJ1cnN0LmNvbSIsImV4cCI6MTU2OTU5Mjk3MiwiZW1haWwiOiJub2JpbmpAcWJ1cnN0LmNvbSJ9.rNYYARF2Iyca9Awt16y3vhP4GMhByKHt7RhbKoGXF0w'
        }
      })
      .then((response) => {
        this.blogs = response.data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      })
    },
    get_blog : function(id){
      console.log(id);
      this.loading = true;
      this.$http.get(('http://localhost:8000/api/v1/share/blogs/'+ id + '/'), {
        headers: {
          'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOGNjZGFhZWQtNWM5Yy00YmNmLTg4MDMtNmU4YjliM2EwOWRhIiwidXNlcm5hbWUiOiJub2JpbmpAcWJ1cnN0LmNvbSIsImV4cCI6MTU2OTU5Mjk3MiwiZW1haWwiOiJub2JpbmpAcWJ1cnN0LmNvbSJ9.rNYYARF2Iyca9Awt16y3vhP4GMhByKHt7RhbKoGXF0w'
        }
      })
      .then((response) => {
        this.blog_by_id = response.data;
        console.log(this.blog_by_id)
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log("some error");
        console.log(err);
      })
    }
  },
  computed: {
      rows() {
        return this.blogs.length
      }
    }
})
//
