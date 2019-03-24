<template>
  <el-row>
    <el-row>
      <h1 class="ROUTING">{{$t("ROUTING")}}</h1>
    </el-row>
    <el-row class="content">

      <el-row>
        <el-col :lg="12" :md="12">
          <el-col :span="24">
            <span class="column_title">{{$t('DOOR_PICKUP')}}</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.doorPickupSelect}}</span>
          </el-col>
        </el-col>

        <el-col :lg="12" :md="12">
          <el-col :span="24">
            <span class="column_title">{{$t('DOOR_DELIVERY')}}</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.doorDeliverySelect}}</span>
          </el-col>
        </el-col>
      </el-row>

      <el-row>
        <el-col :lg="12" :md="12">
          <el-col :span="24">
            <span class="column_title">{{$t('FROM')}}</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.originCityInput}}</span>
          </el-col>
        </el-col>

        <el-col :lg="12" :md="12">
          <el-col :span="24">
            <span class="column_title">{{$t('TO')}}</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.destinationCityInput}}</span>
          </el-col>
        </el-col>

        <el-row :lg="12" :md="12">
          <el-col :span="24">
            <span class="column_title">{{$t('BOOK_OFFICE')}}</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.bookingOffice}}</span>
          </el-col>
        </el-row>

      <el-row>
        <el-col :lg="12" :md="12" v-show="( (routeData.isSailingSchedule==2) || (routeData.isSailingSchedule==3) ) && routeData.polInput">
          <el-col :span="24">
            <span class="column_title">{{$t('POL')}}</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.polInput}}</span>
          </el-col>
        </el-col>
        <el-col :lg="12" :md="12" v-show="( (routeData.isSailingSchedule==2) || (routeData.isSailingSchedule==3) ) && routeData.podInput">
          <el-col :span="24">
            <span class="column_title">{{$t('POD')}}</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.podInput}}</span>
          </el-col>
        </el-col>
      </el-row>
      
      <el-row v-show="routeData.isSailingSchedule==1">
        <el-col :span="12">
          <el-col :span="24">
            <span class="column_title">{{$t('ROUTE_RANGE_TITLE')}}</span>
          </el-col>
          <el-col :span="24" v-show="routeData.departure">
            <span class="column_content">{{$t('ROUTE_START_FROM')}} {{routeData.searchConditionDate | formatDate}} {{$t('ROUTE_CONNECT_PREP')}} {{routeData.numberOfWeeks}} {{$t('ROUTE_START_END')}} </span>
          </el-col>
          <el-col :span="24" v-show="!routeData.departure">
            <span class="column_content">{{$t('ROUTE_ARRIVAL_TILL')}} {{routeData.searchConditionDate | formatDate}} {{$t('ROUTE_CONNECT_PREP')}} {{routeData.numberOfWeeks}} {{$t('ROUTE_ARRIVAL_END')}}</span>
          </el-col>
        </el-col>
      </el-row> 

      <el-row v-show="routeData.isSailingSchedule==3">
        <el-col :span="12">
          <el-col :span="24">
            <span class="column_title">{{$t('ROUTE_RANGE_TITLE')}}</span>
          </el-col>
          <el-col :span="24" v-show="routeData.departure3">
            <span class="column_content">{{$t('ROUTE_START_FROM')}} {{routeData.searchConditionDate3 | formatDate}}  </span>
          </el-col>
          <el-col :span="24" v-show="!routeData.departure3">
            <span class="column_content">{{$t('ROUTE_ARRIVAL_TILL')}} {{routeData.searchConditionDate3 | formatDate}} </span>
          </el-col>
        </el-col>
      </el-row> 

    </el-row>

      <el-row :lg="24" v-show="(routeData.isSailingSchedule === 2)">
          <el-col :span="24">
            <span class="column_title">{{$t('VESSEL_VOYAGE')}}</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content" v-show="(routeData.isSailingSchedule === 2)">{{$t('INTENDED_VESSEL_VOYAGE')}}</span>
          </el-col>
      </el-row>
    </el-row>

    <el-row v-if="(routeData.isSailingSchedule === 2)">
      <el-col :lg="6" :sm="12" v-show="routeData.svvd.service">
        <el-col :span="24">
          <span class="column_title">{{$t('SERVICE')}}</span>
        </el-col>
        <el-col :span="24">
          <span class="column_content">{{routeData.svvd.service}}</span>
        </el-col>
      </el-col>
      <el-col :lg="6" :sm="12" v-show="routeData.svvd.vesselName">
        <el-col :span="24">
          <span class="column_title">{{$t('VESSEL_NAME')}}</span>
        </el-col>
        <el-col :span="24">
          <span class="column_content">{{routeData.svvd.vesselName}}</span>
        </el-col>
      </el-col>
      <el-col :lg="6" :sm="12" v-show="routeData.svvd.externalVoyageNumber">
        <el-col :span="24">
          <span class="column_title">{{$t('VOYAGE')}}</span>
        </el-col>
        <el-col :span="24">
          <span class="column_content">{{routeData.svvd.externalVoyageNumber}}</span>
        </el-col>
      </el-col>
      <el-col :lg="6" :sm="12" v-show="routeData.svvd.direction">
        <el-col :span="24">
          <span class="column_title">{{$t('DIRECTION')}}</span>
        </el-col>
        <el-col :span="24">
          <span class="column_content">{{routeData.svvd.direction}}</span>
        </el-col>
      </el-col>
    </el-row>

    <div v-if="routeData.selectedRoute && (routeData.isSailingSchedule === 1)">
      <el-col :span="24" class="text-center sailing-schedule-table">
        <b><span class="origin-city">{{routeData.originCityInput}}</span>
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          <span class="destination-city">{{routeData.destinationCityInput}}</span>
        </b>
      </el-col>
      <el-col :span="24">
        <el-col :lg="4" :md="4">
          <el-col :span="24">
            <span class="column_title">CY Cutoff</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.selectedRoute.cutOffLocalDate}}</span>
          </el-col>
        </el-col>
        <el-col :lg="4" :md="4">
          <el-col :span="24">
            <span class="column_title">Departure</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.selectedRoute.firstPortPOLETDDate | formatDate}}</span>
          </el-col>
        </el-col>
        <el-col :lg="4" :md="4">
          <el-col :span="24">
            <span class="column_title">Arrival</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.selectedRoute.etaAtFND}}</span>
          </el-col>
        </el-col>
        <el-col :lg="4" :md="4">
          <el-col :span="24">
            <span class="column_title">Transit Time</span>
          </el-col>
          <el-col :span="24">
            <span class="column_content">{{routeData.selectedRoute.estimatedTransitTimeInDays + (routeData.selectedRoute.estimatedTransitTimeInDays > 1 ? " days" : " day")}}</span>
          </el-col>
        </el-col>
        <el-col :lg="8" :md="8">
          <el-col :span="24">
            <span class="column_title">Vessel Voyage</span>
          </el-col>
          <el-col :span="24">
            <span v-for="item in routeData.selectedRoute.oceanLegs" class="no-margin column_content">
              {{item.vesselName + " " + item.voyageNumber}}
            </span>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" v-if="routeData.selectedRoute">
        <div class="legs-wrap">
          <!--<h3>Ocean legs:</h3>-->
          <el-col :span="24" class="ocean-leg-div">


            <!--<div class="haulage-wrap">-->
            <!--<span class="haulage">{{routeData.selectedRoute.originHaulageIndicator | filterHaulage}}</span>-->
            <!--<div class="horizontal-line">-->
            <!--<span class="triangle-right"></span>-->
            <!--</div>-->
            <!--<span class="haulage">{{routeData.selectedRoute.fndHaulageIndicator | filterHaulage}}</span>-->
            <!--<b>, {{routeData.selectedRoute.defaultCargoNature}}</b> cargo was supported.-->
            <!--</div>-->

            <table class="legs-table">
              <tbody>

              <template v-for="(leg,index) in routeData.selectedRoute.oceanLegs">
                <tr>
                  <td>{{leg.polETDDate | getDate}}</td>
                  <td><span class="gray">{{leg.polETDDate | getHour}}</span></td>
                  <td class="text-left">Departs from
                    <el-tooltip class="item" effect="dark" content="Facility Info" placement="top">
                      <a href="javascript:void(0);" type="text"
                         @click="findFacilityInfo(leg.scac,leg.polFacilityCode,'POL')">{{leg.polPortName}}</a>
                    </el-tooltip>
                    <span v-if="leg.vesselCode && leg.vesselCode.toUpperCase() != 'TBA'">

               </span>

                  </td>
                  <td v-if="index==0" class="text-center">{{routeData.selectedRoute.originHaulageIndicator |
                    filterHaulage}}
                  </td>

                </tr>
                <tr>
                  <td colspan="2">
                    <i class="fa fa-ship"></i>
                    <span v-if="leg.vesselCode && leg.vesselCode.toUpperCase() != 'TBA'">
                      <el-tooltip class="item" effect="dark" content="Vessel Info" placement="top">
                         <a href="javascript:void(0);" @click="findVesselInfo(leg.scac,leg.vesselCode,leg.vesselName)">{{leg.vesselName}}</a>
                      </el-tooltip>
              </span>
                    <span v-else>
                {{leg.vesselName}}
              </span>
                    <el-tooltip class="item" effect="dark" content="Voyage Info" placement="top">
                      <a href="javascript:void(0);"
                         @click="findSVVDInfo(leg.scac,leg.voyageNumber,leg.vesselCode,leg.serviceCode,leg.vesselName,leg.internalVoyageNum,leg.direction)">{{leg.voyageNumber}}</a>
                    </el-tooltip>

                  </td>
                  <td class="text-left">Transport via <b>{{leg.carrierName}}</b>
                    <el-tooltip class="item" effect="dark" content="Service Loop Info" placement="top">
                      <a href="javascript:void(0);" @click="findServiceLoopsInfo(leg.scac,leg.serviceCode)">{{leg.serviceCode}}</a>
                    </el-tooltip>

                  </td>
                  <td :rowspan="routeData.selectedRoute.oceanLegs.length * 3-2" v-if="index==0">
                    <div class="line" id="oceanLeg-preview-line">
                      <span class="triangle-top"></span>
                      <span class="cargo-nature">{{routeData.selectedRoute.defaultCargoNature}}</span>
                      <span class="triangle-bottom"></span>
                    </div>
                  </td>


                </tr>
                <tr>
                  <td>{{leg.podETADate | getDate}}</td>
                  <td><span class="gray">{{leg.podETADate | getHour}}</span></td>
                  <td class="text-left">Arrivals at
                    <el-tooltip class="item" effect="dark" content="Facility Info" placement="top">
                      <a href="javascript:void(0);" type="text"
                         @click="findFacilityInfo(leg.scac,leg.podFacilityCode,'POD')">{{leg.podPortName}}</a>
                    </el-tooltip>
                  </td>
                  <td v-if="index==(routeData.selectedRoute.oceanLegs.length-1)" class="text-center">
                    {{routeData.selectedRoute.originHaulageIndicator | filterHaulage}}
                  </td>
                </tr>

              </template>

              </tbody>
            </table>


          </el-col>
        </div>
      </el-col>
    </div>

    <el-row v-show="routeData.isCheckUSorCA">
      <el-row :lg="12" :md="12">
        <br>
        <span class="column_content">{{$t('TIP_FOR_US_AND_CA')}}</span>
      </el-row>
    </el-row>

  </el-row>
