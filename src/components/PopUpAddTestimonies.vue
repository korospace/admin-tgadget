<template>
    <transition name="fade">
    <div
      id="popup-add-testimonies"
      class="fixed z-50 top-0 bottom-0 left-0 right-0 px-3 flex justify-center items-center"
      style="background-color: rgba(0,0,0,0.4);">
        <transition name="bounce" appear>
        <form 
          @submit.prevent="doAddTesti($event.target);"
          class="bg-white max-w-md flex flex-col rounded-md shadow-md overflow-hidden">
            
            <!-- header -->
            <div
              class="relative w-full py-3"
              style="font-family: 'Quicksand-Regular';border-bottom: 0.2px solid rgba(237, 125, 44, 0.2);">
                <h1 class="text-center text-tgadgety text-lg capitalize opacity-80">
                    add testimonies
                </h1>
                <img 
                  :src="require('@/assets/img/close.svg')"
                  class="absolute top-2 right-2 w-4 opacity-60 hover:opacity-90 cursor-pointer"
                  @click.prevent="$emit('popuphide')">
            </div>

            <!-- header -->
            <div
              class="w-full px-4 py-3">
                <img
                  :src="imgPreview"
                  class="w-full rounded-sm shadow-card"
                  style="max-width: 416px;max-height: 234px;" >
                <input 
                  @change="changePreview($event)"
                  name="img_testi" type="file" class="w-full mt-3 text-tgadgety opacity-80">
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
            userdata   : JSON.parse(localStorage.getItem('userdata')),
            imgPreview : require('@/assets/img/bg-testimoni.webp'),
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
                this.imgPreview = URL.createObjectURL(event.target.files[0]);
            }
        },
        doAddTesti(form){

            let formTesti = new FormData(form);
            this.$emit('loading-on',true);
            this.$emit('loading-msg',"please wait");

            this.axios
            .post(`${this.$props.apiurl}/add/testimony`,formTesti, {
                headers: {
                    'api-key': this.userdata.api_key,
                    "token"  : this.userdata.token,
                }
            })
            .then((response) => {
                if(response.status == 201){
                    this.$emit('show-successicon',true);
                    this.$emit('loading-msg',"upload success!");
                    this.$emit('gettestimonies');

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