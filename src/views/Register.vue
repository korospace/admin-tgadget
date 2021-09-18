<template>
    <div 
      id="register" 
      class="w-full min-h-screen block md:flex overflow-x-hidden overflow-y-auto">

        <Alert
          v-if="alertOn"
          :msg="alertMsg"
          :type="alertType"
          @close="alertOn=false" />

        <LoadingSpinner
          v-if="loadingOn"
          :msg="loadingMsg" 
          :showsuccessicon="showSuccessIcon" />
        
        <!-- API ilustration -->
        <div 
          id="apiIlustration" 
          class="h-screen w-full md:w-3/5 flex flex-col justify-center items-center pr-10 sm:pr-20 pl-10 sm:pl-20 text-center">
            <img :src="apiIlustration" class="w-full">
            <h1 class="uppercase mt-2 opacity-80">
                t-gadgetapi client page
            </h1>
            <a 
              href="#"  
              v-scroll-to="{
                el: '#formWraper',
                container: '#app',
              }"
              class="bg-tgadgety sm:hover:bg-tgadgety-500 active:bg-tgadgety-500 inline-block md:hidden mt-10 px-5 py-1.5 box-border rounded-sm shadow-md uppercase tracking-widest text-white transition-all">sign up</a>
        </div>

        <!-- Register form -->
        <div 
          id="formWraper" 
          class="min-h-screen md:flex-1 pl-5 md:pl-10 pr-5 md:pr-10 lg:pr-20 py-5 md:py-14 box-border">
            <FormLoginRegister
              formtype="formRegister"
              :validation="formValidation"
              :isdisabled="formDisabled"
              @form-onsubmit="formOnSubmit($event)" />
        </div>

    </div>
</template>

<script>
import Alert             from '../components/Alert'
import LoadingSpinner    from '../components/LoadingSpinner'
import FormLoginRegister from '../components/FormLoginRegister'

export default {
    props:['apiurl'],
    components: {
        Alert,
        FormLoginRegister,
        LoadingSpinner,
    },
    data(){
        return{
            alertOn        : false,
            alertMsg       : '',
            alertType      : '',
            loadingOn      : false,
            showSuccessIcon    : false,
                loadingMsg     : 'please wait',
            formDisabled   : false,
            apiIlustration : require('@/assets/img/api-ilustration.webp'),
            formValidation : {
                email    : '',
                username : '',
                password : '',
            },
        }
    },
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem('userdata') !== null) {
            next({name: "Dashboard"});
        }
        next();
    },
    methods: {
        showAlert(data){
            this.alertType = data.type;
            this.alertMsg  = data.msg;
            this.alertOn   = true;
        },
        formOnSubmit(form){
            let invalid    = false;
            let formLogin  = new FormData(form);
            this.formValidation.email    = '';
            this.formValidation.username = '';
            this.formValidation.password = '';

            if(formLogin.get('email') == ''){
                this.formValidation.email = 'email is required';
                invalid = true;
            }
            if(formLogin.get('username') == ''){
                this.formValidation.username = 'username is required';
                invalid = true;
            }
            if(formLogin.get('password') == ''){
                this.formValidation.password = 'password is required';
                invalid = true;
            }

            if(!invalid){
                this.loadingOn = true;
                this.axios
                .post(`${this.$props.apiurl}/user/register`,formLogin)
                .then((response) => {
                    if(response.status == 201){
                        this.showSuccessIcon = true;
                        this.loadingMsg      = 'check your email!'
                        setTimeout(() => {
                            this.loadingOn       = false;
                            this.showSuccessIcon = false;
                            this.loadingMsg      = 'please wait!'
                            setTimeout(() => {
                                this.$router.push({name:'Login'})
                            }, 500);
                        }, 2000);
                    }
                })
                .catch((error) => {
                    this.loadingOn = false;

                    if(error.response.status == 400){
                        let message = error.response.data.message;
                        this.formValidation.email    = message.email;
                        this.formValidation.username = message.username;
                        this.formValidation.password = message.password;
                    }
                    if(error.response.status == 500){
                        this.showAlert({
                            type: 'danger',
                            msg: '<b>Ups, server error</b>. Please try again!'
                        });
                    }
                })
            }
        }
    },
    mounted(){
        if(!navigator.onLine){
            this.formDisabled = true;
            this.showAlert({
                type: 'danger',
                msg: '<b>Ups, connection lost!</b> Please check your connection.'
            });
        }
        window.onoffline = () => {
            this.formDisabled = true;
            this.showAlert({
                type: 'danger',
                msg: '<b>Ups, connection lost!</b> Please check your connection.'
            });
        };
        window.ononline = () => {
            this.formDisabled = false;
            this.alertOn      = false;
        };
    },
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