<template>
    <transition name="fade">
    <div
      id="popup-add-testimonies"
      class="fixed z-50 top-0 bottom-0 left-0 right-0 px-3 flex justify-center items-center"
      style="background-color: rgba(0,0,0,0.4);">
        <transition name="bounce" appear>
        <form 
          @submit.prevent="doAddBanner($event.target);"
          class="bg-white max-w-md flex flex-col rounded-md shadow-md overflow-hidden">
            
            <!-- header -->
            <div
              class="relative w-full py-3"
              style="font-family: 'Quicksand-Regular';border-bottom: 0.2px solid rgba(237, 125, 44, 0.2);">
                <h1 class="text-center text-tgadgety text-lg capitalize opacity-80">
                    add banners
                </h1>
                <img 
                  :src="require('@/assets/img/close.svg')"
                  class="absolute top-2 right-2 w-4 opacity-60 hover:opacity-90 cursor-pointer"
                  @click.prevent="$emit('popuphide')">
            </div>

            <!-- header -->
            <div
              class="w-full px-4 py-3">
                <!-- banner desktop -->
                <h1
                  class="text-tgadgety capitalize mb-1 opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">desktop</h1>
                <img
                  :src="previewDesktop"
                  class="w-full rounded-sm shadow-card"
                  style="max-width: 416px;max-height: 104px;" >
                <input 
                  @change="changePreview($event)"
                  name="banner_desktop" type="file" class="w-full mt-3 text-tgadgety opacity-80 text-xs sm:text-md">

                <!-- banner mobile -->
                <h1
                  class="text-tgadgety capitalize mt-3 mb-1 opacity-80 text-sm italic"
                  style="font-family: 'Quicksand-SemiBold';">mobile</h1>
                <img
                  :src="previewMobile"
                  class="w-1/2 rounded-sm shadow-card"
                  style="max-width: 208px;max-height: 70px;" >
                <input 
                  @change="changePreview($event)"
                  name="banner_mobile" type="file" class="w-full mt-3 text-tgadgety opacity-80 text-xs sm:text-md">

                <!-- submit -->
                <button 
                 class="w-full flex justify-center mt-8 px-3 py-2 rounded-md shadow-card tracking-widest transition-all text-white text-md sm-400:text-xl uppercase bg-tgadgety hover:bg-tgadgety-500"
                 style="font-family: 'Quicksand-SemiBold';">
                    submit
                </button>
            </div>
        </form>
        </transition>
    </div>
    </transition>
</template>

<script>
export default {
    props:['apiurl'],
    data() {
        return{
            userdata       : JSON.parse(localStorage.getItem('userdata')),
            previewDesktop : require('@/assets/img/bg-banner-desktop.webp'),
            previewMobile  : require('@/assets/img/bg-banner-mobile.webp'),
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
                if (event.target.name == 'banner_desktop') {
                    this.previewDesktop = URL.createObjectURL(event.target.files[0]);
                } else {
                    this.previewMobile  = URL.createObjectURL(event.target.files[0]);
                }
            }
        },
        doAddBanner(form){

            let formBanner = new FormData(form);

            if (formBanner.get('banner_desktop').name == '' || formBanner.get('banner_mobile').name == '') {
                this.$emit('alert-on',{
                    type:'danger',
                    msg: '<b>Upload failed!</b> dasktop and mobile must upload.'
                });
                return 0;
            }

            this.$emit('loading-on',true);

            this.axios
            .post(`${this.$props.apiurl}/add/banner`,formBanner, {
                headers: {
                    'api-key': this.userdata.api_key,
                    "token"  : this.userdata.token,
                }
            })
            .then((response) => {
                if(response.status == 201){
                    this.$emit('show-successicon',true);
                    this.$emit('loading-msg',"update success!");
                    this.$emit('getbanners');

                    setTimeout(() => {
                        this.$emit('loading-on',false);
                        this.$emit('show-successicon',false);
                        this.$emit('loading-msg',false);
                    }, 2000);
                }
            })
            .catch((error) => {
                this.$emit('loading-on',false);

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
                if(error.response.status == 500){
                    this.$emit('alert-on',{
                        type:'danger',
                        msg: '<b>Ups, server error!</b> Please try again.'
                    });
                }
            })
        }
    }
}
</script>

<style scoped>
    .fade-enter-active{
        animation: fade .4s;
    }
    .fade-leave-active{
        animation: fade .2s reverse;
    }
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .bounce-enter-active{
        animation: bounce .2s;
    }
    @keyframes bounce {
        0% {
            transform: scale(0.6);
        }
        100% {
            transform: scale(1);
        }
    }

</style>