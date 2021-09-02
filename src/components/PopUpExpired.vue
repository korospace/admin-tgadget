<template>
    <transition name="fade">
    <div
      id="popupexpired"
      v-if="popUpExpiredOn"
      class="fixed z-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center"
      style="background-color: rgba(0,0,0,0.4);">
        <transition name="bounce-svgwraper" appear>
            <div 
              v-if="popUpExpiredOn" 
              class="bg-white w-44 h-44 flex flex-col justify-center items-center rounded-md shadow-md overflow-hidden text-tgadgety">
                <h1 class="text-center tracking-wide opacity-90">Your session has</h1>
                <h2 class="text-extrabold tracking-wide opacity-90">expired</h2>
                <div class="spinner-wraper relative w-10 mt-8 flex justify-center items-center">
                    <svg class="absolute w-full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx="50" cy="50" fill="none" stroke="#ed7d2c" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.8474576271186441s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                        </circle>
                    </svg>
                    <small>{{ timeOut }}</small>
                </div>
                <small class="mt-6 tracking-wide opacity-90">redirect to login</small>
            </div>
        </transition>
    </div>
    </transition>
</template>

<script>
export default {
    data(){
        return{
            timeOut: 6,
            popUpExpiredOn: false,
        }
    },
    methods: {
      goToLogin(){
          this.$router.push({name: 'Login'});
      }
    },
    mounted(){
        this.popUpExpiredOn = true;
        let myInterval = setInterval(() => {
            --this.timeOut;
            if(this.timeOut == 0){
                clearInterval(myInterval)
                this.popUpExpiredOn = false;
                setTimeout(() => {
                    localStorage.removeItem('userdata');
                    this.goToLogin();
                }, 600);
            }
        }, 1000);
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
    .bounce-svgwraper-enter-active{
        animation: bounce .3s;
    }
    @keyframes bounce {
        0% {
            opacity: 0;
            transform: scale(0.75);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    #popupexpired{
        font-family: 'Quicksand-medium';
    }
    #popupexpired h2{
        font-family: 'Quicksand-Bold'
    }
</style>