<template>
    <div
      id="products-viewer"
      class="w-full flex mt-5 px-5"
      :class="{'h-80': products.length==0}">
        <div
          class="bg-tgadgety-500 w-full relative pt-4 pl-4 pb-3 flex rounded-sm overflow-auto"
          :class="{'h-full animate-pulse opacity-70': products.length==0,'shadow-card': products.length>0,}">
            <div class="w-6 flex items-center">
              <small
                v-if="products.length>0"
                class="title text-white text-base capitalize tracking-widest transform -rotate-90 -translate-x-6 -translate-y-4 opacity-60">
                  viewers
              </small>
            </div>
            <column-chart
              v-if="products.length>0"
              :width="chartWidth"
              style="min-width: 100%;"
              :dataset="{borderWidth: 1}"
              :min="0" :max="maxViewer"
              :data="dataViewers">
            </column-chart>
        </div>
    </div>    
</template>

<script>
export default {
    props: ['products'],
    computed: {
      dataViewers(){
        if(this.$props.products == "notfound"){
          return [["product not found",0]];
        }
        else{
          let data = [];
          this.$props.products.forEach(p => {
            data.push([p.name, parseInt(p.viewers)]);
          });
          
          return data.sort( (a,b) => b[1]-a[1] );
        }
      },
      maxViewer(){
        if(this.$props.products == "notfound"){
          return 10;
        }
        else{
          let maxValue = 0;
          this.$props.products.forEach(p => {
            if(p.viewers > maxValue){
              maxValue = parseInt(p.viewers); 
            }
          });
  
          if(maxValue%2==0){
            return maxValue + 4;
          }
          else{
            return maxValue + 3;
          }
        }
      },
      chartWidth(){
        if(this.$props.products == "notfound"){
          return "96%";
        }
        else{
          return this.$props.products.length*150+'px';
        }
      }
    },
}
</script>

<style scoped>
  
</style>