<template>
    <transition name="fade">
    <div
      id="dashboard-settings"
      v-if="settingOn"
      class="fixed z-30 top-0 bottom-0 right-0 left-0 flex justify-end py-5 px-5 sm:px-10 overflow-hidden"
      style="background-color: rgba(0,0,0,0.4)">

        <LoadingSpinner
          v-if="loadingOn"
          :msg="spinnerMsg"
          :successicon="successIcon"/>
        
        <PopUpExpired
          v-if="popUpExpiredOn" />

        <transition name="slide" appear>
        <div class="bg-white w-96 flex flex-col rounded-md">
            
            <!-- header -->
            <div class="header w-full py-3">
                <h1 class="text-center text-tgadgety text-xl capitalize opacity-80">
                    settings
                </h1>
            </div>

            <!-- body -->
            <div class="body w-full flex-1 px-4 pb-4 overflow-auto">
                <form 
                  @submit.prevent="doEditUser($event.target)"
                  class="pb-5">
                    <div class="formGroup relative w-full mt-3">
                        <label 
                          for="new_username" 
                          class="block text-tgadgety opacity-80 text-lg">
                            username
                        </label>
                        <input 
                          id="new_username" 
                          type="username" 
                          name="new_username"
                          :value="userdata.username"
                          autocomplete="off"
                          class="w-full mt-1 px-2 py-1.5 text-tgadgety font-extrabold outline-none"
                          :class="{'ring-2 ':formValidation.new_username,'ring-red-500':formValidation.new_username,
                          'borderNone':formValidation.new_username,}">
                        <small 
                          v-if="formValidation.new_username"
                          class="absolute left-0 -bottom-6 text-red-600 tracking-wide">
                            * {{ formValidation.new_username }}
                        </small>
                    </div>
                    <div class="formGroup relative w-full mt-5">
                        <label 
                          for="new_password" 
                          class="block text-tgadgety opacity-80 text-lg">
                            password
                        </label>
                        <input 
                          id="new_password" 
                          type="password" 
                          name="new_password"
                          :value="userdata.password"
                          autocomplete="off"
                          class="w-full mt-1 px-2 py-1.5 text-tgadgety font-extrabold outline-none"
                          :class="{'ring-2 ':formValidation.new_password,'ring-red-500':formValidation.new_password,'borderNone':formValidation.new_password,}">
                        <small 
                          v-if="formValidation.new_password"
                          class="absolute left-0 -bottom-6 text-red-600 tracking-wide">
                            * {{ formValidation.new_password }}
                        </small>
                    </div>
                    <button 
                      class="mt-7 px-3 py-1 border border-tgadgety rounded-sm tracking-widest transition-all text-tgadgety-500 hover:text-tgadgety border-2 border-tgadgety-500 hover:border-tgadgety mr-2" 
                      @click.prevent="$emit('settings-off')">
                        close
                    </button>
                    <button 
                      class="mt-7 px-3 py-1 border border-tgadgety rounded-sm tracking-widest transition-all text-white bg-tgadgety hover:bg-tgadgety-500 hover:border-tgadgety-500">
                        change
                    </button>
                </form>
                <h2 class="mt-3 text-tgadgety opacity-80 text-lg">api key</h2>
                <div class="copyarea relative w-full h-auto mt-1 p-0.5 flex overflow-hidden justify-between items-center rounded-sm">
                    <span
                        class="px-2 text-md text-tgadgety tracking-wide opacity-80" v-text="userdata.api_key"></span>
                    <textarea
                        class="opacity-0 absolute"
                        v-html="userdata.api_key"></textarea>
                    <img 
                        :src="imgCopy"
                        @click="copyText"
                        class="w-8 h-8 px-1.5 flex items-center bg-tgadgety opacity-60 hover:opacity-80 cursor-pointer rounded-sm">
                </div>
                <h2 class="mt-3 text-tgadgety opacity-80 text-lg">token</h2>
                <div class="copyarea relative w-full h-auto mt-1 p-0.5 flex overflow-hidden rounded-sm">
                    <span 
                        class="px-2 text-md text-tgadgety tracking-wide opacity-80 py-1.5 break-all" 
                        v-text="userdata.token"></span>
                    <textarea 
                        class="opacity-0 absolute" 
                        v-html="userdata.token"></textarea>
                    <img 
                        :src="imgCopy" 
                        @click="copyText" 
                        class="w-8 h-8 px-1.5 flex items-center bg-tgadgety opacity-60 hover:opacity-80 cursor-pointer rounded-sm">
                </div>
            </div>
        </div>
        </transition>
    </div>
    </transition>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner'
