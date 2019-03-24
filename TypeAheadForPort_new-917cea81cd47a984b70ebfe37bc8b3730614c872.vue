<template>

  <div class="wrap el-input" :class="{'is-error':!isValid && dirty}">
    <!-- optional indicators -->
    <!--<i class="fa fa-spinner fa-spin" v-if="loading"></i>
    <template>
      <span class="indicator-icon">
        <i class="fa fa-search" v-show="isEmpty"></i>
        <i class="fa fa-times" v-show="isDirty" @click="reset"></i>
      </span>
    </template>-->

    <!-- the input field -->
    <input type="text"
           :placeholder="placeholder"
           autocomplete="off"
           v-model="query"
           ref="input"
           @keydown.down="myDown"
           @keydown.up="myUp"
           @keydown.enter="hit"
           @keydown.esc="reset"
           @blur="inputBlur"
           @input="myUpdate"
           @focus="focus"
           class="el-input__inner">
    </input>

    <el-table v-if="loading && query!=''" :element-loading-text="$t('LOADING')" v-loading="true">
    </el-table>

    <transition name="el-zoom-in-top">
      <div class="el-form-item__error" v-if="!isValid && dirty">{{message}}</div>
    </transition>

    <!-- the list -->
    <transition name="el-zoom-in-top">
      <div>
        <ul v-if="hasItems && !blur && ((minChars && query.length>=minChars) || showRecommend)" class="ul-wrap" ref="ul">
          <li v-for="(item, $item) in items" :class="activeClass($item)" @mousedown="hit" @mousemove="setActive($item)">
            <span v-text="item.portName+', '+item.countryName"></span>
          </li>
        </ul>
        <ul v-show="!hasItems && isFocus && (minChars && query.length>=minChars) && !loading && !isAutoComplete" class="ul-wrap">
          <li>
            <span>No record found, please enter the complete name to search</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import VueTypeahead from 'vue-typeahead'

  export default {
    extends: VueTypeahead,

    data () {
      return {
        message:"",
        selectFirst: true,
        blur: true,
        isFocus: false,
        timeout: null,
        showRecommend:false
      }
    },
    props: {
      // loading: {
      //   type: Boolean
      // },
      recommendCallback:Function,
      dirty:Boolean,
      validate:{
        type:Function
      },
      debounce: {
        type: Number,
        default: function () {
          return 500;
        }
      },
      placeholder: {
        type: String
      },
      model: {
        type: Object,
        default: function () {
          return {}
        }
      },
      src: {
        type: String,
        required: true
      },
      limit: {
        default: function () {
          return 500;
        },
        type: Number
      },
      minChars: {
        default: function () {
          return 3;
        },
        type: Number
      },
      data: {
        default: function () {
          return {}
        },
        type: Object
      },
      queryName: {
        default: function () {
          return "query"
        },
        type: String
      },
      callback: {
        type: Function,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    },
    methods: {

      myUp()
      { 
        var ul = this.$refs.ul;
        var currentLi = ul.querySelector(".active");
        var activeLi = ul.querySelector(".active").previousSibling;
        if (!activeLi) {
          this.current = this.items.length - 1;
          ul.scrollTop = 9999;
          return;
        }
        if (activeLi.offsetTop < ul.scrollTop) {
          ul.scrollTop = activeLi.offsetTop;
        }
        this.up();
      },
      myDown()
      { 
        var ul = this.$refs.ul;
        var activeLi = ul.querySelector(".active").nextSibling;
        if (!activeLi) {
          this.current = 0;
          ul.scrollTop = 0;
          return;
        }
        var height = activeLi.offsetTop - ul.offsetHeight + activeLi.offsetHeight;
        if (ul.scrollTop > height) {
          this.down();
          return;
        }
        if (height > 0) {
          ul.scrollTop = height;
        }
        this.down();
      },
      myUpdate()
      { 
        this.blur = false;
        this.loading = true;
        this.$emit("update:model", {});
        this.showRecommend = false;
        var self = this;
        clearTimeout(this.timeout);
        this.items = [];
        var tempQuery = this.query.trim();
        if(!tempQuery){
            return;
        }
        if(!this.isValid){
            return;
        }
        this.query = this.query.replace(/^\s+/g,"");
        this.timeout = setTimeout(function () {
          self.update()
        }, this.debounce)
      },
      onHit(item)
      {
        this.query = this.items[this.current].portName+", "+this.items[this.current].countryName;
        this.blur = true;
        this.$emit("update:model", this.items[this.current]);
      },
      prepareResponseData(data)
      {
        return this.callback(data);
      },
      inputBlur()
      {
        this.blur = true;
        this.items = [];
        this.loading = false;
        this.isFocus = false;
        //this.dirty = true;
        this.$emit("update:dirty",true);
        //this.current = 0;
      },
      focus()
      {
        this.blur = false;
        this.isFocus = true;
        this.$refs.input.select();

        var self = this;
        if(!this.value.trim()){
            this.recommendCallback(this.value,function(array){
                self.items = array;
                if(array.length != 0){
                    self.current = 0;
                    self.showRecommend = true;
                }
            });
        }
      }
    },
    watch: {
      query(value)
      {
        this.$emit("update:value", value);
      },
      value(value)
      {
        this.query = value;
      }
    },
    mounted()
    {
      this.queryParamName = this.queryName;
      this.query = this.value;//get from parent
    },
    computed: {
      isAutoComplete()
      {
        return Object.keys(this.model).length != 0;
      },
      isValid(){
          var error = this.validate(this.value,this.model);
          var flag = true;
          if(error){
              this.message = error.message || "";
              flag =false;
          }
          this.$emit("validate",flag);
          return flag;
      }
    }
  }
</script>

<style scoped>
  ul, li {
    display: block;
    padding: 0;
    margin: 0;
    color: #2C79B4;
    box-sizing: border-box;
  }

  li {
    list-style: none;
    font-size: 16px;
    margin: 3px 0;
    padding: 3px 10px;
    cursor: pointer;
    height: 36px;
  }

  li.active {
    background: #F7F7FB;
    color: #5D6795;
  }


  .wrap {
    position: relative;
  }

  .indicator-icon {
    position: absolute;
    right: 0;
    top: 5px;
  }

  .ul-wrap {
    width: 100%;
    border: 1px solid rgb(191, 203, 217);
    margin-top: 2px;
    position: absolute;
    z-index: 999;
    background: #FFF;
    max-height: 250px;
    overflow: auto;
    border-radius: 2px;
  }
</style>
