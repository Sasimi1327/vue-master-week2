import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.8/vue.esm-browser.min.js'

const app = createApp({
  data() {
    return {
      url: `https://ec-course-api.hexschool.io/v2`,
      user: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    signin() { // 1. 登入
      axios.post(`${this.url}/admin/signin`, this.user)
        .then(res => {
          const { token, expired } = res.data;
          document.cookie = `HexSchoolVueToken=${token}; expires=${new Date(expired)};`;
          location.replace('./products.html')
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: "OK",
          });
        })

    }
  }
})
app.mount('#app')

