<template>
    <form
      id="form-add-update-product"
      @submit.prevent="sendDataForm($event.target)"
      class="w-full h-32 mt-10 px-5 sm:px-10">
        <!-- img product -->
        <div
          class="form-group w-44 px-2 mb-6"
          style="font-family: 'Quicksand-Regular';">
            <img :src="imgProduct" class="rounded-sm" style="max-height: 160px;min-height: 160px;">
            <input 
              @change="changePreview($event)"
              name="product_img" type="file" class="w-full mt-3 text-tgadgety opacity-80 text-sm">
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
                  name="product_name"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  v-text="validator.product_name"
                  class="h-5 flex items-end text-xs text-red-700">

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
                  name="price"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  v-text="validator.price"
                  class="h-5 flex items-end text-xs text-red-700">

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
                  name="linktp"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  v-text="validator.linktp"
                  class="h-5 flex items-end text-xs text-red-700">

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
                  name="linksp"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  v-text="validator.linsp"
                  class="h-5 flex items-end text-xs text-red-700">

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
                  name="linklz"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  v-text="validator.linklz"
                  class="h-5 flex items-end text-xs text-red-700">

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
                  name="linkwa"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  v-text="validator.linkwa"
                  class="h-5 flex items-end text-xs text-red-700">

                </span>
            </div>
        </div>

        <!-- deskripsi -->
        <div
          class="form-group w-full flex flex-col sm:flex-row justify-around items-start mb-1"
          style="font-family: 'Quicksand-Regular';">
            <div class="input-wraper w-full sm:w-auto sm:flex-1 px-2">
                <label
                class="text-tgadgety capitalize opacity-80 text-sm italic"
                style="font-family: 'Quicksand-SemiBold';">deskription</label>
                <div class="bg-tgadgety-500 rounded-md overflow-hidden">
                    <quill-editor
                    class=""
                    ref="myQuillEditor"
                    />
                </div> 
                <span
                  v-text="validator.deskripsi"
                  class="h-5 flex items-end text-xs text-red-700">

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
                  name="linkwa"
                  class="bg-tgadgety-500 w-full px-3 py-2 text-white outline-none box-border rounded-sm shadow-md opacity-90 focus:opacity-100">
                <span
                  v-text="'tes price validator'"
                  class="h-5 flex items-end text-xs text-red-700">

                </span>
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
    data() {
        return{
            validator : {},
            imgProduct: require('@/assets/img/bg-img-product.webp')
        }
    },
    methods: {
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
        sendDataForm(form){
            console.log(form);
        }
    },
}
</script>

<style scoped>
</style>