<template>
  <div class="home-container">
    <div class="horizontal-container">
      <horizontal-menu-bar :menu-bar="menuBar" :booking-request="bookingRequest"
                           :current-page="currentPage" :preview="preview" :user-id="userId"></horizontal-menu-bar>
    </div>
    <div class="main-container">
      <!--preview-->
      <el-dialog
        class="preview_dialog"
       
        
        :visible.sync="preview.openPreviewDialog"
        size="middle"
        :before-close="handleClose">

        <preview :booking-request="bookingRequest"></preview>


        <span slot="footer" class="dialog-footer">
          <el-button @click="preview.openPreviewDialog = false">{{$t('RESTORE_NO')}}</el-button>
          <el-button type="primary" @click="submit">{{$t('SIDEBAR_SUBMIT')}}</el-button>
        </span>
      </el-dialog>

      <!--submited dialog-->
      <el-dialog
        :title="$t('RECEIPT_DETAILS')"
        :visible.sync="submitDialog.openSubmitedDialog"
        size="middle"
        :show-close="false">
        <receipt-detail :submited-data="submitDialog"></receipt-detail>
        <span slot="footer" class="dialog-footer">
          <el-button ga-on="click"
                     ga-event-category="Submitted"
                     ga-event-action="click"
                     type="primary" @click="submitDialog.openSubmitedDialog = false">{{$t("RESTORE_YES")}}</el-button>
        </span>
      </el-dialog>

      <div class="page-title">{{$t('NEW_BOOKING_REQUEST')}}</div>
      <div class="cargo-noted inner-space">{{$t('FCL_NOTE')}} <span class="note-star">*</span></div>



      <!--Routing module-->
      <el-card class="br_card_component">
        <div class="br_component" id="routing">
          <route-container :container-data="bookingRequest.containerData"></route-container>
        </div>
      </el-card>

    <!--Rate Reference module-->
      <el-card class="br_card_component">
        <div class="br_component" id="rateReference">
          <rate-reference :externalReferences="bookingRequest.externalReferences"
                          :carrierRates="bookingRequest.carrierRates"></rate-reference>
        </div>
      </el-card>

      <!--Parties module-->
      <el-card class="br_card_component">
        <div class="br_component" id="parties">
          <parties :parties="bookingRequest.parties"></parties>
        </div>
      </el-card>

      <!--Cargo module-->
      <el-card class="br_card_component">
        <div class="br_component" id="cargo">
          <cargo :cargo-data="bookingRequest.cargoes"></cargo>
        </div>
      </el-card>

      <!--Container and Trucking module-->
      <el-card class="br_card_component">
        <div class="br_component" id="container">
          <trucking-container :booking-request="bookingRequest"></trucking-container>
        </div>
      </el-card>

      <el-card class="br_card_component">
        <div class="br_component" id="haulage">
          <haulage :booking-request="bookingRequest"></haulage>
        </div>
      </el-card>

      <!--Special Requirement module-->
      <el-card class="br_card_component">
        <div class="br_component" id="others">
          <special-requirements :special-handlings="bookingRequest.specialHandlings"></special-requirements>
          <upload-document :documents="bookingRequest.documents"></upload-document>
          <remarks :remarks="bookingRequest.remarks"></remarks>
          <send-email :alsoNotifyEmailAddress.sync="bookingRequest.alsoNotifyEmailAddress"></send-email>
        </div>
      </el-card>
      <br>
      <div class="note inner-space space-of-height">{{$t("SPECIAL_REMIND")}}</div>
      <div class="note inner-space space-of-height">{{$t("SPECIAL_REMIND_TWO")}}</div>

    </div>
    <!--Right menu bar module-->
    <div class="sidebar-container">
      <vertical-menu-bar :menu-bar="menuBar" :booking-request="bookingRequest"
                         :current-page="currentPage" :preview="preview" :submit-dialog="submitDialog"></vertical-menu-bar>
    </div>
  </div>
