<template>
    <form
      id="form-add-update-product"
      @submit.prevent="sendDataForm($event.target)"
      class="w-full h-32 mt-10 px-5 sm:px-10">
        
        <input type="hidden" name="product_id" :value="productid">
        
        <!-- img product -->
        <div
          class="form-group w-44 px-2 mb-6"
          style="font-family: 'Quicksand-Regular';">
            <img 
              :src="imgProduct" 
              class="w-full h-full rounded-sm"
              style="min-width: 160px;min-height: 160px;max-width: 160px;max-height: 160px;" >
            <input 
              @change="changePreview($event)"
              name="product_img" 
              type="file" 
              class="w-full mt-3 text-tgadgety opacity-80 text-sm">
        </div>

        <!-- product-name AND price -->
        <div
          class="form-group w-full flex flex-col sm:flex-row justify-around items-center mb-1"
          style="font-family: 'Quicksand-Regular';">
            <div
              class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                  for="product_name"
                  class="text-tgadgety capitalize opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">product name</label>
                <input
                  id="product_name"
                  type="text"
                  v-validate="'required|max:250'"
                  data-vv-as=" "
                  name="product_name"
                  v-model="product_name"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  class="h-5 flex items-end text-xs text-red-700">
                    {{isNameExist || errors.first('product_name')}}
                </span>
            </div>
            <div
              class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                  for="price"
                  class="text-tgadgety capitalize opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">price</label>
                <input
                  id="price"
                  type="number"
                  v-validate="'required|max:11|numeric'"
                  data-vv-as=" "
                  name="price"
                  v-model="price"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  class="h-5 flex items-end text-xs text-red-700">
                    {{errors.first('price')}}
                </span>
            </div>
        </div>

        <!-- link tokopedia AND shopee -->
        <div
          class="form-group w-full flex flex-col sm:flex-row justify-around items-center mb-1"
          style="font-family: 'Quicksand-Regular';">
            <div
              class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                  for="linktp"
                  class="text-tgadgety capitalize opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">tokopedia link</label>
                <input
                  id="linktp"
                  type="text"
                  v-validate="'required|max:200'"
                  data-vv-as=" "
                  name="linktp"
                  v-model="linktp"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  class="h-5 flex items-end text-xs text-red-700">
                    {{errors.first('linktp')}}
                </span>
            </div>
            <div
              class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                  for="linksp"
                  class="text-tgadgety capitalize opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">shopee link</label>
                <input
                  id="linksp"
                  type="text"
                  v-validate="'required|max:200'"
                  data-vv-as=" "
                  name="linksp"
                  v-model="linksp"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  class="h-5 flex items-end text-xs text-red-700">
                    {{errors.first('linksp')}}
                </span>
            </div>
        </div>

        <!-- link lazada AND whatsapp -->
        <div
          class="form-group w-full flex flex-col sm:flex-row justify-around items-center mb-1"
          style="font-family: 'Quicksand-Regular';">
            <div
              class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                  for="linklz"
                  class="text-tgadgety capitalize opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">lazada link</label>
                <input
                  id="linklz"
                  type="text"
                  v-validate="'required|max:200'"
                  data-vv-as=" "
                  name="linklz"
                  v-model="linklz"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  class="h-5 flex items-end text-xs text-red-700">
                    {{errors.first('linklz')}}
                </span>
            </div>
            <div
              class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                  for="linkwa"
                  class="text-tgadgety capitalize opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">whatsapp link</label>
                <input
                  id="linkwa"
                  type="text"
                  v-validate="'required|max:200'"
                  data-vv-as=" "
                  name="linkwa"
                  v-model="linkwa"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  class="h-5 flex items-end text-xs text-red-700">
                    {{errors.first('linkwa')}}
                </span>
            </div>
        </div>

        <!-- deskripsi AND categories -->
        <div
          class="form-group w-full flex flex-col sm:flex-row justify-around items-start mb-1"
          style="font-family: 'Quicksand-Regular';">
            <div
              class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                class="text-tgadgety capitalize opacity-80 text-sm italic"
                style="font-family: 'Quicksand-SemiBold';">deskription</label>
                <vue-editor
                  v-validate="'required|max:1000'"
                  data-vv-as=" "
                  name="deskripsi"
                  v-model="deskripsi" 
                  :editor-toolbar="customToolbar"
                  style="max-height: 16rem; overflow: auto;"
                  class="bg-tgadgety-500 rounded-md overflow-hidden border-none shadow-md" />
                <span
                  class="h-5 flex items-end text-xs text-red-700">
                    {{errors.first('deskripsi')}}
                </span>
            </div>
            <div
              class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                  for="kategori"
                  class="text-tgadgety capitalize opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">categories</label>
                <input
                  id="kategori"
                  type="text"
                  v-validate="'required|max:20'"
                  data-vv-as=" "
                  name="kategori"
                  placeholder="select in the box below"
                  v-model="kategori"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100"
                  readonly>
                <div
                  class="w-full mt-2 p-2 flex flex-col rounded-b-md bg-tgadgety"
                  style="height: 12.5rem;">
                    <form
                      @submit.prevent="addCategory()"
                      class="flex">
                        <input
                          id="add-categories"
                          type="text"
                          placeholder="add category"
                          autocomplete="off"
                          v-model="addCategoryValue"
                          @keyup="charFilter(20,$event)"
                          class="w-40 px-1.5 py-0.5 text-tgadgety rounded-sm outline-none shadow">
                        <button 
                          class="p-1 rounded-sm tracking-widest transition-all opacity-80 hover:opacity-100 hover:bg-tgadgety active:bg-tgadgety border border-white shadow ml-2"
                          :disabled="addCategoryValue == ''">
                            <img :src="require('@/assets/img/plus.svg')" class="w-4">
                        </button>
                    </form>
                    <div
                      class="flex-1 mt-4 overflow-auto">
                        <div
                          v-for="x of [1,2,3]"
                          :key="x.id"
                          class="w-full px-2 py-4 text-white border-b border-tgadgety-500 hover:bg-tgadgety-500 cursor-pointer"
                          :class="{'hidden':categories.length>0}">
                            <span class="block w-3/5 h-2 bg-white animate-pulse rounded-lg"></span>
                        </div>
                        <div
                          v-for="c of categories"
                          :key="c.id"
                          class="w-full p-2 flex justify-between text-white border-b border-tgadgety-500 hover:bg-tgadgety-500 cursor-pointer"
                          :class="{'hidden':categories=='notfound'}">
                            <div
                              @click="kategori = c.category_name;"
                              class="flex-1 flex items-center">
                                <span>{{c.category_name}}</span>
                                <transition name="bounce" appear>
                                <img
                                  v-if="kategori == c.category_name"
                                  :src="require('@/assets/img/check.svg')"
                                  class="w-4 p-1 ml-2 bg-white opacity-80 rounded-full" >
                                </transition>
                            </div>
                            <img
                              :src="require('@/assets/img/garbage.svg')"
                              class="w-7 p-1.5 bg-white opacity-80 hover:opacity-100 active:bg-tgadgety-500 rounded-sm cursor-pointer shadow-md" 
                              @click="deleteCategory(c);" >
                        </div>
                        <div
                          class="w-full h-full flex justify-center items-center text-white opacity-80"
                          :class="{'hidden':categories!='notfound'}"
                          style="font-family: 'Rc-bold';">
                            category not found
                        </div>
                    </div>
                </div>
                <span
                  class="h-5 flex items-end text-xs text-red-700">
                    {{errors.first('kategori')}}
                </span>
            </div>
        </div>

        <!-- keywords -->
        <div
          class="form-group w-full flex flex-col sm:flex-row justify-around items-start mb-1"
          style="font-family: 'Quicksand-Regular';">
            <div class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                  for="keyword"
                  class="text-tgadgety capitalize opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">keywords</label>
                <input
                  id="keyword"
                  type="text"
                  v-validate="'required|max:200'"
                  data-vv-as=" "
                  name="keyword"
                  v-model="keyword"
                  placeholder="keyword_1|keyword_2|keyword_3"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  class="h-5 flex items-end text-xs text-red-700">
                    {{errors.first('keyword')}}
                </span>
            </div>
            <div class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                  class="text-tgadgety capitalize opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">stock</label>
                <div 
                  class="w-16 h-8 mt-1 relative flex items-center rounded-full"
                  style="box-shadow: inset 0 0 4px 0px rgba(0, 0, 0, 0.4);">
                    <div 
                      class="w-8 h-8 rounded-full absolute flex justify-center items-center transition-all duration-500 cursor-pointer"
                      :class="{'bg-red-700 left-0':toggleChecked==false,'bg-green-700 right-0':toggleChecked==true}" 
                      @click="toggleChecked=!toggleChecked">
                        <input
                          type="text" 
                          name="stock"
                          :value="(toggleChecked) ? 'yes' : 'no'"
                          class="hidden">
                    </div>
                </div>
            </div>
        </div>
        <div class="px-2 pb-4">
            <button 
            class="w-full flex justify-center mt-8 px-3 py-2 rounded-md shadow-card tracking-widest transition-all text-white text-md sm-400:text-xl uppercase bg-tgadgety hover:bg-tgadgety-500"
            style="font-family: 'Quicksand-SemiBold';">
                submit
            </button>
        </div>
    </form>
