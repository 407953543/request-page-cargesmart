/**
 * Created by CHENRI4 on 6/22/2017.
 */
<template>
  <el-row v-show="remarks[0].remarks!=''&&remarks[0].remarks!=null">
    <h3 class="column_title">
     {{$t('REMARKS_TITLE')}}
    </h3>
    <div>
      <el-row class="column_content">
        {{remarks[0].remarks}}
      </el-row>
    </div>
  </el-row>
</template>

<script>
  export default {
    props: {
      remarks: {
        type: Array
      }
    },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>


.column_title{
  padding-left: 20px;
  color:rgb(164,164,164);
  font-size: 10px;
  font-family:Arial
}.column_content{
  padding-left: 20px;
  font-size: 14px;
  font-weight: bold
 

}
</style>
