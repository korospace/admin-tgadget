<template>
    <div id="popupexpired"
        class="fixed top-0 bottom-0 left-0 right-0 z-0 flex justify-center items-center opacity-0"
        style="background-color: rgba(0,0,0,0.6)" :class="{'z-20':popupon,'opacity-100':popupon}">
        <transition name="bounce-svgwraper">
            <div v-if="popupon==true" class="bg-white w-56 h-36 flex flex-col items-center rounded-md shadow-md overflow-hidden">
                <div class="message w-full flex-1 flex flex-col justify-center items-center opacity-80">
                    <h1 class="text-center capitalize tracking-wide">your session is</h1>
                    <h2 class="text-extrabold tracking-wide">expired</h2>
                </div>
                <button 
                  class="w-full py-3 uppercase tracking-widest text-xs opacity-80 hover:bg-gray-200 active:bg-gray-200"
                  @click="$emit('do-redirect')">ok</button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: ['popupon']
}
</script>

<style scoped>
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
    #popupexpired button{
        font-family: 'Rc-bold';
    }

    .message{
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.3)
    }
    .message h2{
        font-family: 'Quicksand-Bold'
    }
</style>