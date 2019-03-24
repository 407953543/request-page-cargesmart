<template>
  <div>
    <el-dialog :title="$t('RESTORE_NOTICE')" :visible.sync="restoreDialogVisible" size="tiny">
      <span class="restore-content">{{$t('RESTORE_CONTENT')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteRestore">{{$t('RESTORE_NO')}}</el-button>
        <el-button type="primary" @click="restoreBRData">{{$t('RESTORE_YES')}}</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-col class="menuBar">
        <el-col class="menu-wrap" v-bind:class="{ placeToTop: currentPage.placeToTop == true}"
                style="text-align: center;">
          <div class="menu_line" style="margin-top: 65px" :offset="3" :span="18"></div>
          <el-col :span="4"><img src="../../../static/logo_small.png" class="logo"></el-col>
          <el-col :span="16">
            <el-col :class="[currentPage.value=='routing'?'menu_item_active':'menu_item']" :span="3">
              <div @click="changePage('routing')">
                <div class="title_text">
                  <el-badge :hidden='!isClickSubmit' :value="routingError"><span>{{$t('SIDEBAR_ROUTING')}}</span>
                  </el-badge>
                </div>
                <el-progress type="circle" :percentage="routingProgressResult" class="progress" :stroke-width="30"
                             :show-text="false"></el-progress>
              </div>
            </el-col>

            <el-col :class="[currentPage.value=='parties'?'menu_item_active':'menu_item']" :span="3">
              <div @click="changePage('parties')">
                <div class="title_text">
                  <el-badge :hidden='!isClickSubmit' :value="partiesError"><span>{{$t('SIDEBAR_PARTIES')}}</span>
                  </el-badge>
                </div>
                <el-progress type="circle" :percentage="partiesProgressResult" class="progress" :stroke-width="30"
                             :show-text="false"></el-progress>
              </div>
            </el-col>
            <el-col :class="[currentPage.value=='cargo'?'menu_item_active':'menu_item']" :span="3">
              <div @click="changePage('cargo')">
                <div class="title_text">
                  <el-badge :hidden='!isClickSubmit' :value="cargoError"><span>{{$t('SIDEBAR_CARGO')}}</span></el-badge>
                </div>
                <el-progress type="circle" :percentage="cargoProgressResult" class="progress" :stroke-width="30"
                             :show-text="false"></el-progress>
              </div>
            </el-col>
            <el-col :class="[currentPage.value=='container'?'menu_item_active':'menu_item']" :span="3">
              <div @click="changePage('container')">
                <div class="title_text">
                  <el-badge :hidden='!isClickSubmit' :value="containerError"><span>{{$t('SIDEBAR_CONTAINER')}}</span>
                  </el-badge>
                </div>
                <el-progress type="circle" :percentage="containerProgressResult" class="progress" :stroke-width="30"
                             :show-text="false"></el-progress>
              </div>
            </el-col>

            <el-col :class="[currentPage.value=='haulage'?'menu_item_active':'menu_item']" :span="3">
              <div @click="changePage('haulage')">
                <div class="title_text">
                  <el-badge :hidden='!isClickSubmit' :value="haulageError"><span>{{$t('SIDEBAR_HAULAGE')}}</span>
                  </el-badge>
                </div>
                <el-progress type="circle" :percentage="haulageProgressResult" class="progress" :stroke-width="30"
                             :show-text="false"></el-progress>
              </div>
            </el-col>

            <el-col :class="[currentPage.value=='rateReference'?'menu_item_active':'menu_item']" :span="3">
              <div @click="changePage('rateReference')">

                <div class="title_text">
                  <el-badge :hidden='!isClickSubmit' :value="rateReferenceError">
                    <span>{{$t('SIDEBAR_RATEREFERENCE')}}</span></el-badge>
                </div>
                <el-progress type="circle" :percentage="rateProgressResult" class="progress" :stroke-width="30"
                             :show-text="false"></el-progress>
              </div>
            </el-col>
            
            <el-col :class="[currentPage.value=='others'?'menu_item_active':'menu_item']" :span="3">
              <div @click="changePage('documentUpload')">
                <div class="title_text">
                  <el-badge :hidden='!isClickSubmit' :value="specialRequirementProgressError"><span>{{$t('SIDEBAR_SPECIALREQUIREMENT')}}</span>
                  </el-badge>
                </div>
                <el-progress type="circle" :percentage="othersProgressResult" class="progress" :stroke-width="30"
                             :show-text="false"></el-progress>
              </div>
            </el-col>

          </el-col>



<!--//////////////////-->
        </el-col>
      </el-col>





      <el-col class="floatIcons">
        <div class="floatIcon" @click="goPreview"><i
          class="fa fa-file-video-o"></i><span>{{$t('SIDEBAR_PREVIEW')}}</span></div>
        <div class="floatIcon" @click="copyBookingVisible = true">
          <i class="fa fa-copy"></i><span>{{$t('SIDEBAR_COPY')}}</span></div>
        <div class="floatIcon" @click="openScreenShot"><i class="fa fa-edit"></i><span>{{$t('SIDEBAR_FEEDBACK')}}</span>
        </div>
        <div class="floatIcon" @click="openOnlineChat"><i class="fa fa-commenting-o"></i><span>{{$t('ONLINE_CHAT')}}</span></div>
      </el-col>
    </el-row>
    <el-row class="">
      <el-col class="buttons">
        <el-col :offset="8" :span="8">

              <a class="btn-v submit" @click="checkAllValidate"
               :class="[TotalProgressResult=='100%'?'submit-button':'progress-button',uploadingStatus==true?'disabled':null]" >
              <div class="div-a">{{$t('SIDEBAR_SUBMIT')}}</div>
              <svg class="btn-v1 btn-progress">
                <rect x="0" y="0" fill="none" width="100%" height="100%"></rect>
                <rect x="0" y="0" fill="none" :width="TotalProgressResult" height="100%" ref="submitProgress"
                      :class="[TotalProgressResult=='100%'?'fullSubmitProgress':'submitProgress']"></rect>
              </svg> 
               </a>

          <!--a class="btn-v btn-1 submit-button" @click="checkAllValidate"
             :class="[TotalProgressResult=='100%'?'submit-button':'progress-button']">
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%"></rect>
              <rect x="0" y="0" fill="none" :width="TotalProgressResult" height="100%" ref="submitProgress"
                    :class="[TotalProgressResult=='100%'?'fullSubmitProgress':'submitProgress']"></rect>
            </svg>
            <span style="z-index:100000">{{$t('SIDEBAR_SUBMIT')}}</span>
          </a-->
        </el-col>
      </el-col>
    </el-row>
    <div>
      <el-dialog class="feedback" title="Feedback" :visible.sync="isScreenShotVisible" autosize @close="cancelFeedback"
                 size="small">
        <el-form label-position="top">
          <el-form-item label="Comment">
            <el-input v-model="feedbackContent" auto-complete="off" :placeholder="$t('FEEDBACK_COMMENT')"></el-input>
          </el-form-item>
          <div id="canvasDiv" width="100%">
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelFeedback">Cancel</el-button>
          <el-button type="primary" @click="confirmFeedback">Confirm</el-button>
        </div>
      </el-dialog>
    </div>
    <copy-booking-modal :copyBookingVisible.sync="copyBookingVisible"></copy-booking-modal>
    <online-chat :online-chat-visible.sync="onlineChatVisibleH"></online-chat>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex"
  import menuBarMinxin from '../mixins/menuBar.mixin'
  import routeMinxin from '../mixins/routing.mixin'
  import progressMixin from '../mixins/progress.mixin'
  import languageMixin from '../mixins/language.mixin'
  import CopyBookingModal from './DuplicateBookingModal'
  import OnlineChat from './OnlineChat'
  export default {
    props: ['menuBar', 'bookingRequest', 'currentPage', 'preview', 'userId'],
    mixins: [routeMinxin, menuBarMinxin, progressMixin, languageMixin],
    components: {
      CopyBookingModal,
      OnlineChat
    },
    computed: {
      ...mapGetters({
        uploadingStatus: 'getUploadDocumentStatus',
      }),
    },
    mounted(){
      this.initLanguage();
      this.test();
    },
    data() {
      return {
        isShowButtons: false,
        placeToTop: false,
        language: '中',
        language_switch_chinese: 'zh',
        language_switch_english: 'en',
        language_switch_tradich: 'tr',
        isClickSubmit: false,
        copyBookingVisible: false,
        onlineChatVisibleH: false,
        feedbackContent: '',
        isScreenShotVisible: false,
        isclick1:false,
        restoreDialogVisible:false
      }
    },
    methods: {
      ...mapActions(["setSubmitStatus","setValidateCount","setRecovery","setRestoreBR"]),
      test(){
      },

      open5() {
        this.$message("No Booking Request to restore");
      },
      isRestore(){

        if(this.isclick1){
          this.open5();
        }
        else{
          this.restoreBookingRequest();
        }

      },

      restoreBRData(){
        this.setRecovery(true);
        this.restoreDialogVisible = false;
        this.isclick1=true;
      },
        restoreBookingRequest(){
        try {
          var self = this;
          self.$http.get('/api/restore/getRecoverableBR', {showProgressBar: false})
            .then(function (res) {

              if (res.data.success&&res.data.result) {
                self.restoreDialogVisible = true&&!self.isclick1;
                self.setRestoreBR(res.data.result);
              } else {
                self.restoreDialogVisible = false;
                self.isclick1=true;
              }
            })
        } catch (err) {
        }
      },

      deleteRestore:function(){
        let self = this;
        this.$http.get('/api/restore/deleteRestore').then(function(res){
          self.restoreDialogVisible = false;
        })
      },

      changePage(page){
        this.currentPage.value = page;
        window.scrollTo(0, document.getElementById(page).offsetTop - 150);
      },
      openOnlineChat: function () {
        this.onlineChatVisibleH = true
      },
      submitBRData: {},
      testGet(){
      },
      goPreview: function () {
        var self = this;
        self.preview.previewValidate = true;
        self.setSubmitStatus(true)
      },

    },

  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./../../assets/css/theme";

  img {
    visibility: hidden;
  }

  .logo {
    display: block;
    overflow: hidden;
    //width: 120px;
    //height: 55px;
    margin: 15px 0 0 27px;
    width: 50%;

  }

  .language_switch {
    line-height: 70px;
    text-align: center;
  }

  .floatIcons {
    width: 60px;
    text-align: center;
    position: fixed;
    top: 55%;
    right: 0;
    z-index: 900;
    opacity: 1;
    font-size: 12px;
  }

  .floatIcon {
    background-color: @lightMenuButton;
    height: auto;
    border: 1px solid @horizonFloatIconBorderColor;
    padding: 10px 0px;
    cursor: pointer;
    text-align: center;
    color: @horizonFloatIconColor;
  }

  .floatIcon i {
    font-size: 20px;
  }

  .floatIcon:hover {
    background-color: #2c79b4;
    height: auto;
    border: 1px solid @horizonFloatIconColorHover;
    cursor: pointer;
    text-align: center;
    color: @horizonFloatIconColorHover;
  }

  .floatIcon span {
    display: block;
  }

  .menuBar {
    text-align: center;
    margin-left: -20px;
  }

  .menu-wrap {
    min-width: 660px;
    position: fixed;
    background-color: #FFF;
    z-index: 999;
    box-shadow: 2px 2px 2px #CCC;
    height: 75px;
    top: 75px;
  }

  .progress {
    z-index: 999;
    background-color: #FFF;
    margin-top: 33px;
  }

  .title_text {
    width: 75px;
    height: 40px;
    font-size: 12pt;
    text-align: center;
    position: absolute;

    bottom: 25px;
    margin-left: 2%;
  }

  .menu_line {
    height: 2px;
    background-color: #CCC;
    position: absolute;
    margin: -10px 22%;
    text-align: center;
    width: 50%;
    top: -15px;
  }

  .menu_item_active, .menu_item {
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    margin-top: 8px;
    display: inline-block;
  }

  .menu_item:hover {
    margin-bottom: 20px;
    font-weight: bolder;
    font-size: 16px;
    color: #2c79b4;
  }

  .menu_item_active {
    margin-bottom: 20px;
    font-weight: bolder;
    font-size: 16px;
    color: #2c79b4;
  }

  .menu_item span, .menu_item_active span {
    display: block;
    padding: 0 12px 0 0;
  }

  //navicon style
  .navicon {
    /*position: absolute;*/
    top: 700px;
    right: 0px;
    float: right;
    position: fixed;
    cursor: pointer;
  }

  .buttons {
    height: 60px;
    bottom: 0px;
    position: fixed;
    padding-bottom: 30px;
    width: 100%;
    z-index: 999;
    text-align: center;
    background-color: #FFF;
    box-shadow: 0px -2px 2px #CCC;
    margin-left: -20px;
  }

  /*button style*/
  .btn-v {
    cursor: pointer;
    display: inline-block;
    font-size: 16pt;
    height:36px;
    line-height: 2.5rem;
    margin: 0.5rem auto;
    max-width: 200px;
    position: relative;
    text-decoration: none;
    vertical-align: middle;
    width: 200px;
    text-align: center;
  }

  .btn-v1 {
    cursor: pointer;
    display: inline-block;
    font-size: 16pt;
    line-height: 36px;
    margin: 0.5rem auto;
    max-width: 200px;
    position: absolute;
    text-decoration: none;
    vertical-align: middle;
    width: 100%;
    text-align: center;
    z-index:100;
  }

  .btn-progress {
    background: transparent;
    color:white;
    //background:@lightMenuButton;
    height:36px;
    border:1px  @lightMenuButton;
    border-radius:2px;
  }


  .btn-progress:hover {
    border:1px  #2c79b4;
  }


  .progress-button {
    color: @lightMenuButton;
  }
  .progress-button:hover {
    color: #2c79b4;
  }

  .submit-button {
    border: 1px;
    color: white;
    //background:#2c79b4;
    //border-color:#2c79b4;
    text-decoration: none;
  }

  .btn-v:hover {
    color: white;
    //background:#2c79b4;
    border-color:#2c79b4;
    text-decoration: none;
  }

  .btn-1 {
    //background: transparent;
    color:white;
    background:@lightMenuButton;
  }

  .btn-1:hover {
    //background: transparent;
    color:white;
    background:#2c79b4;
    border-color:#2c79b4;
  }

  .btn-1 svg {
    height: 36px;
    left: 0;
    position: absolute;
    top: 0;
    width: 200px;
    border-radius: 2px;
    font-size: 16pt;
  }

  .btn-1 rect {
    fill: none;
    //stroke: @submit_primaryColor;
    stroke-width: 2;
    stroke-dasharray: 622, 0;
    border-radius: 2px;
    rx: 5;
    ry: 5;
  }

  .draft-button rect {
    fill: none;
    stroke: @lightMenuButton;
    stroke-width: 2;
    stroke-dasharray: 622, 0;
    border-radius: 3px;
    rx: 5;
    ry: 5;
  }

  .template-button rect {
    fill: none;
    stroke: @lightMenuButton;
    stroke-width: 2;
    stroke-dasharray: 622, 0;
    border-radius: 2px;
    rx: 5;
    ry: 5;
  }

  .template-button:hover rect {
    stroke-width: 2;
    stroke-dasharray: 99, 382;
    stroke-dashoffset: 250;
    -webkit-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
    transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .submit-button:hover rect {
    stroke-width: 4;
    /*stroke-dasharray: 47, 460;*/
    /*stroke-dashoffset: 250;*/
    /*-webkit-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);*/
    /*transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);*/
  }

  .placeToTop {
    top: 0;
  }

  .placeToTop  img {
    visibility: visible;
  }

  .submitProgress {
    fill: @lightMenuButton !important;
    color:white;
    border-radius:2px;
    //opacity:0.8
  }

  .submitProgress:hover {
    
    fill: #2c79b4 !important;
    color:white;
    border-radius:2px;
    //opacity:0.8
  }

  .fullSubmitProgress {
    fill: @lightMenuButton !important;
    color:white;
    border-radius:2px;
    //opacity: 0.8
  }

  .fullSubmitProgress:hover{
   
    fill: #2c79b4 !important;
    color:white;
    border-radius:2px;
    //opacity: 0.8
  }
  .item{
    /*left: 400px;*/
    right:20px;
    float: right;
    position: relative;
    top:10px
  }

  .div-a{ 
    position:absolute;
    z-index:200;
    padding-left:80px;
  }

  .submit {
    //background:@lightMenuButton;
    color:white;
    //border:1px solid @lightMenuButton;
    border-radius:2px;
    padding-bottom:45px;
    padding-top:7px;
    padding-right:150px;
  }
  .submit:hover{

  }

  .submit svg {
    height: 36px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background:#94c4e8;
  }

  .submit rect {
    fill: none;
    stroke: @lightMenuButton;
    stroke-width: 2;
    stroke-dasharray: 622, 0;
    border-radius: 2px;
    rx: 5;
    ry: 5;
  }
</style>
