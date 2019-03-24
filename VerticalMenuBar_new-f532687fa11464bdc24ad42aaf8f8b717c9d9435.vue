<template>
  <div class="">
    <div class="menu_bar">
      <el-row class="menu_wrap">
        <el-col>
          <div class="icon_line"></div>
        </el-col>
          <el-col :class="[currentPage.value=='routing'?'menu_item_active':'menu_item']">
            <div @click="changePage('routing')" ref="routing" ga-on="click" ga-event-category="routing" ga-event-action="vertical click">
              <el-progress type="circle" :percentage="routingProgressResult" class="progress" :stroke-width="30"
                           :show-text="true"></el-progress>
              <el-badge :hidden='!isClickSubmit' :value="routingError"><span class="slide-text">{{$t('SIDEBAR_ROUTING')}}</span></el-badge>
            </div>
          </el-col>
          <el-col>
          <el-col :class="[currentPage.value=='parties'?'menu_item_active':'menu_item']">
            <div @click="changePage('parties')" ref="parties" ga-on="click" ga-event-category="parties" ga-event-action="vertical click">
              <el-progress type="circle" :percentage="partiesProgressResult" class="progress" :stroke-width="30"
                           :show-text="true"></el-progress>
              <el-badge :hidden='!isClickSubmit' :value="partiesError"><span class="slide-text">{{$t('SIDEBAR_PARTIES')}}</span></el-badge>
            </div>
          </el-col>
          <el-col :class="[currentPage.value=='cargo'?'menu_item_active':'menu_item']">
            <div @click="changePage('cargo')" ref="cargo" ga-on="click" ga-event-category="cargo" ga-event-action="vertical click">
              <el-progress type="circle" :percentage="cargoProgressResult" class="progress" :stroke-width="30"
                           :show-text="true"></el-progress>
              <el-badge :hidden='!isClickSubmit' :value="cargoError"><span class="slide-text">{{$t('SIDEBAR_CARGO')}}</span></el-badge>
            </div>
          </el-col>
          <el-col :class="[currentPage.value=='container'?'menu_item_active':'menu_item']">
            <div @click="changePage('container')" ref="container" ga-on="click" ga-event-category="container" ga-event-action="vertical click">
              <el-progress type="circle" :percentage="containerProgressResult" class="progress" :stroke-width="30"
                           :show-text="false"></el-progress>
              <el-badge :hidden='!isClickSubmit' :value="containerError"><span class="slide-text">{{$t('SIDEBAR_CONTAINER')}}</span>
              </el-badge>
            </div>
          </el-col>

          <el-col :class="[currentPage.value=='haulage'?'menu_item_active':'menu_item']">
            <div @click="changePage('haulage')" ref="haulage" ga-on="click" ga-event-category="haulage" ga-event-action="vertical click">
              <el-progress type="circle" :percentage="haulageProgressResult" class="progress" :stroke-width="30"
                           :show-text="false"></el-progress>
              <el-badge :hidden='!isClickSubmit' :value="haulageError"><span class="slide-text">{{$t('SIDEBAR_HAULAGE')}}</span>
              </el-badge>
            </div>
          </el-col>

          <el-col :class="[currentPage.value=='rateReference'?'menu_item_active':'menu_item']">
            <div @click="changePage('rateReference')" ref="rateReference" ga-on="click" ga-event-category="rate reference" ga-event-action="vertical click">
              <el-progress type="circle" :percentage="rateProgressResult" class="progress" :stroke-width="30"
                           :show-text="false"></el-progress>
              <el-badge :hidden='!isClickSubmit' :value="rateReferenceError">
                <span class="slide-text">{{$t('SIDEBAR_RATEREFERENCE')}}</span></el-badge>
            </div>
          </el-col>
          
          <el-col :class="[currentPage.value=='others'?'menu_item_active':'menu_item']">
            <div @click="changePage('documentUpload')" ref="others" ga-on="click" ga-event-category="others" ga-event-action="vertical click">
              <el-progress type="circle" :percentage="othersProgressResult" class="progress" :stroke-width="30"
                           :show-text="false"></el-progress>
              <el-badge :hidden='!isClickSubmit' :value="specialRequirementProgressError"><span class="slide-text">{{$t('SIDEBAR_SPECIALREQUIREMENT')}}</span>
              </el-badge>
            </div>
          </el-col>
        </el-col>
        <!--End-->
        <el-col class="buttons">

          <el-col>
              <a class="btn-v submit" @click="checkAllValidate"
               :class="[TotalProgressResult=='100%'?'submit-button':'progress-button',uploadingStatus==true?'disabled':null]" >
              <div class="div-a ">{{$t('SIDEBAR_SUBMIT')}}</div>
              <svg class="btn-v1 btn-progress">
                <rect x="0" y="0" fill="none" width="100%" height="100%"></rect>
                <rect x="0" y="0" fill="none" :width="TotalProgressResult" height="100%" ref="submitProgress"
                      :class="[TotalProgressResult=='100%'?'fullSubmitProgress':'submitProgress']"></rect>
              </svg> 
               </a>
          </el-col>    
         
          <el-col>
            <a class="btn-v btn-1 preview-button" :class="{disabled:uploadingStatus}"
               @click="copyBookingVisible = true" ga-on="click" ga-event-category="duplicate BR" ga-event-action="click">
              <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%"></rect>
              </svg>
              {{$t('SIDEBAR_COPY')}}
            </a>
          </el-col>
          <el-col>
               <a class="btn-v btn-1 preview-button" :class="{disabled:uploadingStatus}" @click="goPreview" ga-on="click" ga-event-category="preview" ga-event-action="click">
              <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%"></rect>
              </svg>
              {{$t('SIDEBAR_PREVIEW')}}
            </a>
          </el-col>
        </el-col>
        <el-col class="floatIcons">
          <el-tooltip effect="dark" :content="$t('SIDEBAR_FEEDBACK')" placement="left">
            <div class="floatIcon feedback-icon" @click="openScreenShot" ga-on="click" ga-event-category="feedback" ga-event-action="open feed back">
              <i class="fa fa-edit"></i>
            </div>
          </el-tooltip>
          <el-tooltip effect="dark" :content="$t('ONLINE_CHAT')" placement="left">
            <div class="floatIcon chat-icon" @click="openOnlineChat"  ga-on="click" ga-event-category="on line chat" ga-event-action="open on line chat">
              <i class="fa fa-commenting-o"></i>
            </div>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
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
          <el-button @click="cancelFeedback"  ga-on="click" ga-event-category="feedback" ga-event-action="cancel feed back">Cancel</el-button>
          <el-button type="primary" @click="confirmFeedback"  ga-on="click" ga-event-category="feedback" ga-event-action="submit feed back">Confirm</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <copy-booking-modal :copyBookingVisible.sync="copyBookingVisible"></copy-booking-modal>
    </div>
    <div>
    <online-chat :online-chat-visible.sync="onlineChatVisibleV"></online-chat>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {mapGetters, mapActions} from "vuex"
  import routeMinxin from '../mixins/routing.mixin'
  import menuBarMinxin from '../mixins/menuBar.mixin'
  import containerMixin from '../mixins/container.validator.mixin'
  import progressMixin from '../mixins/progress.mixin'
  import CopyBookingModal from './DuplicateBookingModal'
  import languageMixin from '../mixins/language.mixin'
  import OnlineChat from './OnlineChat'
  export default {
    mixins: [routeMinxin, menuBarMinxin, containerMixin, progressMixin, languageMixin,OnlineChat],
    components: {
      CopyBookingModal,
      OnlineChat
    },
    data() {
      return {
        partiesTitle: false,
        submitBRData: {},
        onlineChatVisibleV: false,
        feedbackContent: '',
        isScreenShotVisible: false,
        copyBookingVisible: false,
        language_switch_chinese: 'zh',
        language_switch_english: 'en',
        language_switch_tradich: 'tr',
        isClickSubmit: false,
      }
    },
    methods: {
      ...mapActions(["setSubmitStatus", "setValidateCount"]),
      changePage(page){
        this.currentPage.value = page;
        if (document.getElementById(page)) {
          window.scrollTo(0, document.getElementById(page).offsetTop - 150);
        }
        else {
          console.log(page);
        }
      },
      openOnlineChat: function () {
        this.onlineChatVisibleV = true
      },
      goPreview(){
        var self = this;
        self.preview.previewValidate = true;
        self.setSubmitStatus(true)
      },
      redraw: function () {
      }
    },
    props: ['menuBar', 'bookingRequest', 'currentPage', 'preview', 'submitDialog'],
    watch: {
      "currentPage.value": function (page) {
        var top = this.$refs[page].offsetTop;
      },
      validateCount: function (val) {
        if (val == 7) {
          this.submit()
        }
      }
    },
    computed: {
      ...mapGetters({
        containerValidateStatus: "getContainerValidateStatus",
        validateCount: "getValidateCount",
        rateReferenceValidateStatus: "getRateReferenceValidateStatus",
        uploadDocumentValidateStatus: 'getUploadDocumentValidateStatus',
        cargoValidateStatus: "getCargoValidateStatus",
        uploadingStatus: 'getUploadDocumentStatus',
        haulageValidateStatus:'getHaulageValidateStatus'
      }),
    },
    mounted(){
      this.initLanguage();
    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./../../assets/css/theme";

  .el-dialog--small {
    width: 60%;
  }

  .action-box {
    margin-top: 30px;
    margin-left: 90px;
    font-size: 25px;
    width: 50px;
    height: 80px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    background-color: @horizonFloatIconBackground;
    color: @horizonFloatIconColor;
    opacity: 0.5;
  }

  .feedback-icon {
    height: 50%;
    line-height: 40px;
  }

  .chat-icon {
    color: white;
    height: 50%;
    line-height: 40px;
  }

  // .feedback-icon:hover {
  //   color: @horizonFloatIconColorHover;
  // }

  // .chat-icon:hover {
  //   color: @horizonFloatIconColorHover;
  // }

  .icon_line {
    width: 2px;
    height: 280px;
    position: absolute;
    background-color: #CCC;
    margin: 10px 5px 5px -18px;
  }

  .iconImg {
    width: 20px;
    height: 20px;
    display: none;
  }

  .progress {
    float: left;
    margin-right: 20px;
    z-index: 999;
    background-color: #F9F9F9;
    margin-left: -27px;
  }

  .menu_item {
    margin-bottom: 20px;
    font-size: 16px;
    height: 25px;
    cursor: pointer;
  }

  .menu_item:hover {
    margin-bottom: 20px;
    font-weight: bolder;
    font-size: 16px;
    color: @primaryColor;
  }

  .menu_item_active {
    margin-bottom: 20px;
    font-weight: bolder;
    font-size: 16px;
    color: @primaryColor;
    cursor: pointer;
    height: 25px;
  }

  .menu_item span, .menu_item_active span {
    display: block;
    padding: 0 13px 0 0;
  }

  .menu_circle_text {
    font-size: 16px;
    margin-left: 25px;
  }

  .menu_bar {
    width: 100%;
    position: fixed;
    padding-top: 46px;
    //bottom: 10%;
    
  }

  .menu_wrap {
    width: 100%;
    padding-left: 24px;
    position: relative;
    margin-top: 89px;
  }

  .menu-button {
    width: 190px;
    margin-top: 10px;
  }

  .buttons {
    margin-top: 20px;
    margin-left: -20px;
    height: 161px;
  }

  .btn-v {
    cursor: pointer;
    display: inline-block;
    font-size: 16pt;
    line-height: 36px;
    margin: 0.5rem auto;
    max-width: 200px;
    position: relative;
    text-decoration: none;
    vertical-align: middle;
    width: 100%;
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

  .preview-button {
    color: white;
    background:@lightMenuButton;
    border-color:@lightMenuButton;
  }

  .progress-button {
    color: @lightMenuButton;
    //margin-top:2px;
    //margin-bottom:2px;
  }

   .submit {
    //background:@lightMenuButton;
    color:white;
    //border:1px solid @lightMenuButton;
    border-radius:2px;
    padding-bottom:45px;
    //padding-top:10px;
    padding-left:65px;
    //margin-bottom:2px;
  }

  .submit:hover{
    //background:#2c79b4;
    //border:1px solid #2c79b4;

  }

  .submit-button {
    border: 1px;
    color: white;
    //background:#2c79b4;
    //border-color:#2c79b4;
    text-decoration: none;
  }

  // .btn-v:hover {
  //   color: white;
  //   background:#2c79b4;
  //   border-color:#2c79b4;
  //   text-decoration: none;
  // }

  .preview-button:hover {
    color: white;
    background:#2c79b4;
    border-color:#2c79b4;
    text-decoration: none;
  }

  .btn-1 {
    //background: transparent;
    color:white;
    background:@lightMenuButton;
    height:36px;
  }
  .btn-progress {
    background: transparent;
    color:white;
    //background:@lightMenuButton;
    height:36px;
    border-radius:2px;
  }


  .btn-progress:hover {
   // border:1px  #2c79b4;
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

  .btn-1 svg {
    height: 36px;
    left: 0;
    position: absolute;
    top: 10;
    width: 100%;
  }

  .btn-1 rect {
    fill: none;
    stroke: @lightMenuButton;
    stroke-width: 2;
    stroke-dasharray: 622, 0;
    border-radius: 2px;
    rx: 5;
    ry: 5;
  }

  .preview-button rect {
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
    border-radius: 3px;
    rx: 5;
    ry: 5;
  }

  

  // .template-button:hover rect {
  //   stroke-width: 2;
  //   stroke-dasharray: 99, 382;
  //   stroke-dashoffset: 250;
  //   -webkit-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
  //   transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
  // }

  // .preview-button:hover rect {
  //   stroke-width: 2;
  //   stroke-dasharray: 47, 460;
  //   stroke-dashoffset: 250;
  //   -webkit-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
  //   transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
  // }

  .submit-button:hover rect {
    stroke-width: 4;
    /*stroke-dasharray: 47, 460;*/
    /*stroke-dashoffset: 250;*/
    /*-webkit-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);*/
    /*transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);*/
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

  .disabled {
    pointer-events: none;
    cursor: default;
  }

  .language {
    margin: 0 0 15px -24px
  }

  .floatIcons {
    width: 50px;
    text-align: center;
    position: fixed;
    //top: 80%;
    bottom: 45%;
    right: 0;
    z-index: 900;
    opacity: 1;
    font-size: 5px;
  }
  .floatIcon:hover {
    background-color: #2c79b4;
    height: auto;
    border: 1px solid @horizonFloatIconColorHover;
    cursor: pointer;
    text-align: center;
    color: @horizonFloatIconColorHover;
  }

  .floatIcon {
    background-color: @lightMenuButton;
    height: auto;
    border: 1px solid @horizonFloatIconColor;
    cursor: pointer;
    text-align: center;
    color: @horizonFloatIconColor;
  }

  .floatIcon i {
    font-size: 25px;
    line-height: 50px;
  }

  // .floatIcon:hover {
  //   opacity: 1;
  //   color: black;
  // }

  .floatIcon span {
    display: block;
  }
  .slide-text{
    font-size: 12pt;
  }
  
  .submitclass{
    color:red;
    font-size: 12pt;
  }

  .div-a{ 
    position:absolute;
    z-index:200;
    padding-top:8px;
  }


</style>
