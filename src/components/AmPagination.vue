<template>
    <ul :class="containerClass" v-show="showItem"  v-if="!(hideIfEmpty&&totals<=0)">
        
        <li v-if="boundaryLinks"  :class="pIndex==0||totals<=0?'disabled':firstClass" @click="selFirst" v-html="firstText"></li>
     
        <li   v-if="directionLinks" :class="pIndex==0||totals<=0?disabledClass:prevClass" @click="selPrev" v-html="prevText"></li>
        
        <li  v-if="boundaryFirst" @click="selPage(fir)" v-for="fir in boundaryFirst" :class="fir==pIndex?activeClass:''" :key="'key'+fir">
            <slot :index="fir" name="boundary-first-numbers">
                <a href="#" class="p-link">{{fir+1}}</a>
            </slot>
        </li>
        <li class="ellipses" v-if="!(boundaryPages>0&&boundaryPages=== pageArea[0])" @click="loadMores(0)" key="keyprevmores"  v-show="showPrevEllipses">...</li>
        <transition-group  name="slide">
        <li   v-for="item in (pageArea)"  @click="selPage(item)"  :class="item==pIndex?activeClass:''" :key="item">           
            <slot :index="item">
                <a href="#" class="p-link">{{item +1 }}</a>
            </slot>
        </li>
        </transition-group>
        <li class="ellipses" @click="loadMores(666666)" v-if="!(boundaryPages>0&&pageArea[pageArea.length-1]+1===pageCount.length-boundaryPages)"  key="keynextmores" v-show="showNextEllipses">...</li>
        <li  v-if="boundaryLast" @click="selPage(last)" :class="last==pIndex?activeClass:''" v-for="last in boundaryLast" :key="'key'+last">
            <slot :index="last" name="boundary-last-numbers">
                <a href="#" class="p-link">{{last+1}}</a>
            </slot>
        </li>
        
        <li  v-if="directionLinks" :class="pIndex==pageCount.length-1||totals<=0?disabledClass:nextClass"  @click="selNext" v-html="nextText"></li>
        <li  v-if="boundaryLinks" :class="pIndex==pageCount.length-1||totals<=0?disabledClass:lastClass" @click="selLast" v-html="lastText" ></li>
        
    </ul>
</template>