</template>

<script>

export default {
  props:['apiurl','productid'],
  data() {
    return{
      imgProduct       : require('@/assets/img/bg-img-product.webp'),
      userdata         : JSON.parse(localStorage.getItem('userdata')),
      product_name     : '',
      price            : '',
      linktp           : '',
      linksp           : '',
      linklz           : '',
      linkwa           : '',
      deskripsi        : "",
      kategori         : '',
      keyword          : '',
      toggleChecked    : false,
      categories       : [],
      addCategoryValue : '',
      isNameExist      : "",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
      ]
    }
  },
  methods: {
    charFilter(max,event){
      event.target.value = event.target.value.slice(0,max);
    },
    changePreview(event){
      // If file is not image
      if(!/image/.test(event.target.files[0].type)){
        this.$emit('alert-on',{
          type: 'danger',
          msg: '<b>upload failed!</b> file is not image.'
        });
        event.target.value = "";
        return false;
      }
      // If file size more than 200kb
      else if(event.target.files[0].size > 200000){
        this.$emit('alert-on',{
          type: 'danger',
          msg: '<b>upload failed!</b> file more than 200kb.'
        });
        event.target.value = "";
        return false;
      }
      else{
        this.imgProduct = URL.createObjectURL(event.target.files[0]);
      }
    },
    getCategories(){
      this.categories = [];

      this.axios
        .get(`${this.$props.apiurl}/get/categories`, {
          headers: {
            'api-key': this.userdata.api_key,
          }
        })
        .then((response) => {
          if(response.status == 200){
            this.categories = response.data.data;
          }
        })
        .catch((error) => {
          // Product not found
          if(error.response.status == 404){
            this.categories = "notfound";
          }
          // Server error
          if(error.response.status == 500){
            this.$emit('alert-on',{
              type: 'danger',
              msg: '<b>Failed load categories!</b> Please refresh page.'
            });
          }
        })
    },
    addCategory(){
      let newCategory     = this.addCategoryValue.trim().toLowerCase();
      let formAddCategory = new FormData();
      formAddCategory.append('category_name',newCategory);

      // change string to array
      if (this.categories == 'notfound') {
        this.categories = [];
      }

      // if category is exist
      let isExist = this.categories.find(e => e.category_name == newCategory);
      if (isExist) {
        this.$emit('alert-on',{
          type:'danger',
          msg: `<b>add category failed!</b> '${newCategory}' is exist`
        });
        return 0;
      }

      this.categories.unshift({category_name:newCategory});
      this.addCategoryValue = '';

      this.axios
        .post(`${this.$props.apiurl}/add/category`,formAddCategory, {
          headers: {
            'api-key': this.userdata.api_key,
            "token"  : this.userdata.token,
          }
        })
        .then((response) => {
          if(response.status == 201){
            this.getCategories();
          }
        })
        .catch((error) => {
          // undo
          this.categories = this.categories.filter(e => e.category_name != newCategory);

          // show alert
          this.$emit('alert-on',{
            type:'danger',
            msg: '<b>add category failed!</b> Please try again.'
          });

          if(error.response.status == 401){
              if(error.response.data.message == 'expired token'){
                setTimeout(() => {
                  this.$emit('expired-on');
                }, 600);
              }
              if(error.response.data.message == 'Unauthorized'){
                setTimeout(() => {
                  localStorage.removeItem('userdata');
                  this.$router.push({name: 'Login'});
                }, 600);
              }
          }
        })
    },
    deleteCategory(data){

      let oldCategories = this.categories;
      this.categories   = this.categories.filter(e => e.category_name != data.category_name);

      if (this.categoryValue == data.category_name) {
        this.categoryValue = '';
      }
      if (this.categories.length == 0) {
        this.categories = 'notfound';
      }

      this.axios
        .delete(`${this.$props.apiurl}/delete/category?id=${data.id}`,{
          headers: {
            'api-key': this.userdata.api_key,
            "token"  : this.userdata.token,
          }
        })
        .then(() => {
          // do nothing
        })
        .catch((error) => {
          // undo
          this.categories = oldCategories;

          // show alert
          this.$emit('alert-on',{
            type:'danger',
            msg: '<b>delete category failed!</b> Please try again.'
          });

          if(error.response.status == 401){
            // Expired token & Unauthorized
            if(error.response.data.message == 'expired token'){
              setTimeout(() => {
                this.$emit('expired-on');
              }, 600);
            }
            if(error.response.data.message == 'Unauthorized'){
              setTimeout(() => {
                localStorage.removeItem('userdata');
                this.$router.push({name: 'Login'});
              }, 600);
            }
          }
        })
    },

    getDetailProduct(){
      this.$emit('loading-on',true);
      this.$emit('loading-msg',"getting data");

      this.axios
        .get(`${this.$props.apiurl}/get/products?id=${this.$props.productid}`, {
          headers: {
            'api-key': this.userdata.api_key,
          }
        })
        .then((response) => {
          this.$emit('loading-on',false);
          this.$emit('loading-msg',"");

          if(response.status == 200){
            this.product_name = response.data.data[0].name;
            this.price        = response.data.data[0].price;
            this.linktp       = response.data.data[0].linktp;
            this.linksp       = response.data.data[0].linksp;
            this.linklz       = response.data.data[0].linklz;
            this.linkwa       = response.data.data[0].linkwa;
            this.deskripsi    = response.data.data[0].deskripsi;
            this.kategori     = response.data.data[0].kategori;
            this.keyword      = response.data.data[0].keyword;
            this.toggleChecked= (response.data.data[0].stock == 'yes')?true:false;
            this.imgProduct   = response.data.data[0].img;
          }
        })
        .catch((error) => {
          this.$emit('loading-on',false);
          this.$emit('loading-msg',"");

          // Expired token AND Unauthorized
          if(error.response.status == 401){
            if(error.response.data.message == 'expired token'){
              this.$emit('expired-on');
            }
            if(error.response.data.message == 'Unauthorized'){
              localStorage.removeItem('userdata');
              this.$router.push({name: 'Login'});
            }
          }
          // Server error
          if(error.response.status == 500){
            this.$emit('alert-on',{
              type:'danger',
              msg: '<b>Ups, server error!</b> Please try again.'
            });
          }
        })
    },
    sendDataForm(form){
      this.$validator.validate().then(valid => {
        if (valid) {

          this.$emit('loading-on',true);
          this.$emit('loading-msg',"please wait!");
        
          let formProduct = new FormData(form)
          formProduct.set('deskripsi',this.deskripsi);

          this.axios
            .put(`${this.$props.apiurl}/update/product`,formProduct, {
              headers: {
                'api-key': this.userdata.api_key,
                "token"  : this.userdata.token,
              }
            })
            .then((response) => {
              if(response.status == 201){
                this.$emit('show-successicon',true);
                this.$emit('loading-msg',"success!");

                setTimeout(() => {
                    this.$emit('loading-on',false);
                    this.$emit('show-successicon',false);
                    this.$emit('loading-msg',false);

                    setTimeout(() => {
                      this.$router.push({name: 'Dashboard'});
                    }, 400);
                }, 2000);
              }
            })
            .catch((error) => {
              this.$emit('loading-on',false);

              if (error.response.status == 400) {
                this.isNameExist = error.response.data.message.product_name;
              }
              if(error.response.status == 401){
                  if(error.response.data.message == 'expired token'){
                    setTimeout(() => {
                      this.$emit('expired-on');
                    }, 600);
                  }
                  if(error.response.data.message == 'Unauthorized'){
                    setTimeout(() => {
                      localStorage.removeItem('userdata');
                      this.$router.push({name: 'Login'});
                    }, 600);
                  }
              }
              if (error.response.status == 500) {
                this.$emit('alert-on',{
                  type:'danger',
                  msg: '<b>Ups, something wrong</b> Please try again.'
                });
              }
            })
        }
      });
    }
  },
  mounted(){
    this.getDetailProduct();
    this.getCategories();
  },
}
</script>

<style scoped>
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgba(255, 255, 255, 0.4); /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.4);
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: rgba(255, 255, 255, 0.4);
}

#add-categories::placeholder { 
  color: rgba(237, 125, 44, 0.4); /* Firefox */
}


.bounce-enter-active{
  animation: bounce .3s;
}
.bounce-leave-active{
  animation: bounce .2s reverse;
}
@keyframes bounce {
  0% {
    opacity: 0;
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

</style>