</template>
<script>

  import Parties from '@/parties/Parties'
  import RouteContainer from '@/route/RouteContainer'
  import TruckingContainer from '@/container/TruckingContainer'
  import Cargo from '@/cargo/Cargo'
  import Remarks from '@/remarks/Remarks'
  import UploadDocument from '@/uploadDocument/UploadDocument'
  import SpecialRequirements from '@/specialRequirements/SpecialRequirements'
  import RateReference from '@/rateReference/RateReference'
  import SendEmail from '@/sendEmail/SendEmail'
  import HorizontalMenuBar from '@/menuBar/HorizontalMenuBar'
  import VerticalMenuBar from '@/menuBar/VerticalMenuBar'
  import routingMixin from "../mixins/routing.mixin"
  import Preview from "@/index/Preview"
  import ReceiptDetail from "@/submitDialog/ReceiptDetail"
  import Haulage from "@/haulage/Haulage"
  import {mapActions,mapGetters,mapMutations} from "vuex"
  export default {
    mixins: [routingMixin],
    components: {
      Haulage,
      Parties,
      RouteContainer,
      Remarks,
      TruckingContainer,
      UploadDocument,
      SpecialRequirements,
      Cargo,
      RateReference,
      SendEmail,
      HorizontalMenuBar,
      VerticalMenuBar,
      Preview,
      ReceiptDetail
    },
    mounted() {
      this.initSupportData();
      this.initMouseWheel();
//      this.initCloseEvent();

      this.restoreBookingRequest();
      this.enableToSaveMongDB();
    },
    computed:{
      ...mapGetters(['getRouteData'])
    },
    data() {
      return {
        submitDialog:{
          openSubmitedDialog: false,
          isShowSpecialStowage: false,
          isShowFumigationRemark: false,
          isShowCntrSupportRemark: false,
          isShowShipperOwnedCntrRemark: false,
          returnData: {}
        },
        preview:{openPreviewDialog:false,previewValidate:false},
        currentPage: {value: "rateReference", placeToTop: false},
        carrierRateReferenceTypes: [],
        dropDownListData: [],
        bookingRequest: {
          containers: [],
          haulage: {
            outbound: "CY/RAMP",
            inbound: "CY/RAMP"
          },
          door: {
            emptyPickupDate: {
              csTimezone: '',
              gmtDate: ''
            }
          },
          isAcceptPartialShipments: false,
          isDoorPickupApptToBeAdvised: true,
          doorAppointments: [],
          cargoes: {
            cargoNature: "",
            cargoDescription: "",
	          cargoCASNo:"",
            dangerCargoSpecs:{
              cargoUNDG_Number:"",
              properShippingName:"",
              imoClass:"",
              packingGroup:"",
              innerPackage:{magnitude:"",unit:""},
              outerPackage:{magnitude:"",unit:""},
              netWeight:{magnitude:"",unit:""},
              grossWeight:{magnitude:"",unit:""},
              flashPoint:{magnitude:"",unit:""},
             

              technicalName:"",
              marinePollutant:false,
              OBContactName:"",
              OBContactPhoneNumber:"",
              IBContactName:"",
              IBContactPhoneNumber:"",
            },
            reeferCargoSpecs: {
              gensetType: "",
              temperature: {magnitude: "0", unit: "C"},
              ventilation: {magnitude: null, unit: ""},
            },
            awkwardCargoSpecs: {
              unit: "",
              length: "",
              width: "",
              height: ""
            }
          },
          specialHandlings: [
            {
              code: "",
              instruction: ""
            },
            {
              code: [],
              instruction: []
            },
          ],
          carrierRates: [{
            name: '',
            type: '',
            number: '',
            CSOAgreementNumber: '',
            PaymentInfo: '',
            OceanType:''
          }],
          externalReferences: [],
          remarks: [{}],
          parties: [],
          alsoNotifyEmailAddress: '',
          documents: []
        },
        menuBar: [
          'parties',
          'routing',
          'cargo',
          'container',
          'haulage',
          'rateReference',
          'others'
        ],
        restoreDialogVisible:false,
        userId:window.user.userId,//userid
      }

    },
    methods: {

      ...mapActions(["setDropDownListData","setDropDownListMap", "setBookingRequest","setRestoreBR","setPartiyRecovery","setRecovery","setSubmitStatus"]),
      initSupportData(){
        var self = this;
        this.$http.get('/api/dropDownListData')
          .then(function (res) {
//            self.dropDownListData = res.data.result;
            console.log(res.data.result);
            var dropDownListData = res.data.result;
            self.setDropDownListData(dropDownListData);
            self.setDropDownListMap(dropDownListData);
          })
      },
      enableToSaveMongDB:function(){
        let self = this;
        setTimeout(function(){
          self.$watch(
            'bookingRequest', function(br){
              this.setBookingRequest(br);
              this.saveBookingRequestData(br);},{
              deep:true
            })
        },5000)

        setTimeout(function(){
          self.$watch(
            'getRouteData', function(routeData){
              this.bookingRequest.routeData = routeData;
              this.saveBookingRequestData(this.bookingRequest);},{
              deep:true
            })
        },5000)
      },
      nextMenu: function () {
        for (var i = 0; i < this.menuBar.length; i++) {
          if (this.menuBar[i] == this.currentPage.value) {
            var j = i;
            this.currentPage.value = this.menuBar[j + 1];
            break;
          }
        }
      },
      backMenu: function () {
        for (var i = 0; i < this.menuBar.length; i++) {
          if (this.menuBar[i] == this.currentPage.value) {
            var j = i;
            this.currentPage.value = this.menuBar[j - 1];
            break;
          }
        }
      },
      getScrollTop: function () {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
      },
      getWindowHeight: function () {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
          windowHeight = document.documentElement.clientHeight;
        } else {
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      },
      getScrollHeight: function () {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
      },
      initMouseWheel: function () {
        var self = this;

        document.onscroll = function () {
          var top = self.getScrollTop();
          var items = document.getElementsByClassName("br_component");
          var currentItem = items[0];
          for (var i = 0; i < items.length; i++) {
            var itemsTop = items[i].offsetTop;
            if (top > itemsTop - 200) {
              currentItem = items[i];
            }
          }
          self.currentPage.placeToTop = (top > 30);
          if (self.getScrollTop() + self.getWindowHeight() + 250 >= self.getScrollHeight()) {
            self.currentPage.value = self.menuBar[self.menuBar.length - 1];
            return;
          }
          if (currentItem && currentItem.getAttribute("id") != self.currentPage.value) {
            self.currentPage.value = currentItem.getAttribute("id");
          }
        };

      },
      submit: function () {
        var self = this;
        self.preview.openPreviewDialog = false;
        self.setSubmitStatus(true);
      },
      initCloseEvent(){
        window.onbeforeunload = function (e) {
          var message = "warning";
          return message
        };

        window.onunload = function(){
          var xmlHttp = new XMLHttpRequest();
          //sync method, if network exception, will be slow performance about loading page
          xmlHttp.open('GET', '/api/restore/deleteRestore', false)
          xmlHttp.send(null);
        }
      },
      handleClose:function(done) {
        var self = this;
        self.preview.openPreviewDialog = false;
      },

      restoreBRData(){
//        this.setPartiyRecovery(true);
        this.setRecovery(true);
        this.restoreDialogVisible = false;
      },

      saveBookingRequestData(br){
        try {
          var self = this;
          self.$http.put('/api/restore/updateWhenInputBR', br, {showProgressBar: false})
            .then(function (res) {
            })
        } catch (err) {
        }
      },

      restoreBookingRequest(){
        try {
          var self = this;
          self.$http.get('/api/restore/getRecoverableBR', {showProgressBar: false})
            .then(function (res) {
              if (res.data.success&&res.data.result) {

                self.restoreDialogVisible = true;
                self.setRestoreBR(res.data.result);
              } else {
                self.restoreDialogVisible = false;
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
      }

    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./../../assets/css/theme";

  .menu-parent {
    position: relative;
  }

  .step-button {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 10px;
  }

  .step-button button {
    width: 150px;
  }

  .menu-container {
    width: 200px;
    position: absolute;
  }

  .br_card_component {
    margin-top: 25px;
    background-color: white;
    overflow: visible;
  }

  .br_component h1 {
    margin-top: -20px;
    float: inherit;
  }

  .br_component:first-child {
    margin-top: 5px;
  }

  .cargo-noted {
    font-style: oblique;
  }

  .main-container {
    background-color: #f9f9f9;
    //background-color: red;
    margin-top: 100px;
  }

  .page-title{
    font-weight: bold;
    font-size: 28px;
    font-family: @font-family;
    color: #333;
    padding-top: 5px;
    padding-bottom: 30px;
    margin-top: 2px;
    top: 10px;
  }

  .note{
    font-style: oblique;
  }

  .restore-content{
    font-size: 15px;
  }

  .space-of-height{
    height: 5px;
  }

</style>
