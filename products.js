import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.8/vue.esm-browser.min.js'

createApp({
  data() {
    return {
      url: `https://ec-course-api.hexschool.io/v2`,
      apiPath: 'sasimi',
      selectProduct: {},
      products: {}
    }
  },
  methods: {
    selectItem(product) {
      this.selectProduct = { ...product }
    },
    getTokenFromCookies() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)HexSchoolVueToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      axios.defaults.headers.common['Authorization'] = token;
    },
    check() { // 2. 驗證登入
      axios.post(`${this.url}/api/user/check`)
        .then(res => {
          //驗證成功
          this.getProducts()
        })
        .catch(err => {
          //驗證失敗
          Swal.fire({
            icon: "error",
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: "Got It!",
          }).then((result) => {
            location.replace('./') //按下 confirm button 後才進行跳轉
          });
          
        })
    },
    getProducts() { // 3. 取得管理員的產品列表
      axios.get(`${this.url}/api/${this.apiPath}/admin/products`)
      .then(res => {
        this.products = res.data.products;
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
  },
  mounted() {
    this.getTokenFromCookies()
    this.check()
  }
}).mount('#app')

