<template>
  <el-row>
    <el-row>
      <h1 class="HAULAGE">{{$t('HAULAGE_TITLE')}}</h1>
    </el-row>
    <el-row class="content">
      <el-row>
        <el-col :lg="24" :md="24"
                v-show="bookingRequest.door.emptyPickupDate.gmtDate && bookingRequest.door.emptyPickupDate.csTimezone.name && bookingRequest.haulage.outbound != 'DOOR'">
          <el-col :span="12">
            <el-col :span="24">
              <span class="column_title">{{$t('EMPTY_PICKUP_TIME_TITLE')}}</span>
            </el-col>
            <el-col :span="24">
              <span class="column_content">{{bookingRequest.door.emptyPickupDate.gmtDate | dateFilter}}</span>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="24">
              <span class="column_title">{{$t('EMPTY_PICKUP_TIME_ZONE_TITLE')}}</span>
            </el-col>
            <el-col :span="24">
              <span class="column_content">{{bookingRequest.door.emptyPickupDate.csTimezone.name}}</span>
            </el-col>
          </el-col>
        </el-col>
      </el-row>  

      <el-row v-show=" bookingRequest.haulage.outbound == 'DOOR'">
        <el-col :span="24">
          <h2 class="column_title">{{$t('DOOR_PICKUP_APPOINTMENT')}}</h2>
        </el-col>
        <el-col :span="24" v-show="bookingRequest.isDoorPickupApptToBeAdvised">
          <span class="column_content">{{$t('TO_BE_ADVISED')}}</span>
        </el-col>
        <el-col :span="24"
                v-show="!bookingRequest.isDoorPickupApptToBeAdvised && bookingRequest.doorAppointments">
          <el-col :span="24">
            <el-table :data="bookingRequest.doorAppointments" stripe>
              <el-table-column :label="$t('APPOINTMENT')" width="200">
                <template scope="scope">
                  <span v-if="scope.row.doorAppointmentDateType=='TBA'">To Be Advised</span>
                  <span
                    v-if="scope.row.doorAppointmentDateType=='IT'">{{scope.row.appointmentDateTime | dateFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('CONTAINER_INFORMATION')">
                <template scope="scope">
                  <el-col v-for="container in scope.row.appointmentContainer" :key="container.id">
                    {{container.scheduled}} X {{container.csContainerSizeTypeObj.name}}
                    <br>
                    <span v-if="container.pickupNumber != '' ">Pick up Number: {{container.pickupNumber | filterPickNumber}}</span>
                  </el-col>
                </template>
              </el-table-column>
              <el-table-column :label="$t('CONTACT_INFORMATION')">
                <template scope="scope">
                  <span>Company:{{scope.row.appointmentAddress.addressCompanyName}}</span><br>
                  <span>Address:</span>
                  <span v-if="scope.row.appointmentAddress.addressStreet">{{scope.row.appointmentAddress.addressStreet}},</span>
                  <span
                    v-if="scope.row.appointmentAddress.addressCity">{{scope.row.appointmentAddress.addressCity}},</span>
                  <span v-if="scope.row.appointmentAddress.addressCountryName">{{scope.row.appointmentAddress.addressCountryName}},</span>
                  <span
                    v-if="scope.row.appointmentAddress.addressState">{{scope.row.appointmentAddress.addressState}},</span>
                  <span v-if="scope.row.appointmentAddress.addressZipCode">{{scope.row.appointmentAddress.addressZipCode}},</span>
                  <span v-if="scope.row.appointmentAddress.addressCounty.name">{{scope.row.appointmentAddress.addressCounty.name}}</span>
                  <br>
                  <span>Contact Info</span>
                  <span>{{scope.row.appointmentContact.firstName}} {{scope.row.appointmentContact.lastName}}</span>
                  <span v-if="scope.row.appointmentContact.firstName || scope.row.appointmentContact.lastName">,</span>
                  <span
                    v-if="scope.row.appointmentContact.countryCode">{{scope.row.appointmentContact.countryCode}}-</span>
                  <span v-if="scope.row.appointmentContact.areaCode">{{scope.row.appointmentContact.areaCode}}-</span>
                  <span
                    v-if="scope.row.appointmentContact.phoneNumber">{{scope.row.appointmentContact.phoneNumber}}</span>
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
  .HAULAGE{
     padding-bottom: 5px;
   padding-left: 10px;
  background: #2f9fd6;
  color:white;
  font-size: 24px
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