<script>
export default {
    name:'AmPagination',
    props: {
        hideIfEmpty:{
            type:Boolean,
            default:true
        },
        page:{
            type:Number,
            default:1
        },
        pageSize:{
            type:Number,
            default:10
        },
        itemTotals:{
            type:Number,
            default:1
        },
        maxSize:{
            type:Number,
            default:7
        },
        rotate:{
            type:Boolean,
            default:true
        },
        firstText:{
            type:String,
            default:'&laquo;&laquo;'
        },
        lastText:{
            type:String,
            default:'&raquo;&raquo;'
        },
        forceEllipses:{
            type:Boolean,
            default:true
        },
        prevText:{
            type:String,
            default:'&laquo;'
        },
        nextText:{
            type:String,
            default:'&raquo;'
        },
        boundaryLinks:{
            type:Boolean,
            default:true
        },
        directionLinks:{
            type:Boolean,
            default:false
        },
        boundaryPages:{
            type:Number,
            default:2
        },
        containerClass:{
            type:String,
            default:'am-p'
        },
        disabledClass:{
            type:String,
            default:'disabled'
        },
        activeClass:{
            type:String,
            default:'active'
        },
        prevClass:{
            type:String,
            default:'prev'
        },
        nextClass:{
            type:String,
            default:'next'
        },
        lastClass:{
            type:String,
            default:'page-last'
        },
        firstClass:{
            type:String,
            default:'page-first'
        }
    },
    data () {
        return {
            pIndex: this.page-1,
            nextMores:false,
            prevMores:false,
            showItem:true
        }
    },
    created () {
        this.pIndex =this.page-1;
        if(this.pIndex<0) throw 'page invalid!';
        if(this.boundaryPages>=this.maxSize) throw 'boundary-pages invalid';
    },
    methods: {
      updatePage(){
        if(this.page !==this.pIndex+1){
            this.$emit('update:page', this.pIndex+1)
        }
      },
      selPage(idx){       
          this.pIndex = idx;     
      },
      selPrev(){
        if(this.pIndex===0){
          return ;
        }
        this.pIndex =  --this.pIndex ;
      },
      loadMores(aors){
          if(aors){
              this.pIndex = this.pIndex +this.maxSize >this.pageCount.length-1?this.pageCount.length-1:this.pIndex+this.maxSize;
          }else{
              this.pIndex = this.pIndex - this.maxSize<0 ?0:this.pIndex - this.maxSize;
          }
      },
      selNext(){
        if(this.pIndex ===this.pageCount.length-1)return ;
        this.pIndex = ++this.pIndex ;
      },
      selFirst(){
          if(this.pIndex <=0) return;
          this.pIndex = 0;
      },
      selLast(){
          if(this.pIndex >=this.pageCount.length)return ;
          this.pIndex = this.pageCount.length-1;
      }
    },
    watch:{
        pIndex:{
            immediate:true,
            handler(to,from){
                this.updatePage();
                this.$emit("page-change",from,to);
                this.showItem =!this.showItem;
                setTimeout(()=>{
                    this.showItem = true;
                },0.01)
            }
        },
        page:{
            immediate: true,
            handler(val,oval) {
                if(val !==oval && this.pIndex<this.pageCount.length){
                    this.pIndex = val-1;
                }            
            }
        },
        pageSize:{
            immediate:true,
            handler(val,old){
                if(val !==old && this.pIndex>=this.pageCount.length){
                    this.pIndex = 0;
                }
            }
        },
        itemTotals:{
            immediate:true,
            handler(val,old){
                if(val !==old && this.pIndex>=this.pageCount.length){
                    this.pIndex = 0;
                }
            }
        }       
    },
    computed: {
        boundaryFirst(){
           if( this.boundaryPages>0 && this.boundaryPages<this.maxSize && this.prevMores){
               return [...Array(this.boundaryPages).keys()];
           }
           else {
               return null;
           }
        },
        boundaryLast(){
            var result = [];
            if(this.boundaryPages>0 && this.boundaryPages <this.maxSize &&this.nextMores){
                for (let l = this.pageCount.length-this.boundaryPages; l < this.pageCount.length;l++){  
                    result.push(l);
                }
                return result;
            }else{
                return null;
            }
        },
        totals(){
            return this.itemTotals;
        },
        pSize(){
            return this.pageSize;
        },
        pageArea(){
          let arr =[];
          let begin ,end ;
          if(this.maxSize ===-1 ||this.maxSize ==null){
           return this.pageCount;
          }else{
                if(this.rotate){
                    var half = this.maxSize % 2 ===0 ?this.maxSize /2 :Math.floor(this.maxSize /2);
                        begin = this.pIndex - half  ;
                        if(this.boundaryPages > 0 ){
                            begin = begin <= this.boundaryPages-1 ?this.boundaryPages :begin;
                        }
                        end = begin <0 ? this.maxSize : (begin+this.maxSize);
                        begin = end >this.pageCount.length  ?this.pageCount.length -this.maxSize :begin;
                        if(this.boundaryPages>0){
                            end = end > this.pageCount.length -this.boundaryPages ?this.pageCount.length -this.boundaryPages:end;
                            begin = end - this.maxSize;
                            if(begin<=this.boundaryPages-1){
                                begin =this.boundaryPages;
                            }
                        }

                }else{
                    begin =this.pIndex - this.pIndex % this.maxSize
                    end = begin + this.maxSize;
                }
            if(end >= this.pageCount.length){
                end = this.pageCount.length;
                this.nextMores  = false;
            }else{
                this.nextMores =true;
            }
            if(begin <= 0) {
                begin =0;
                this.prevMores = false;
            }else{
                this.prevMores = true;
            }          
          }        
          for (let p = begin; p < end; p++) arr.push(p); 
          
          return arr; 
        },
        pageCount(){     
           return [ ...Array(Math.ceil(this.totals/this.pSize)).keys()];
        },
        showPrevEllipses(){
          return this.forceEllipses  && this.prevMores;
        },
        showNextEllipses(){
          return this.forceEllipses && this.nextMores;
        }       
    }
}
</script>

<style lang="scss" scoped>
               @keyframes myfade
                    {
                    from {opacity: 0;}
                    to {opacity:10 ;}
                    }
    .am-p{
            border:0px;
            animation-duration: 0.5s;
            animation-name: myfade;
            display: inline-block;
            list-style:none;
            width: auto;
            height: 34px;        
            top: 50px;
            li{
                    border-radius: 15px;
                    //animation: myfirst 1s;// name duration timing-function delay iteration-count direction fill-mode;
                    text-align: center;
                    line-height: 35px;
                    font-size: 20px;
                    margin: 5px 2px;
                    border: 1px solid #EEEEEE;
                    padding: 5px 10px;
                    display:inline;
                    cursor: pointer;
                    vertical-align: middle;
                    a{
                        text-decoration: none;
                    }
            }
            .active{
                background-color: #FE4555;
                color: #FFFFFF;
            }
            .active-green{
                background-color:#00FF33;
                color: red;
            }
            .prev{
                color: red;
                padding: 5px 20px;
               
                text-align: center;
               
                display: inline;
                cursor: pointer;
            }
            .next{
                color: red;
                padding: 5px 20px;
              
                text-align: center;
                display: inline;
                cursor: pointer;
              
            }
          
            .ellipses{
                padding-bottom:6px;
            }
            .disabled{
                padding: 5px 20px;
                border: #EEEEEE;
                background-color: #EEEEEE;
                cursor:not-allowed;
                display: inline;
            }
    }

</style>

