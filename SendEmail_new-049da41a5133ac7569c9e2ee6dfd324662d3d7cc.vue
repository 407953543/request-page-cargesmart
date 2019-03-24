<template>
  <el-row v-show="alsoNotifyEmailAddress!==''">
    <el-row><h3 class="column_title">{{$t('SEND_EMAIL_TITLE')}}</h3></el-row>
    <span class="column_content">{{alsoNotifyEmailAddress}}</span>
  </el-row>
</template>

<script>
  export default {
    props:{
      alsoNotifyEmailAddress:{
        type:String
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

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
