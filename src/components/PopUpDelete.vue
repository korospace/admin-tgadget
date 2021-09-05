<template>
    <transition name="fade">
    <div
      id="popup-delete"
      class="fixed z-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center"
      style="background-color: rgba(0,0,0,0.4);">
        <transition name="bounce" appear>
        <div 
          class="bg-white w-64 h-52 flex flex-col rounded-md shadow-md overflow-hidden">
            <div class="w-full flex-1 flex flex-col justify-center px-4 text-center">
                <h1
                  class="text-2xl text-tgadgety capitalize opacity-80">
                    are you sure?
                </h1>
                <h2
                  class="mt-2 text-xs text-tgadgety opacity-80">
                    the product will be <b>permanently deleted</b>
                </h2>
            </div>

            <div class="w-full flex">
                <a 
                href=""
                class="flex-1 px-3 py-2 tracking-widest transition-all text-white text-center bg-tgadgety-500 opacity-60 hover:opacity-80" 
                @click.prevent="$emit('dodelete');">
                    Yes
                </a>
                <a 
                href=""
                class="flex-1 px-3 py-2 tracking-widest transition-all text-white text-center bg-tgadgety opacity-80 hover:opacity-100" 
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

    h1,button{
        font-family: 'Quicksand-SemiBold';
    }

    h2{
        font-family: 'Quicksand-Medium';
    }

</style>