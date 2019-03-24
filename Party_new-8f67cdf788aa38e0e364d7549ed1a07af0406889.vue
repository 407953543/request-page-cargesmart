/**
* Created by CHENRI4 on 6/22/2017.
*/
<template>
  <el-col :span="12" class="party">
    <span class="column_title" v-show="party.partyType=='SHP'">{{$t('SHIPPER')}}</span>
    <span class="column_title" v-show="party.partyType=='FWD'">{{$t('FORWARDER')}}</span>
    <span class="column_title" v-show="party.partyType=='CGN'">{{$t('CONSIGNEE')}}</span>
    <span class="column_title" v-show="party.partyType=='NPY'">{{$t('NOTIFY_PARTY')}}</span>


    <el-row class="column_content">{{party.partyName}}</el-row>
    <el-row class="column_content">{{party.address.addressLine}}</el-row>
    <el-row class="column_content">{{party.address.county}}</el-row>
    <el-row class="column_content">{{party.address.city}}</el-row>
    <el-row class="column_content">{{party.address.state}}</el-row>
    <el-row class="column_content">{{party.address.country}}</el-row>
    <el-row class="column_content">{{party.address.postalCode}}</el-row>
    <el-row class="column_content">{{party.contact.firstName}}</el-row>
    <el-row class="column_content">{{party.contact.lastName}}</el-row>
    <el-row class="column_content">{{party.contact.phone.countryCode}} -
      {{party.contact.phone.areaCode}} -
      {{party.contact.phone.number}}</el-row>
    <br>
    <br>
  </el-col>
</template>

<script>
  export default {
    props:{
      party:{
          type:Object
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.party{
  margin-top:3%;
}
.column_content{
  padding-left: 20px;
  font-size: 14px;
  font-weight: bold
 

}
.column_title{
  padding-left: 20px;
  color:rgb(164,164,164);
  font-size: 10px;
  font-family:Arial
}
</style>
