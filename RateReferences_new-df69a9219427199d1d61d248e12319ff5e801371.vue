<template>
  <el-row>
    <el-row>
      <h1 class="RATEREFERENCE">{{$t('RATEREFERENCE')}}</h1>
    </el-row>
    <el-row class="content">
      <el-row>
        <el-col :lg="12" :md="12" v-show="carrierRates[0].number">
          <div class="column_title">{{$t('RATEREFERENCE_NUMBER')}}</div>
          <el-row >{{carrierRates[0].type}} - {{carrierRates[0].number}}</el-row>
        </el-col>

        <el-col :lg="12" :md="12" v-show="carrierRates[0].number">
          <div class="column_title">{{$t('OCEAN_FREIGHT')}}</div>
          <el-row >{{carrierRates[0].OceanType}}</el-row>
        </el-col>

        <el-col :lg="12" :md="12" v-show="carrierRates[0].number">
          <div class="column_title">{{$t('CSO_AGREEMENT_NUMBER')}}</div>
          <el-row >{{carrierRates[0].CSOAgreementNumber}}</el-row>
        </el-col>

        <el-col :lg="12" :md="12" v-show="carrierRates[0].number">
          <div class="column_title">{{$t('PAYMENT_INFORMATION')}}</div>
          <el-row >{{carrierRates[0].PaymentInfo}}</el-row>
        </el-col>




        <el-col :lg="12" :md="12" v-show="externalReferences.length>0">
          <span class="column_title">{{$t('USERREFERENCE_NUMBER')}}</span>
          <el-row v-for="(externalReference,index) in externalReferences" :key="index">
            {{externalReference.description}} - {{externalReference.number}}
          </el-row>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ["carrierRates", "externalReferences"],
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.RATEREFERENCE{
   padding-bottom: 5px;
  padding-left: 10px;
  background: #2f9fd6;
  color:white;
  font-size: 24px

}
.content{
  padding-left: 20px;
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 5px;

}
.column_title{
    color:rgb(164,164,164);
  font-size: 10px;
  font-family:Arial
}

</style>
