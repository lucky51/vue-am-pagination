
# Vue am-pagination

A Plugin for pagination

## Usage

```html
<div id="app">
      <am-pagination 
        prev-text="&laquo;"  
        next-text="&raquo;" 
        first-text="&laquo;&laquo;" 
        last-text="&raquo;&raquo;" 
        :rotate="rotate"
        :item-totals="totals" 
        :force-ellipses="true"  
        :page.sync ="current" 
        :max-size="7" 
        :hide-if-empty="false" 
        active-class="active-green" 
        @page-change="pageChange" 
        :page-size="psize">
        <!--define  template ,you can delete it-->
        <!--begin-->
        <a slot-scope="{index}" >
          {{index+1+'~'}}
        </a>
        <a slot="boundary-last-numbers" slot-scope="{index}">
          {{index+1+'~'}}
        </a>
        <a href="#" slot="boundary-first-numbers" slot-scope="{index}">
          {{index + 1 + ' fixed'}}
        </a>
        <!--end-->
      </am-pagination>
      <hr />
    <button @click="moveTo">move to {{current}}</button>
  
    <button @click="chsize">pageSize : {{psize}}</button>
    <button @click="chtotal">item totals : {{totals}}</button>
    <button @click="switchrotate">switch rotate : {{rotate}}</button>
   <span>{{'page totals:' + pagetotal }}</span>
  </div>  
```

```js
import ampag from 'vue-am-pagination'

Vue.use(ampag);


 methods: {
    pageChange(from,to){
        console.log(from +":" + to);
    }
},
data () {
    return {
      current:2,
      msg: 'Welcome to vue-am-pagination',
      psize:2
    }
  }
```

![avatar](https://github.com/lucky51/vue-am-pagination/blob/master/images/am-pagination.jpg?raw=true)

![avatar](https://github.com/lucky51/vue-am-pagination/blob/master/images/am-pagination1.png?raw=true)

## Properties

| Property | Type | Default |
| :------:|:------:|:------:|
|prev-text|String| &laquo;|
|next-text|String| &raquo;|
|first-text|String|&laquo;&laquo;|
|last-text|String|&raquo;&raquo;|
|rotate |Boolean|true|
|item-totals|Number|1|
|force-ellipses|Boolean|true|
|page.sync|Number|1|
|max-size|Number|7|
|hide-if-empty|Boolean|true|
|page-change|Function&Event| \ |
|page-size|Number|10|
|boundary-links|Boolean|true|
|direction-links|Boolean|true|
|boundary-pages|Number( condition< max-size)|0|
|container-class|String|am-p|
|disabled-class|String|disabled|
|active-class|String|active|
|next-class|String|next|
|last-class|String|last|
|first-class|String|first|
