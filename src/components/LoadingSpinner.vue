<template>
    <div 
        class="fixed top-0 bottom-0 left-0 right-0 z-0 flex justify-center items-center opacity-0"
        style="background-color: rgba(0,0,0,0.6)" :class="{'z-20':loadingon,'opacity-100':loadingon}">
        <transition name="bounce-svgwraper">
            <div v-if="loadingon==true" class="bg-white w-24 sm:w-32 h-24 sm:h-32 flex justify-center items-center rounded-md shadow-md transform transition-all duration-300">
                <svg v-if="successicon==false" class="w-8 sm:w-12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; display: block; shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#ed7d2c" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.8474576271186441s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>
                </svg>
                <transition name="bounce">
                    <svg v-if="successicon==true" class="w-8 sm:w-12" height="384pt" viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg"><path fill="#ed7d2c" d="m192 384c105.863281 0 192-86.128906 192-192 0-18.273438-2.550781-36.28125-7.601562-53.527344-2.488282-8.480468-11.34375-13.351562-19.847657-10.863281-8.488281 2.480469-13.34375 11.367187-10.863281 19.847656 4.183594 14.328125 6.3125 29.320313 6.3125 44.542969 0 88.222656-71.777344 160-160 160s-160-71.777344-160-160 71.777344-160 160-160c32.0625 0 62.910156 9.375 89.207031 27.105469 7.320313 4.941406 17.273438 3 22.207031-4.320313 4.9375-7.328125 3.011719-17.273437-4.316406-22.210937-31.601562-21.308594-68.632812-32.574219-107.097656-32.574219-105.863281 0-192 86.128906-192 192s86.136719 192 192 192zm0 0"/><path fill="#ed7d2c" d="m356.6875 36.6875-164.6875 164.679688-52.6875-52.679688c-6.25-6.246094-16.375-6.246094-22.625 0-6.246094 6.25-6.246094 16.375 0 22.625l64 64c3.128906 3.128906 7.214844 4.6875 11.3125 4.6875s8.183594-1.558594 11.3125-4.6875l176-176c6.246094-6.25 6.246094-16.375 0-22.625-6.25-6.246094-16.375-6.246094-22.625 0zm0 0"/></svg>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: ['loadingon','successicon']
}
</script>

<style scoped>
    .bounce-svgwraper-enter-active{
        animation: bounce-inA .3s;
    }
    @keyframes bounce-inA {
        0% {
            transform: scale(0.75);
        }
        100% {
            transform: scale(1);
        }
    }
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
</style>