import PopUpExpired   from '@/components/PopUpExpired'

export default {
    props: ['apiurl'],
    components: {
        LoadingSpinner,
        PopUpExpired,
    },
    data() {
        return{
            settingOn      : false,
            imgCopy        : require('@/assets/img/copy.svg'),
            userdata       : JSON.parse(localStorage.getItem('userdata')),
            loadingOn      : false,
            successIcon    : false,
            spinnerMsg     : 'please wait!',
            popUpExpiredOn : false,
            formValidation : {
                new_username: '',
                new_password: ''
            },
        }
    },
    methods: {
        copyText(event){
            event.target.previousElementSibling.select();
            document.execCommand("copy");
        },
        doEditUser(form){
            let invalid = false;
            let formEditUser  = new FormData(form);
            this.formValidation.new_username = '';
            this.formValidation.new_password = '';

            if(formEditUser.get('new_username') == ''){
                invalid = true;
                this.formValidation.new_username = 'username is required';
            }
            if(formEditUser.get('new_password') == ''){
                invalid = true;
                this.formValidation.new_password = 'password is required';
            }

            if(invalid == false){
                this.loadingOn = true;
                this.axios
                .put(`${this.$props.apiurl}/user/update`,formEditUser, {
                    headers: {
                        'api-key': this.userdata.api_key,
                        "token"  : this.userdata.token,
                    }
                })
                .then((response) => {
                    if(response.data.message == 'update user is success!'){
                        this.$emit('change-username',formEditUser.get('new_username'));
                        this.successIcon = true;
                        this.spinnerMsg  = "edit success!";

                        this.userdata.username = formEditUser.get('new_username');
                        this.userdata.password = formEditUser.get('new_password');
                        localStorage.setItem('userdata',JSON.stringify(this.userdata));
                        setTimeout(() => {
                            this.successIcon = false;    
                            this.spinnerMsg  = "please wait!";
                            this.loadingOn   = false;
                        }, 2000);
                        
                    }
                })
                .catch((error) => {
                    this.loadingOn = false;

                    if(error.response.status == 400){
                        let message = error.response.data.message;
                        this.formValidation.new_username = message.new_username;
                        this.formValidation.new_password = message.new_password;
                    }
                    if(error.response.status == 401){
                        if(error.response.data.message == 'expired token'){
                            setTimeout(() => {
                                this.popUpExpiredOn = true;
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
                        this.$emit('change-alerttype','danger');
                        this.$emit('change-alertmsg','<b>Ups, server error!</b> Please try again.');
                        this.$emit('alerton',true);
                    }
                })
            }
        }
    },
    mounted(){
        this.settingOn = true;
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

    .slide-enter-active{
        animation: slide-in .4s;
    }
    @keyframes slide-in {
        0% {
            opacity: 0;
            transform: translateX(20px)
        }
        100% {
            opacity: 1;
            transform: translateX(0px)
        }
    }

    #dashboard-settings{
        font-family: 'Quicksand-Medium';
    }

    #dashboard-settings .header{
        font-family: 'Quicksand-Regular';
        border-bottom: 0.2px solid rgba(237, 125, 44, 0.2);
    }

    #dashboard-settings .body h2,
    #dashboard-settings .body label{
        font-family: 'Quicksand-SemiBold';
    }

    #dashboard-settings .body .copyarea{
        font-family: 'Quicksand-Regular';
        border: 1.5px solid rgba(237, 125, 44, 0.6);
    }

    #dashboard-settings .body form{
        border-bottom: 1.5px solid rgba(237, 125, 44, 0.6);
    }

    #dashboard-settings .body .formGroup input{
        font-family: 'Quicksand-Regular';
        border: 1.5px solid rgba(237, 125, 44, 0.6);
    }

    #dashboard-settings .body .formGroup input.borderNone{
        border: 1.5px solid rgba(237, 125, 44, 0);
    }
</style>