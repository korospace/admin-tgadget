<template>
    <div
      id="dashboard-products"
      class="w-full flex pt-5 px-5">

        <div
          class="bg-tgadgety-500 relative w-full max-h-screen min-h-screen bg-tgadgety-500 pr-4 pl-4 rounded-sm overflow-auto"
          :class="{'animate-pulse opacity-70': products.length==0,'shadow-card': products.length>0,'flex flex-col justify-center items-center text-center':products=='notfound'}">

            <div
              class="bg-tgadgety-500 z-10 top-0 left-0 right-0 flex justify-between sm-400:justify-start"
              :class="{'sticky pt-4 pb-8': products!='notfound','absolute py-4 px-4': products=='notfound',}">
                <input
                  class="px-2 py-1 rounded-sm shadow text-tgadgety outline-none box-border w-5/6 sm-400:w-auto"
                  placeholder="search product"
                  @keyup="searchProduct($event)">
                <router-link 
                class="p-2 rounded-sm tracking-widest transition-all opacity-80 hover:opacity-100 hover:bg-tgadgety active:bg-tgadgety border border-white shadow ml-2"
                to="">
                    <img :src="require('@/assets/img/plus.svg')" class="w-4">
                </router-link>
            </div>

            <h1 
              v-if="products=='notfound'"
              class="notfound text-4xl text-white opacity-80">
                product not found
            </h1>
              
            <div
              v-for="data of products"
              :key="data.id"
              class="w-full flex flex-col sm:flex-row mb-4 rounded-md shadow-md overflow-x-auto"
              :class="{'hidden':products=='notfound'}"
              style="background-color: rgba(255,255,255,0.49);">
                <div class="flex-1 flex flex-col sm-400:flex-row sm-400:pl-4 sm:pl-0  sm-400:pt-4 sm:pt-0">
                    <img
                      :src="data.img"
                      class="bg-white w-full sm-400:w-44 lg:w-52 rounded-tl-md rounded-tr-md sm-400:rounded-tr-none">
                    <div class="flex-1 sm:w-100 lg-930:flex-1 h-full pt-4 sm-400:pt-0 sm:py-4 px-0 px-4 sm-400:px-6">
                        <span class="bg-tgadgety block w-max text-xs text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-sm shadow-sm opacity-80">
                            {{(data.stock == 1) ? 'ready' : 'not ready'}}
                        </span>
                        <h1 class="name mt-2 text-xl lg:text-2xl text-tgadgety capitalize opacity-80" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">
                            {{data.name}}
                        </h1>
                        <h2 class="price mt-2 text-md lg:text-xl text-tgadgety opacity-80">
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

                <div class="w-full sm:w-60 xl-1144:w-80 h-full max-h-60 flex flex-col py-4 pr-4 pl-4 sm:pl-0" style="border-left: 0px solid rgba(241, 141, 67, 0.4)">
                    <div class="bg-tgadgety w-full flex-1 py-2 px-4 text-white rounded-sm overflow-y-auto overflow-x-hidden opacity-80">
                        <span class="deskripsi text-sm lg-930:text-base opacity-80">
                            {{data.deskripsi}}
                        </span>
                    </div>

                    <div class="w-full flex mt-2">
                        <button 
                          class="flex-1 flex justify-center px-3 py-2 border border-tgadgety rounded-sm tracking-widest transition-all opacity-80 hover:opacity-100 mr-2" 
                          @click.prevent="showPopUpDelete({
                            id: data.id,
                            name: 'product'
                          });">
                            <img class="w-5" :src="require('@/assets/img/garbage.svg')">
                        </button>
                        <button 
                        class="flex-1 flex justify-center px-3 py-2 border border-tgadgety rounded-sm tracking-widest transition-all text-white bg-tgadgety hover:bg-tgadgety-500 hover:border-tgadgety-500 opacity-80">
                            <img class="w-5" :src="require('@/assets/img/edit.svg')">
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div> 
</template>

<script>
export default {
    props: ['products'],
    components: {
    },
    methods: {
        searchProduct(event){
            this.$emit('search-product',event.target.value);
        },
        showPopUpDelete(data){
            this.$emit('showpopup');
            this.$emit('changetargetdelete',data);
        }
    },
}
</script>

<style scoped>
    h1.name,h1.notfound{
        font-family: 'Rc-bold';
        /* color: rgba(241, 141, 67); */
    }
    h2.price,.deskripsi{
        font-family: 'Quicksand-Regular';
    }
    h3{
        font-family: 'Quicksand-Medium';
    }
</style>