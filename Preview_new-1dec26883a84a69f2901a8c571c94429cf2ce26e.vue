<template>
  <div class="home-container-preview">
    <div class="main-container">
      <h1>{{$t('PREVIEW_TITLE')}}</h1>
     
      <el-card class="br_card_component">
        <div class="br_component" id="rateReference">
          <rate-reference :carrierRates="bookingRequest.carrierRates"
                          :externalReferences="bookingRequest.externalReferences"></rate-reference>
        </div>
      </el-card>
      
      <!--<hr width=100% size=1 color=#bbb align=center noshade>-->
      <el-card class="br_card_component">
        <div class="br_component" id="cargo">
          <cargo :cargo-data="bookingRequest.cargoes"></cargo>
        </div>
      </el-card>
      <!--<hr width=100% size=1 color=#bbb align=center noshade>-->
      <el-card class="br_card_component">
          <div class="br_component" id="routing">
            <routing></routing>
          </div>
      </el-card>

      <!--<hr width=100% size=1 color=#bbb align=center noshade>-->
      <el-card class="br_card_component">
          <div class="br_component" id="parties">
            <parties :parties="bookingRequest.parties"></parties>
          </div>
      </el-card>
      <!--<hr width=100% size=1 color=#bbb align=center noshade>-->
      <el-card class="br_card_component">
          <div class="br_component" id="container">
            <container :booking-request="bookingRequest"></container>
          </div>
      </el-card>
      <!--<hr width=100% size=1 color=#bbb align=center noshade>-->
      <el-card class="br_card_component">
          <div class="br_component" id="haulage">
            <haulage :booking-request="bookingRequest"></haulage>
          </div>
      </el-card>
      <!--<hr width=100% size=1 color=#bbb align=center noshade>-->
      <el-card class="br_card_component">
          <div class="br_component" id="specialRequirements">
            <el-row><h1 class="SPECIALREQUIRE">{{$t('SPECIAL_REQUIREMENT')}}</h1></el-row>
            <el-row>
              <special-requirements :specialHandlings="bookingRequest.specialHandlings"></special-requirements>
            </el-row>
            <upload-document :documents="bookingRequest.documents"></upload-document>
            <remarks :remarks="bookingRequest.remarks"></remarks>
            <send-email :alsoNotifyEmailAddress="bookingRequest.alsoNotifyEmailAddress"></send-email>

          </div>
      </el-card>
 
    </div>
  </div>
</template>
<script>
  import Routing from '@/preview/Routing'
  import Parties from '@/preview/Parties'
  import Cargo from '@/preview/Cargo'
  import Container from '@/preview/Container'
  import RateReference from '@/preview/RateReferences'
  import Remarks from '@/preview/Remarks'
  import UploadDocument from '@/preview/UploadDocument'
  import SendEmail from '@/preview/SendEmail'
  import SpecialRequirements from '@/preview/SpecialRequirements'
  import haulage from '@/preview/Haulage'
  export default {
    components: {
      Routing,
      Parties,
      Cargo,
      Container,
      RateReference,
      Remarks,
      UploadDocument,
      SendEmail,
      SpecialRequirements,
      haulage
    },
    mounted(){
      this.initData();
    },
    data(){
      return {}
    },
    methods: {
      initData: function () {
        console.log(this.bookingRequest);
      }

    },
    props: ['bookingRequest'],
    computed: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.home-container-preview{
  background-color: rgb(233,243,245);
 
}
  .main-container {
    margin: auto;
    margin-top: -30px;
    /*background-color: #f9f9f9;*/
  }

  .br_component {
    /*margin-top: 5px;*/
    background-color: white;
    // padding: 10px 10px;
    overflow: visible;
  }
  .SPECIALREQUIRE{
  padding-left: 10px;
  padding-bottom: 5px;
  background: #2f9fd6;
  color:white;
  font-size: 24px
  }

  hr {
    margin: 5px 0 5px 0;
  }
  .br_card_component {
    margin-top: 25px;
    background-color: white;
    overflow: visible;
  }
</style>
