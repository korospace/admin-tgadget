<template>
    <transition name="fade">
    <div
      id="dashboard-event"
      v-if="eventOn"
      class="fixed z-30 top-0 bottom-0 right-0 left-0 flex justify-end py-5 px-5 sm:px-10 overflow-hidden"
      style="background-color: rgba(0,0,0,0.4)">

        <LoadingSpinner
          v-if="loadingOn"
          :msg="spinnerMsg"
          :successicon="successIcon"/>
        
        <PopUpExpired
          v-if="popUpExpiredOn" />

        <transition name="slide" appear>
        <form @submit.prevent="doEditEvent($event.target)" class="bg-white w-80 flex flex-col rounded-md text-tgadgety">
            
            <!-- header -->
            <div class="header w-full py-3">
                <h1 class="text-center text-tgadgety text-xl capitalize opacity-80">
                    event
                </h1>
            </div>

            <!-- body -->
            <div class="body w-full flex-1 mb-2 px-5 py-3 overflow-auto">
                <div 
                  class="bg-tgadgety-500 rounded-md overflow-hidden"
                  :class="{'animate-pulse':dataIsReady==false,'opacity-70':dataIsReady==false}">
                    <img 
                      :src="poster" 
                      class="w-full" 
                      :class="{'opacity-0':dataIsReady==false}">
                </div>
                <input 
                  @change="changePreview($event)"
                  name="poster" type="file" class="w-full mt-2">
                <h1 class="line mt-4 mb-2 pt-2 font-extrabold capitalize opacity-80">due date:</h1>
                <div class="w-full flex">
                    <input
                      v-if="dataIsReady" 
                      @keyup="numFilter(2,$event)"
                      type="number" :value="day" name="day" placeholder="day" 
                      class="block w-full px-2 py-1.5 text-tgadgety font-extrabold outline-none rounded-md">
                    <input
                      v-if="dataIsReady" 
                      @keyup="numFilter(2,$event)"
                      type="number" :value="month" name="month" placeholder="month"
                      class="block w-full px-2 py-1.5 text-tgadgety font-extrabold outline-none rounded-md mx-2">
                    <input
                      v-if="dataIsReady" 
                      @keyup="numFilter(4,$event)"
                      type="number" :value="year" name="year" placeholder="year" class="block w-full px-2 py-1.5 text-tgadgety font-extrabold outline-none rounded-md">
                    <div v-if="dataIsReady==false" class="bg-tgadgety-500 w-full h-10 animate-pulse box-border opacity-70 rounded-md"></div>
                    <div v-if="dataIsReady==false" class="bg-tgadgety-500 w-full h-10 animate-pulse box-border opacity-70 rounded-md mx-2"></div>
                    <div v-if="dataIsReady==false" class="bg-tgadgety-500 w-full h-10 animate-pulse box-border opacity-70 rounded-md"></div>
                </div>
            </div>

            <!-- footer -->
            <div class="footer w-full flex px-5 py-3">
                <button 
                  class="flex-1 px-3 py-1 border border-tgadgety rounded-sm tracking-widest transition-all text-tgadgety-500 hover:text-tgadgety border-2 border-tgadgety-500 hover:border-tgadgety mr-2" 
                  @click.prevent="$emit('event-off')">
                    close
                </button>
                <button 
                  class="flex-1 px-3 py-1 border border-tgadgety rounded-sm tracking-widest transition-all text-white bg-tgadgety hover:bg-tgadgety-500 hover:border-tgadgety-500">
                    submit
                </button>
            </div>

        </form>
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
            alertOn        : false,
            alertMsg       : '',
            alertType      : '',
            loadingOn      : false,
            successIcon    : false,
            spinnerMsg     : 'please wait!',
            popUpExpiredOn : false,
            eventOn        : false,
            dataIsReady    : false,
            userdata       : JSON.parse(localStorage.getItem('userdata')),
            poster         : require('@/assets/img/bg-poster.webp'),
            day  : '',
            month: '',
            year : '',
        }
    },
    methods: {
        getData(){
            this.dataIsReady = false;

            this.axios
            .get(`${this.$props.apiurl}/get/countdown`, {
                headers: {
                    'api-key': this.userdata.api_key,
                }
            })
            .then((response) => {
                if(response.status == 200){
                    this.dataIsReady = true;
                    if(response.data.data.poster.split('base64,')[1]!==" "){
                        this.poster = response.data.data.poster;
                    }
                    this.day    = response.data.data.day;
                    this.month  = response.data.data.month;
                    this.year   = response.data.data.year;
                }
            })
            .catch((error) => {
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
                    this.$emit('change-alertmsg','<b>Ups, server error!</b> Please refresh page.');
                    this.$emit('alerton',true);
                }
            })
        },
        changePreview(event){
            if(!/image/.test(event.target.files[0].type)){
                this.$emit('change-alerttype','danger');
                this.$emit('change-alertmsg','<b>upload failed!</b> file is not image.');
                this.$emit('alerton',true);
                event.target.value = "";
                return false;
            }
            else if(event.target.files[0].size > 200000){
                this.$emit('change-alerttype','danger');
                this.$emit('change-alertmsg','<b>upload failed!</b> file more than 200kb.');
                this.$emit('alerton',true);
                event.target.value = "";
                return false;
            }
            else{
                this.poster = URL.createObjectURL(event.target.files[0]);
            }
        },
        numFilter(max,event){
            event.target.value = event.target.value.replace(/s/,'').slice(0,max);
        },
        doEditEvent(form){
            let wrongFormat = false;
            let formEditPoster = new FormData(form);
            
            if(formEditPoster.get('day').length < 2){
                wrongFormat = true;
            }
            if(formEditPoster.get('month').length < 2){
                wrongFormat = true;
            }
            if(formEditPoster.get('year').length < 4){
                wrongFormat = true;
            }
            if(wrongFormat){
                this.$emit('change-alerttype','danger');
                this.$emit('change-alertmsg','<b>update failed!</b> date format is dd-mm-yyyy.');
                this.$emit('alerton',true);
                return 0;
            }

            this.loadingOn  = true;

            this.axios
            .put(`${this.$props.apiurl}/update/countdown`,formEditPoster, {
                headers: {
                    'api-key': this.userdata.api_key,
                    "token"  : this.userdata.token,
                }
            })
            .then((response) => {
                if(response.status == 201){
                    this.successIcon = true;
                    this.spinnerMsg  = 'update success';
                    this.getData();

                    setTimeout(() => {
                        this.loadingOn   = false;
                        this.successIcon = false;    
                        this.spinnerMsg  = "please wait!";
                    }, 2000);
                }
            })
            .catch((error) => {
                this.loadingOn = false;

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
    },
    mounted(){
        this.eventOn = true;
        this.getData();
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
            transform: translateX(14px)
        }
        100% {
            opacity: 1;
            transform: translateX(0px)
        }
    }

    #dashboard-event{
        font-family: 'Quicksand-Medium';
    }

    #dashboard-event .header{
        font-family: 'Quicksand-Regular';
        border-bottom: 0.2px solid rgba(237, 125, 44, 0.2);
    }

    #dashboard-event .body input[type=number]{
        font-family: 'Quicksand-Regular';
        border: 1.5px solid rgba(237, 125, 44, 0.6);
    }

    #dashboard-event .line,
    #dashboard-event .footer{
        border-top: 0.2px solid rgba(237, 125, 44, 0.2);
    }
</style>