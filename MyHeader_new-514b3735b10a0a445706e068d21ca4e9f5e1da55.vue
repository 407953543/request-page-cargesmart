<template>

 <div>
            <el-dialog
              :visible.sync="restoreDialogVisible"
              size="tiny"
              >
               <h1 class="dialog-title">{{$t('NOTICE')}}</h1>
              <span class="restore-content">{{$t('RESTORE_CONTENT')}}</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="deleteRestore" class="btn">{{$t('RESTORE_NO')}}</el-button>
                <el-button @click="restoreBRData" class="btn">{{$t('RESTORE_YES')}}</el-button>
              </span>
            </el-dialog>

  <div class="header-container">
    <div class="home-container header" :class="objectClass">
      <el-row>

        <el-col class="logoClass" :span="12">
          <img class="logo" src="../../../static/logo_cosco.png"  @click="testGet"/>
        </el-col>

        <el-col :span="7">
        </el-col>

        <el-col :span="5">
          <el-row>
            <el-col class="el-icon-information1" :span="14" style="cursor:pointer">
              <!--<el-badge :value="isCancel?0:'!'" :class="isclick?'hadClick':'item'">-->
                <el-tooltip effect="dark" :content="$t('MYNOTICE')" placement="top">
                  <img src="../../../static/icon-restore.svg" class="person2"  @click="isRestore()">
                  <!--<el-button type="info" :plain="isclick"  class="el-icon-information" @click="isRestore()"></el-button>-->
                </el-tooltip>
              <!--</el-badge>-->
            </el-col>

            <el-col class="language-wrap" :span="10">
              <el-dropdown @command="changeLang" class="langDropdown">
                <el-button type="primary" class="langDropdownBut">
                  {{langV}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="lan-menu">
                  <el-dropdown-item
                    ga-on="click"
                    ga-event-action="click"
                    :ga-event-label="lang"
                    command="en"
                    :label="language_switch_english" class="language-tap">EN</el-dropdown-item>
                  <el-dropdown-item
                    ga-on="click"
                    ga-event-action="click"
                    :ga-event-label="lang"
                    command="zh"
                    :label="language_switch_chinese" class="language-tap">简体</el-dropdown-item>
                  <el-dropdown-item
                    ga-on="click"
                    ga-event-action="click"
                    :ga-event-label="lang"
                    command="tr"
                    :label="language_switch_tradich" class="language-tap">繁体</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>

          <el-row class="self">
            <el-col :span="12" class="person1">
              <img src="../../../static/icon-user.svg" class="person">
            </el-col>

            <el-col :span="12" class="userid1">
              <div class="userid">
                <el-dropdown class="">
                  <el-button type="primary" class="" style="border: transparent" >
                    {{userId}}<i class="el-icon-caret-bottom el-icon--right useridBut"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      class="">setting</el-dropdown-item>
                    <el-dropdown-item
                      class="">sigh out</el-dropdown-item>

                  </el-dropdown-menu>
                </el-dropdown>
              </div>

            </el-col>

          </el-row>
        </el-col>



      </el-row>
    </div>


  </div>
 </div>

</template>

<script>

  import {mapGetters,mapActions} from 'vuex'
  import mutationTypes from '../../store/mutationTypes'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {ElCol, ElRow},
    mounted() {
      this.initLanguage();
      this.initobjectClass();
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    data() {
      return {
        language_switch_chinese: 'zh',
        language_switch_english: 'en',
        language_switch_tradich: 'tr',
        langS:'',
        langV:'',
        restoreDialogVisible:false,
        isclick:false,
        isCancel:false,
        userId:window.user.userId,//userid
        //screenWidth:screen.width,
        screenWidth: document.body.clientWidth,
        objectClass:{
            classSmall:false,
            classBig:true,
        },
      }
    },
    watch: {
      screenWidth(val){
        this.screenWidth = val;
        if(this.screenWidth <= 976){
          this.objectClass.classSmall = true;
          this.objectClass.classBig = false;
        }else {
          this.objectClass.classSmall = false;
          this.objectClass.classBig = true;
        }
      },
      "langS":function(val){
          if(val == 'tr'){
              this.langV = '繁体';
          }else if(val == 'en'){
            this.langV = 'EN';
          }else if(val == 'zh'){
            this.langV = '简体';
          }

      }
    },
    methods: {
      // //////////////////

       open5() {
        this.$message("No Booking Request to restore");
      },
      isRestore(){
        if(this.isclick){
          this.open5();
        }
        else{
          this.restoreBookingRequest();
        }

      },
      ...mapActions(["setRecovery","setRestoreBR"]),
      restoreBRData(){
        this.setRecovery(true);
        this.restoreDialogVisible = false;
        this.isclick=true;
      },
        restoreBookingRequest(){
        try {
          var self = this;
          self.$http.get('/api/restore/getRecoverableBR', {showProgressBar: false})
            .then(function (res) {

              if (res.data.success&&res.data.result) {
                self.restoreDialogVisible = true&&!self.isclick;
                self.setRestoreBR(res.data.result);
              } else {
                self.restoreDialogVisible = false;
                self.isclick = true;
              }
            })
        } catch (err) {
        }
      },

      deleteRestore:function(){
        this.isCancel=true;
        let self = this;
        this.$http.get('/api/restore/deleteRestore').then(function(res){
          self.restoreDialogVisible = false;

        })
      },
      ///////////////////////////////////////////////////////////////////////////
      testGet(){
        this.$http.get('/api/test/testGet').then((res) => {
          console.log(res.data)
        }).catch(function (res) {
          console.log('Something error')
        })
      },
      initLanguage(){
        var lang = sessionStorage.getItem("lang");
        if (lang) {
          this.$store.commit(mutationTypes.SET_DEFAULT_LANGUAGE, lang);
          this.langS = lang;
        }
      },
      initobjectClass(){
          if(this.screenWidth <= 976){
              this.objectClass.classSmall = true;
              this.objectClass.classBig = false;
          }else {
            this.objectClass.classSmall = false;
            this.objectClass.classBig = true;
          }
      },
      changeLang(command){
          console.log(command);
        this.$i18n.locale = command;
        sessionStorage.setItem("lang", command);
        this.$store.commit(mutationTypes.SET_DEFAULT_LANGUAGE, command);
      }
    },
    computed: {
      ...mapGetters({
        languages: "getLanguages"
      }),
      lang: {
        get () {
          var lang = this.$store.state.bookingRequest.language.default;
          this.$i18n.locale = lang;
          this.langS = lang;
          return lang;
        },
        set (label) {
          this.$i18n.locale = label;
          sessionStorage.setItem("lang", label);
          this.$store.commit(mutationTypes.SET_DEFAULT_LANGUAGE, label);
          this.langS = label;
        }
      }
    }
  }

</script>

<style scoped>


  .header {
    height: 75px;
    min-height: 60px;
  }
  .header-container{
    background-color: #E8E8E8;
    width: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    box-shadow: 2px 2px 2px #CCC;
  }
  .el-icon-information1 {
    right: 72px;
    /*float: right;*/
    position: fixed;
    top: 10px;
    width: auto;
    /*line-height: 50px;*/
  }

  .el-icon-information{
    width: 48px;
  }

  .language-wrap{
    right:0%;
    /*float: right;*/
    position: fixed;
    top:8px;
    width: auto;
    /*margin-top: 2px;*/
  }

  .self{
    top: 38px;
    float: right;

  }

  .person1{
    position: fixed;
    right: 122px;
    width: 91px;
    top: 49px;

  }

  .person2{
    position: fixed;
    right: 118px;
    width: 32px;
    float: left;


  }

  .userid1{
    position: fixed;
    width: auto;
    right: 1px;
    top: 43px;


  }

  .useridBut{
    width: 130px;
  }

  .el-button--primary {
    background-color: transparent !important;
    color:#00508e !important;
  }
  .el-button--primary:hover {
    background-color: transparent !important;
    color:#2c79b4 !important;
  }




  .userid{
    /*position: absolute;*/
    font-size: 18px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  }

  .person{
    width: 28%;
    height: 28%;
    /*right: 130px;*/
    float: right;
  }

  .classBig .person{

  }

  .classBig .language-wrap {

  }

  .classBig .el-icon-information1 {

   }

  .classBig .userid{

  }

  .classSmall{

  }

  .classSmall .language-wrap {

  }

  .classSmall .el-icon-information1 {


  }

  .classSmall .userid{

  }

  .classSmall .person{

  }

  .btn{
    height: 32px;
    width: 120px;
    border-radius: 2px;
    font-size: 12pt;
  }

  .langDropdown{
    background-color: transparent;
    float: right;
  }

  .langDropdownBut{
    width: auto;
    background-color: transparent !important;
    border-color: transparent !important;
    color: #00508c !important;
    text-align: center;
    font-size: 12pt;
  }

  .hadClick{
    display: none;
  }

  .item{
    /*margin-top: 8px;*/
    float: right;

  }

  .langDropdownBut:hover{
    background-color: transparent !important;
    border-color: transparent !important;
    color: #2c79b4 !important;
  }

  .dialog_header{
    background:red;
  }

  .dialog-title{
    margin-bottom: 20px;
    background: #00508E !important;
    height:20px;
    padding-bottom:10px;
  }

  .lan-menu{
    min-width: 60px;
  }
</style>
