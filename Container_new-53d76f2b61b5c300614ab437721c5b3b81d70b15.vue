<template>
  <el-row>
    <el-row>
      <h1 class="CANTAINER">{{$t('CONTAINER_HAULAGE_TITLE')}}</h1>
    </el-row>
    <el-row class="content">
      

      <el-row>
        <el-col :lg="12" :md="12" v-show="routeData.judgeUSorCA && isContainerCountMoreOne">
          <el-col :span="24">
            <span class="column_title">{{$t('ACCEPT_PARTIAL_SHIPMENTS')}}</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{bookingRequest.isAcceptPartialShipments}}</span>
          </el-col>
        </el-col>
      </el-row>

      <el-row>
        <el-col :lg="24" :md="24">
          <el-col :span="24">
            <h2 class="column_title">{{$t('CONTAINER_TITLE')}}</h2>
          </el-col>
          <el-col :span="24">
            <el-table :data="bookingRequest.containers" style="width: 100%" :fit="true">
              <el-table-column :label="$t('CONTAINER_QUANTITY')" prop="quantity"></el-table-column>
              <el-table-column :label="$t('CONTAINER_TYPE')" width="280"
                               prop="csContainerSizeTypeObj.name"></el-table-column>
              <el-table-column :label="$t('CONTAINER_CARGO_WEIGHT')" prop="grossWeight.magnitude"></el-table-column>
              <el-table-column :label="$t('CONTAINER_WEIGHT_UNIT')" prop="grossWeight.unit"></el-table-column>
              <el-table-column :label="$t('CONTAINER_SHIPPER_OWNER')">
                <template scope="scope">
                  <span>{{scope.row.isSOC}}</span> 
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ArrowLine from '@/container/ArrowLine'
  export default {
    data(){
      return {}
    },
    components: {ArrowLine},
    props: ['bookingRequest'],
    computed: {
      ...mapGetters({
        routeData: "getRouteData",
        isContainerCountMoreOne: 'getIsContainerCountMoreOne'
      })
    },
    filters: {
      dateFilter: function (val) {
        if (val) {
          var monthWord = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
          var year = val.getFullYear()
          var month = val.getMonth()
          var day = val.getDate()
          return day + " " + monthWord[month] + " " + year + " " + val.toLocaleTimeString().substring(0, 5)
        }
    },

      filterPickNumber: function(val){
        var numberArray = []
        var i = 0
        var total = val.length
        while(total > 4){
          numberArray[i] = val.substring(i*4, (i+1)*4);
          total -= 4;
          i++;
        }
        
        numberArray[i] = val.substring(i*4, (i+1)*4);
        return numberArray.toString().replace(/,/g, " ");
        },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .arrow-line-size {
    width: 45px !important;
    height: 20px !important;
    margin-top: -10px;
  }
  .CANTAINER{
  padding-bottom: 5px;
  padding-left: 10px;
  background: #2f9fd6;
  color:white;
  font-size: 24px
}
.column_title{
  padding-bottom: 5px;
  padding-left: 10px;
  margin-top: 3px;
  font-size: 16px
}
</style>
