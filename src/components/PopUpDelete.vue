<template>
    <transition name="fade">
    <div
      id="popup-delete"
      class="fixed z-50 top-0 bottom-0 left-0 right-0 px-3 flex justify-center items-center transition duration-300"
      :class="{'opacity-0':deletingData}"
      style="background-color: rgba(0,0,0,0.4);">
        <transition name="bounce" appear>
        <div 
          class="bg-white w-68 h-52 flex flex-col rounded-md shadow-md overflow-hidden transition duration-300"
          :class="{'opacity-0':deletingData}">
            
            <!-- question text -->
            <div class="w-full flex-1 flex flex-col justify-center px-4 text-center">
                <h1
                  class="text-2xl text-tgadgety capitalize opacity-80"
                  style="font-family: 'Quicksand-SemiBold'">
                    are you sure?
                </h1>
                <h2
                  class="mt-2 text-sm text-tgadgety opacity-80"
                  style="font-family: 'Quicksand-Medium'">
                    this <b style="font-family: 'Quicksand-SemiBold'">{{targetdelete.name}}</b> will be <b style="font-family: 'Quicksand-SemiBold'">permanently</b> deleted
                </h2>
            </div>

            <!-- yes or no -->
            <div class="w-full flex">
                <a 
                href=""
                class="flex-1 px-3 py-2 tracking-widest transition-all text-white text-center bg-tgadgety-500 opacity-60 hover:opacity-80" 
                style="font-family: 'Quicksand-SemiBold';"
                @click.prevent="doDeleteData();">
                    Yes
                </a>
                <a 
                href=""
                class="flex-1 px-3 py-2 tracking-widest transition-all text-white text-center bg-tgadgety opacity-80 hover:opacity-100"
                style="font-family: 'Quicksand-SemiBold';" 
                @click.prevent="$emit('popuphide');">
                    No
                </a>
            </div>
        </div>
        </transition>
    </div>
    </transition>
</template>

<script>
export default {
    props:['apiurl','targetdelete'],
    data() {
        return{
            deletingData : false,
            userdata     : JSON.parse(localStorage.getItem('userdata')),
        }
    },
    methods:{
        doDeleteData(){
            this.deletingData = true;

            setTimeout(() => {
                let url = '';
                if (this.$props.targetdelete.name == 'account') {
                    url = `${this.$props.apiurl}/user/delete`;
                }
                else{
                    url = `${this.$props.apiurl}/delete/${this.$props.targetdelete.name}?id=${this.$props.targetdelete.id}`;
                }

                this.$emit('loading-on',true);
                this.$emit('loading-msg',"please wait!");

                this.axios
                .delete(url,{
                    headers: {
                        'api-key': this.userdata.api_key,
                        "token"  : this.userdata.token,
                    }
                })
                .then((response) => {
                    if(response.status == 201){
                        this.$emit('show-successicon',true);
                        this.$emit('loading-msg',"update success!");
                            
                        setTimeout(() => {
                            this.$emit('loading-on',false);
                            this.$emit('show-successicon',false);
                            this.$emit('loading-msg',"");
                            this.$emit('updatedata');
                            this.$emit('popuphide');
                        }, 1000);
                    }
                })
                .catch((error) => {
                    this.$emit('loading-on',false);

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
                    if (error.response.status == 500) {    
                        // show alert
                        this.$emit('alert-on',{
                            type:'danger',
                            msg: '<b>Ups, server error!</b> Please try again.'
                        });
                    }

                    this.$emit('popuphide');
                })
            }, 400);
        },
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