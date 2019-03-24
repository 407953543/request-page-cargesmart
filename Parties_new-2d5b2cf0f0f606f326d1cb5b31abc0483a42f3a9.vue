<template>
  <el-row>
    <el-row>
      <h1 class="PARTY">{{$t("PARTIES")}}</h1>
    </el-row>
    <el-row class="content">
      <el-row>
        <party v-for="(party,index) in parties" :key="index" :party="party" v-show="party.partyType!='BPT'" ></party>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Party from './Party.vue'
  export default {
    components: {Party},
    data(){
      return {
        shipper: {},
        forwarder: {},
        consignee: {},
        notifyparty:{},
      }
    },
    props: ['parties'],
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .party{
    margin-top: 0 !important;
  }
  .PARTY{
     padding-bottom: 5px;
    padding-left: 10px;
  background: #2f9fd6;
  color:white;
  font-size: 24px

}

</style>
