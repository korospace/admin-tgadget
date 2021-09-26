<template>
    <div
      id="dashboard-products"
      class="w-full flex pt-5 px-5">
        
        <PopUpDelete
          v-if="showPopUpDelete"
          :apiurl="apiurl"
          :targetdelete="targetDelete"
          @updatedata="updateDataProduct()"
          @popuphide="showPopUpDelete=false"
          @alert-on="$emit('alert-on',$event)"
          @expired-on="$emit('expired-on')"
          @loading-on="$emit('loading-on',$event)"
          @loading-msg="$emit('loading-msg',$event)"
          @show-successicon="$emit('show-successicon',$event)" />

        <div
          class="bg-tgadgety-500 relative w-full max-h-screen min-h-screen bg-tgadgety-500 pr-4 pl-4 rounded-sm overflow-auto"
          :class="{'animate-pulse opacity-70': allProducts.length==0,'shadow-card': allProducts.length>0,'flex flex-col justify-center items-center text-center':allProducts=='notfound'}">

            <div
              class="bg-tgadgety-500 z-10 top-0 left-0 right-0 flex justify-between sm-400:justify-start"
              :class="{'sticky pt-4 pb-8': allProducts!='notfound','absolute py-4 px-4': allProducts=='notfound',}">
                <input
                  v-if="allProducts.length != 0"
                  class="px-2 py-1 rounded-sm shadow text-tgadgety outline-none box-border w-5/6 sm-400:w-auto"
                  placeholder="search product"
                  @keyup="filterProducts($event.target.value)">
                <router-link 
                  v-if="allProducts.length != 0"
                  class="p-2 rounded-sm tracking-widest transition-all opacity-80 hover:opacity-100 hover:bg-tgadgety active:bg-tgadgety border border-white shadow ml-2"
                  to="/add-product">
                    <img :src="require('@/assets/img/plus.svg')" class="w-4">
                </router-link>
            </div>

            <h1 
              v-if="allProducts=='notfound'"
              class="text-4xl text-white opacity-80"
              style="font-family: 'Rc-bold';">
                product not found
            </h1>
              
            <div
              v-for="data of allProducts"
              :key="data.id"
              class="w-full flex flex-col sm:flex-row mb-4 rounded-md shadow-md overflow-x-auto"
              :class="{'hidden':allProducts=='notfound'}"
              style="background-color: rgba(255,255,255,0.49);">
                <div class="flex-1 flex flex-col sm-400:flex-row sm-400:pl-4 sm:pl-0  sm-400:pt-4 sm:pt-0">
                    <div
                      class="relative bg-white w-full sm-400:w-44 lg:w-56 rounded-tl-md rounded-tr-md sm-400:rounded-tr-none overflow-hidden">
                        <img 
                          :src="require('@/assets/img/bg-img-product.webp')"
                          class="w-full w-full h-full top-0 bottom-0">
                        <img
                          :src="data.img"
                          class="absolute w-full h-full top-0 bottom-0">
                    </div>
                    <div class="flex-1 sm:w-100 lg-930:flex-1 h-full pt-4 sm-400:pt-0 sm:py-4 px-0 px-4 sm-400:px-6">
                        <span class="bg-tgadgety block w-max text-xs text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-sm shadow-sm opacity-80">
                            {{(data.stock == 'yes') ? 'ready' : 'not ready'}}
                        </span>
                        <h1 
                          class="mt-2 text-xl lg:text-2xl text-tgadgety capitalize opacity-80" style="font-family: 'Rc-bold';display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">
                            {{data.name}}
                        </h1>
                        <h2 
                          class="mt-2 text-md lg:text-xl text-tgadgety opacity-80"
                          style="font-family: 'Quicksand-Regular';">
                            Rp. {{data.price}}
                        </h2>
                        <div class="block mt-2 text-tgadgety text-sm opacity-80 capitalize tracking-widest">
                            visitor:
                        </div>
                        <div class="w-full grid grid-cols-4 sm-400:grid-cols-2-max sm:grid-cols-4 gap-4 mt-2">
                            <div class="flex-1 flex items-center opacity-80">
                                <img class="w-4 xl-1144:w-6" :src="require('@/assets/img/tokopedia-y.svg')">
                                <small class="ml-3 text-xl xl-1144:text-3xl text-tgadgety">{{data.tokopedia}}</small>
                            </div>
                            <div class="flex-1 flex items-center opacity-80">
                                <img class="w-4 xl-1144:w-6" :src="require('@/assets/img/shopee-y.svg')">
                                <small class="ml-3 text-xl xl-1144:text-3xl text-tgadgety">{{data.shopee}}</small>
                            </div>
                            <div class="flex-1 flex items-center opacity-80">
                                <img class="w-4 xl-1144:w-6" :src="require('@/assets/img/lazada-y.svg')">
                                <small class="ml-3 text-xl xl-1144:text-3xl text-tgadgety">{{data.lazada}}</small>
                            </div>
                            <div class="flex-1 flex items-center opacity-80">
                                <img class="w-4 xl-1144:w-6" :src="require('@/assets/img/whatsapp-y.svg')">
                                <small class="ml-3 text-xl xl-1144:text-3xl text-tgadgety">{{data.whatsapp}}</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div 
                  class="w-full sm:w-60 xl-1144:w-80 h-full max-h-60 flex flex-col py-4 pr-4 pl-4 sm:pl-0" 
                  style="border-left: 0px solid rgba(241, 141, 67, 0.4)">
                    <div 
                      class="bg-tgadgety w-full flex-1 py-2 px-4 text-white rounded-sm overflow-y-auto overflow-x-hidden opacity-80"
                      style="max-height: 142px;">
                        <span 
                          v-html="data.deskripsi"
                          class="text-sm lg-930:text-base opacity-80"
                          style="font-family: 'sans';">

                        </span>
                    </div>

                    <div class="w-full flex mt-2">
                        <button 
                          class="flex-1 flex justify-center px-3 py-2 border border-tgadgety rounded-sm tracking-widest transition-all opacity-80 hover:opacity-100 mr-2" 
                          @click.prevent="funcShowPopUpDelete({
                            id: data.id,
                            name: 'product'
                          });">
                            <img class="w-5" :src="require('@/assets/img/garbage.svg')">
                        </button>
                        <router-link  
                          class="flex-1 flex justify-center px-3 py-2 border border-tgadgety rounded-sm tracking-widest transition-all text-white bg-tgadgety hover:bg-tgadgety-500 hover:border-tgadgety-500 opacity-80"
                          :to="{ path: '/update-product',query: { id: data.id }}" >
                            <img class="w-5" :src="require('@/assets/img/edit.svg')">
                        </router-link >
                    </div>
                </div>
            </div>
        </div>

    </div> 
