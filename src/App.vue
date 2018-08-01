<template>
  <div id="app">
    <div style="height:100px;margin-top:200px;">
      <am-pagination 
        prev-text="&laquo;"  
        next-text="&raquo;" 
        first-text="&laquo;&laquo;" 
        last-text="&raquo;&raquo;" 
        :rotate="rotate"
        :item-totals="totals" 
        :force-ellipses="forceEllipses"  
        :page.sync ="current" 
        :max-size="maxSize" 
        :hide-if-empty="false" 
        :direction-links="directionLinks"
        :boundary-pages="boundaryPages" 
        :boundary-links ="boundaryLinks"
        @page-change="pageChange" 
        active-class="active-green"
        :page-size="psize">

         <a slot-scope="{index}" >
           {{index+1}}
         </a>
         <a slot="boundary-last-numbers" slot-scope="{index}">
           {{index+1}}
         </a>
         <a href="#" slot="boundary-first-numbers" slot-scope="{index}">
           {{index + 1 }}
         </a>
      </am-pagination>
     
    </div>
    <div>
      <button @click="moveTo">move to {{current}}</button>
  
    <button @click="chsize">pageSize : {{psize}}</button>
    <button @click="chtotal">item totals : {{totals}}</button><br />
    <button @click="switchrotate">switch rotate : {{rotate}}</button>
    <button @click="changeBoundaryPages">change boundary pages : {{boundaryPages}}</button><br />
    <button @click="changeMaxSize">change max size : {{maxSize}}</button>
    <button @click="switchboundaryLinks">switch boundary Links : {{boundaryLinks}}</button><br />
    <button @click="switchdirectionLinks">switch direction links : {{directionLinks}}</button>
    <button @click="switchforceEllipses">switch force  ellipses :  {{forceEllipses}}</button>
    <input type="text" v-model="active" />
   <span>{{'page totals:' + pagetotal }}</span>
    </div>
      
   
     
  </div>  
</template>

<script>
import  _ from 'lodash'

import AmPagination from './components/AmPagination'
export default {
  name: 'app',
  methods: {
    pageChange(from,to){
      console.info(`from :${from}  -> to : ${to}`);
    },
    moveTo(){
     this.current =_.random(1, Math.ceil(this.totals/this.psize));
    },
    chsize(){
      this.psize = _.random(1,20);
     
    },
    chtotal(){
      this.totals = _.random(0,10000);
    },
    switchrotate(){
      this.rotate =  !this.rotate;
    },
    changeBoundaryPages(){
      this.boundaryPages = _.random(0,this.maxSize-1);
    },
    changeMaxSize(){
      this.maxSize = _.random(1,15);
      this.boundaryPages = _.random(0,this.maxSize-1);
    },
    switchboundaryLinks(){
      this.boundaryLinks = ! this.boundaryLinks;
    },
    switchforceEllipses(){
      this.forceEllipses = !this.forceEllipses;
    },
    switchdirectionLinks(){
      this.directionLinks = !this.directionLinks;
    },
    switchforceEllipses(){
      this.forceEllipses = !this.forceEllipses;
    }
  },
  data () {
    return {
      current:1,
      msg: 'Welcome to Your Vue.js App',
      psize:1,
      totals:10,
      rotate:true,
      boundaryPages:2,
      maxSize:11,
      boundaryLinks:false,
      forceEllipses:true,
      directionLinks:true,
      active:"active-green"
    
    }
  },components: {
    AmPagination
  },
  computed: {
    pagetotal(){
      return Math.ceil(this.totals / this.psize);
    }
  }
}
</script>

<style lang="scss">
.active-green{
  background-color: #00FF33;
}
</style>