</template>

<script>
  import {mapGetters} from 'vuex'
  import DateUtils from '../common/DateUtils'

  export default {
    data(){
      return {}
    },
    props: {},
    mounted() {
      this.init();
    },
    methods:{
      init:function () {
        var line = document.getElementById("oceanLeg-preview-line");
        if (line) {
          var lineHeight = (this.routeData.selectedRoute.oceanLegs.length * 3 - 2) * 36;
          line.style.height = lineHeight + 'px';
        }
      }
    },
    computed: {
      ...mapGetters({
        routeData: "getRouteData"
      })
    },
    watch: {
      "routeData.selectedRoute": function (data) {
        if (this.routeData.selectedRoute) {
          console.log("Test in.....")
          var line = document.getElementById("oceanLeg-preview-line");
          console.log(line)
          if (line) {
            var lineHeight = (this.routeData.selectedRoute.oceanLegs.length * 3 - 2) * 36;
            line.style.height = lineHeight + 'px';
          }
        }
      }
    },
    filters: {
      formatDate(str){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var weeks = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
        var date = new Date(str);
        return [date.getDate() < 10 ? "0" + date.getDate() : date.getDate(), months[date.getMonth()], "(" + weeks[date.getDay()] + ")"].join(" ");
      },
      filterCity(city){
        return city.split("(")[0];
      },
      getDate(value) {
        return DateUtils.formatOceanLegsDate(value)
      },
      getHour(value) {
        return DateUtils.formatterOceanLegsHour(value)
      },
      filterDirection(direction) {
        var obj = {
          "E": "(EastBound)",
          "W": "(WestBound)",
          "S": "(SouthBound)",
          "N": "(NorthBound)"
        };
        return obj[direction]
      },
      filterHaulage(value){
        var obj = {
          "B": "CY/Door",
          "C": "CY",
          "D": "Door"
        };
        return obj[value];
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.ROUTING{
   padding-bottom: 5px;
  padding-left: 10px;
  background: #2f9fd6;
  color:white;
  font-size: 24px

}
.column_content{
  padding-left: 20px;
  font-size: 12px;
  font-weight: bold
 

}
.column_title{
  padding-left: 20px;
  color:rgb(164,164,164);
  font-size: 10px;
  font-family:Arial
}


  .sailing-schedule-table{
    margin-bottom: 10px;
  }

  .text-center {
    text-align: center;
  }

  .gray {
    font-size: 12px;
    color: #333333;
  }

  .more-wrap {
    text-align: center;
    line-height: 30px;
  }

  table {
    width: 100%;
  }

  tr:hover td {
    background: none !important;
  }

  td {
    border: none !important;
    padding-bottom: 10px;
  }

  tr td:nth-child(1) {
    text-align: center;
  }

  .fa-ship {
    font-size: 30px;
    vertical-align: middle;
  }

  .legs-wrap {
  }

  .gray {
    font-size: 12px;
    color: #333333;
  }

  .label-top {
    vertical-align: top;
    color: #c63131;
  }

  .label-style {
    color: #c63131;
  }

  .bold {
    font-size: 18px;
  }

  .italic {
    font-style: italic;
  }

  .vessel-table {
    margin-bottom: 5px;
  }

  .service-wrap {
    max-height: 500px;
    overflow-y: auto;
  }

  .table-border {
    border: 1px solid #EEEEEE;
    border-radius: 5px;
  }

  .line {
    display: block;
    border-left: 1px dotted #333;
    height: 110%;
    position: relative;
    left: 50%;
    width: 0;
  }

  .text-center {
    text-align: center;
  }

  a {
    color: #69b8d6;
  }

  .cargo-nature {
    position: absolute;
    top: 50%;
    margin-top: -20px;
    left: -100px;
    display: block;
    width: 100px;
    text-align: right;
  }

  .triangle-bottom {
    border: 6px solid transparent;
    border-top: 6px solid #333;
    width: 0;
    height: 0;
    position: absolute;
    bottom: -10px;
    left: -6px;
  }

  .horizontal-line {
    height: 0;
    width: 40%;
    position: relative;
    border-bottom: 1px dotted #333;
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px;
  }

  .triangle-right {
    border: 6px solid transparent;
    border-left: 6px solid #333;
    width: 0;
    height: 0;
    position: absolute;
    right: -10px;
    top: -5px;
  }

  .haulage {
    display: inline-block;
  }

  .text-left {
    text-align: left;
  }
</style>
