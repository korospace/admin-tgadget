<template>
    <div id="login" class="w-full min-h-screen block md:flex overflow-auto">

        <LoadingSpinner
          :msg="loadingMsg" 
          :successicon="successIcon" 
          :loadingon="loadingOn" />
        
        <!-- API ilustration -->
        <div id="apiIlustration" class="relative z-10 min-h-screen md:min-h-full w-full md:w-3/5 flex flex-col justify-center items-center pr-10 sm:pr-20 md:pr-20 pl-10 sm:pl-20 lg:pr-20 lg:pl-20 text-center">
            <img :src="apiIlustration" class="w-full">
            <h1 class="uppercase mt-2 opacity-80">t-gadgetapi client page</h1>
            <a href="#" v-scroll-to="'#formWraper'" class="bg-tgadgety md:hidden mt-10 px-5 py-1.5 rounded-sm box-border shadow-md uppercase tracking-widest text-white sm:hover:bg-tgadgety-500 active:bg-tgadgety-500 border-2 border-tgadgety">sign up</a>
        </div>

        <!-- Login form -->
        <div id="formWraper" class="relative min-h-screen md:min-h-full flex-1 pl-5 md:pl-10 pr-5 md:pr-10 lg:pr-20 py-14 box-border overflow-hidden">
            <FormLoginRegister
              formtype="formRegister"
              :validation="formValidation"
              @form-onsubmit="formOnSubmit($event)" />
        </div>

    </div>
</template>

<script>
import FormLoginRegister from '../components/FormLoginRegister'
import LoadingSpinner from '../components/LoadingSpinner'

export default {
    data(){
        return{
            apiIlustration: require('@/assets/img/api-ilustration.webp'),
            formValidation : {
                email    : '',
                username : '',
                password : '',
            },
            loadingOn   : false,
            successIcon : false,
            loadingMsg  : 'please wait',
        }
    },
    props:['apiurl'],
    components: {
        FormLoginRegister,
        LoadingSpinner,
    },
    methods: {
        formOnSubmit(form){
            let formLogin  = new FormData(form);
            this.formValidation.email    = '';
            this.formValidation.username = '';
            this.formValidation.password = '';

            if(formLogin.get('email') == ''){
                this.formValidation.email = 'email is required';
            }
            if(formLogin.get('username') == ''){
                this.formValidation.username = 'username is required';
            }
            if(formLogin.get('password') == ''){
                this.formValidation.password = 'password is required';
            }

            if(formLogin.get('email')    != '' && 
               formLogin.get('username') != '' && 
               formLogin.get('password') != ''){
                this.loadingOn = true;
                this.axios
                    .post(`${this.$props.apiurl}/user/register`,formLogin)
                    .then((response) => {
                        if(response.data.message == 'user register is success!'){
                            this.successIcon = true;
                            this.loadingMsg  = 'check your email!'
                            setTimeout(() => {
                                this.loadingOn = false;
                                setTimeout(() => {
                                    this.$router.push({name:'Login'})
                                }, 500);
                            }, 3000);
                        }
                    })
                    .catch((error) => {
                        if(error.response.status == 400){
                            let message = error.response.data.message;
                            this.formValidation.email    = message.email;
                            this.formValidation.username = message.username;
                            this.formValidation.password = message.password;
                        }
                        this.loadingOn = false;
                    })
            }
        }
    }
}
</script>

<style scoped>
    #apiIlustration h1{
        font-size: 3.8vw;
        font-family: 'Rc-bold';
        color: #ED7D2C;
    }
    @media (max-width:768px) {
        #apiIlustration h1{
            font-size: 6.5vw;
        }
    }
</style>