</template>

<script>
import PopUpDelete from '@/components/PopUpDelete'

export default {
    props:['apiurl'],
    components: {
        PopUpDelete,
    },
    data(){
        return{
            allProducts     : [],
            allProducts2    : [],
            showPopUpDelete : false,
            targetDelete    : '',
            userdata        : JSON.parse(localStorage.getItem('userdata')),
        }
    },
    methods: {
        getAllProduct(){
            this.allProducts = [];

            this.axios
                .get(`${this.$props.apiurl}/get/products`, {
                    headers: {
                        'api-key': this.userdata.api_key,
                    }
                })
                .then((response) => {
                    if(response.status == 200){
                        this.updateDataProduct(response.data.data);
                    }
                })
                .catch((error) => {
                    // Product not found
                    if(error.response.status == 404){
                        this.allProducts   = "notfound";
                        this.$emit('totalproducts',0);
                        this.$emit('productsviewers','notfound');
                    }
                    // Server error
                    if(error.response.status == 500){
                        this.showAlert({
                            type: 'danger',
                            msg: '<b>Ups, server bussy!</b> Please refresh page.'
                        });
                    }
                })
        },
        updateDataProduct(data = null){
            if (data != null) {
                this.allProducts = data;
            } 
            else {
                this.allProducts = this.allProducts2.filter(e => e.id != this.targetDelete.id); 
                
                if(this.allProducts.length==0){
                    this.allProducts = "notfound";
                }
            }
            
            this.allProducts2 = this.allProducts;
            this.$emit('productsviewers',this.allProducts);
        },
        filterProducts(keyword){
            this.allProducts = this.allProducts2.filter(e => e.name.includes(keyword));
            
            if(this.allProducts.length==0){
                this.allProducts = "notfound";
            }
            if(keyword == ""){
                this.allProducts = this.allProducts2;
            }
        },
        funcShowPopUpDelete(data){
            this.showPopUpDelete = true;
            this.targetDelete    = data;
        }
    },
    mounted(){
        this.getAllProduct();
    },
}
</script>

<style scoped>
    ol{
        list-style-position: inside !important;
        list-style-type: lower-latin;
    }
</style>