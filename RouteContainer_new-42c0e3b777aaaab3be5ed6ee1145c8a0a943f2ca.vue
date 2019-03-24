<template>
  <div class="routing">
    <el-form :model="routeData" label-position="top" :rules="rules" ref="routeDataForm">
      <!--<el-row>
        <h1>{{$t("ROUTING")}}</h1>
      </el-row>-->

      <!-- door pickup&delivery -->
      <el-row :gutter="gutter">
        <el-col :lg="12" :md="12" :sm="12">
          <el-form-item :label="$t('DOOR_PICKUP')" class="required">
            <el-select :placeholder="$t('SELECT')" v-model="routeData.doorPickupSelect">
              <el-option
                v-for="type in doorPickup"
                :key="type.code"
                :value="type.name">
              </el-option>
             </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="12" :md="12" :sm="12">
          <el-form-item :label="$t('DOOR_DELIVERY')" class="required">
            <el-select :placeholder="$t('SELECT')" v-model="routeData.doorDeliverySelect">
              <el-option
                v-for="type in doorDelivery"
                :key="type.code"
                :value="type.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- origin&destination city -->
      <el-row :gutter="gutter">
        <el-col :lg="12" :md="12">
          <el-form-item :label="$t('FROM')" class="required">
            <type-ahead :src="cityApiUrl" queryName="cityName" :callback="cityCallback"
                        :placeholder="$t('FROM_PLACEHOLDER')"
                        :value.sync="routeData.originCityInput" :model.sync="routeData.placeOfReceipt" :data="isSailingSchedule"
                        :validate="validateCity('Origin city')"
                        :dirty.sync="routeData.originCityDirty"
                        @validate="setOriginCityValidateStatus"
                        :recommend-callback = "cityRecommend('origin')"></type-ahead>
               <div class="error-tip" v-if="routeData.originCityDirty && routeData.originCityInput && !('name' in routeData.placeOfReceipt)" >Please select from the list.</div>
          </el-form-item>

        </el-col>
        <el-col :lg="12" :md="12">
          <el-form-item :label="$t('TO')" class="required">
            <type-ahead :src="cityApiUrl" queryName="cityName" :callback="cityCallback"
                        :placeholder="$t('TO_PLACEHOLDER')"
                        :value.sync="routeData.destinationCityInput" :model.sync="routeData.finalDestination" :data="isSailingSchedule"
                        :validate="validateDestinationCity(routeData.originCityInput)"
                        :dirty.sync="routeData.destinationCityDirty"
                        @validate="setDestinationCityValidateStatus"
                        :recommend-callback = "cityRecommend('destination')"></type-ahead>
                <div class="error-tip" v-if="routeData.destinationCityDirty && routeData.destinationCityInput && (routeData.destinationCityInput!= routeData.originCityInput) && !('name' in routeData.finalDestination)" >Please select from the list.</div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="gutter">
        <el-col :lg="12" :md="12">
          <el-form-item :label="$t('BOOKING_OFFICE')" class="required">
            <type-ahead :value.sync="routeData.bookingOffice"
                        :src="cityApiUrl" :callback="cityCallback"
                        :validate="validatebookingOffice('Booking Office')"
                        :dirty.sync="routeData.bookingOfficeDirty"
                        @validate="setBookingOfficeValidateStatus"
                        :placeholder="$t('BOOKING_OFFICE')">
            </type-ahead>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="gutter">
        <el-col :lg="24">
          <el-row>
            <el-form-item :label="$t('VESSEL_VOYAGE')" class="required">
              <el-col class="tab1" :sm="12">
                <el-radio class="ui-wrap" v-model="routeData.isSailingSchedule" :label="1" ga-on="click" ga-event-action="click">
                  {{$t('FIND_FROM_SAILING_SCHEDULE')}}
                </el-radio>
              </el-col>
              <el-col class="tab2" :sm="12">
                <el-radio class="ui-wrap" v-model="routeData.isSailingSchedule" :label="2" ga-on="click" ga-event-action="click">
                  {{$t('INTENDED_VESSEL_VOYAGE')}}
                </el-radio>
              </el-col>
              <el-col class="tab3" :sm="24">
                <el-radio class="ui-wrap" v-model="routeData.isSailingSchedule" :label="3" ga-on="click" ga-event-action="click">
                  {{$t('EARLIEST_OR_LATEST')}}
                </el-radio>
              </el-col>

            </el-form-item>
          </el-row>
        </el-col>
      </el-row>

      <el-collapse-transition mode="out-in">
        <div v-if="routeData.isSailingSchedule === 1">
          <el-row :gutter="gutter">
            <el-col :lg="12" :md="11" :sm="11">
              <el-row>
                <el-form-item :label="$t('DATE_TYPE')" class="required">
                  <el-col :lg="12" :md="12" :sm="12">
                    <el-radio v-model="routeData.departure" :label="true">
                      {{$t('EARLIEST_DEPARTURE')}}
                    </el-radio>
                  </el-col>

                  <el-col :lg="12" :md="12" :sm="12">
                    <el-radio v-model="routeData.departure" :label="false">
                      {{$t('LAST_ARRIVAL')}}
                    </el-radio>
                  </el-col>

                  <el-col :lg="20" :md="20" :sm="19">
                    <el-form-item label-position="right">
                      <el-date-picker :clearable="true" :editable="false" v-model="routeData.searchConditionDate"
                                      style="width: 100%;" :picker-options="pickerOptions"
                                      :placeholder="$t('EMPTY_PICKUP_DATE')"></el-date-picker>
                         <div class="error-tip" v-if="!checkdate">Date is required.</div>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-col>

            <el-col :lg="12" :md="13" :sm="13">
              <el-form-item :label="$t('WEEKS')" class="required">
                <!--<br class="show-on-lg">-->
                <el-radio-group v-model="routeData.numberOfWeeks" class="no-wrap">
                  <el-radio-button :label="2"
                                   ga-on="click"
                                   ga-event-category="NumberOfWeeks"
                                   ga-event-action="click"
                                   ga-event-label="2 weeks"
                                   >2</el-radio-button>
                  <!--<el-radio-button :label="3">3</el-radio-button>-->
                  <el-radio-button :label="3"
                                   ga-on="click"
                                   ga-event-category="NumberOfWeeks"
                                   ga-event-action="click"
                                   ga-event-label="3 weeks">3</el-radio-button>
                  <!--<el-radio-button :label="5">5</el-radio-button>-->
                  <el-radio-button :label="4"
                                   ga-on="click"
                                   ga-event-category="NumberOfWeeks"
                                   ga-event-action="click"
                                   ga-event-label="4 weeks">4</el-radio-button>
                  <!--<el-radio-button :label="7">7</el-radio-button>-->
                  <el-radio-button :label="5"
                                   ga-on="click"  
                                   ga-event-category="NumberOfWeeks"
                                   ga-event-action="click"
                                   ga-event-label="5 weeks">5</el-radio-button>
                  <!--<el-radio-button :label="9">9</el-radio-button>-->
                  <el-radio-button :label="6"
                                   ga-on="click"
                                   ga-event-category="NumberOfWeeks"
                                   ga-event-action="click"
                                   ga-event-label="6 weeks">6</el-radio-button>
                  <!--<el-radio-button :label="11">11</el-radio-button>-->
                  <el-radio-button :label="7"
                                   ga-on="click"
                                   ga-event-category="NumberOfWeeks"
                                   ga-event-action="click"
                                   ga-event-label="7 weeks">7</el-radio-button>
                  <!--<el-radio-button :label="11">11</el-radio-button>-->
                  <el-radio-button :label="8"
                                   ga-on="click"
                                   ga-event-category="NumberOfWeeks"
                                   ga-event-action="click"
                                   ga-event-label="8 weeks">8</el-radio-button>
                  <el-button ga-on="click"
                             ga-event-category="findSailingSchedule"
                             ga-event-action="click"
                             :ga-event-label="routeData.numberOfWeeks + ' weeks,' + routeData.placeOfReceipt.cityKey + ',' + routeData.finalDestination.cityKey"
                             @click="findSailingSchedule" type="success" :plain="true" :disabled="finding"
                             class="search-btn" size="mini">
                    {{$t('SEARCH')}}
                  </el-button>
                </el-radio-group>

              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :lg="24" class="result-table">
              <sailing-schedule-table :show="showScheduleTable"
                                      :data.sync="routeData.sailingScheduleResults"
                                      :selected-route.sync="routeData.selectedRoute"
                                      :destination-city="scheduleDestinationCity"
                                      :origin-city="scheduleOriginCity"
                                      :placeholder="$t('FROM_PLACEHOLDER')" ></sailing-schedule-table>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>

      <!--SVVD start-->
      <el-collapse-transition mode="out-in">
        <div v-if="routeData.isSailingSchedule === 2">
          <el-row :gutter="gutter" :class="{required:routeData.judgeChina}">
            <el-col :lg="12" :md="12">
              <el-form-item :label="$t('POL')">
                <type-ahead-port :src="portApiUrl" queryName="portName" :callback="portCallback"
                                 :model.sync="routeData.pol" :value.sync="routeData.polInput"
                                 :placeholder="$t('FROM_PLACEHOLDER')" 
                                 :validate="validatePort('Port of Load')"
                                 :dirty.sync="routeData.polDirty"
                                 @validate="setPolValidateStatus">                                                                                                           
                </type-ahead-port>
                <div class="error-tip" v-if="routeData.polDirty && !('portName' in routeData.pol) && routeData.polInput" >Please select from the list.</div>    
              </el-form-item>
            </el-col>

            <el-col :lg="12" :md="12">
              <el-form-item :label="$t('POD')">
                <type-ahead-port :src="portApiUrl" queryName="portName" :callback="portCallback"
                                 :model.sync="routeData.pod" :value.sync="routeData.podInput"
                                 :placeholder="$t('TO_PLACEHOLDER')"
                                 :validate="validatePort('Port of Delivery')"
                                 :dirty.sync="routeData.podDirty"
                                 @validate="setPodValidateStatus">
                </type-ahead-port>
                <div class="error-tip" v-if="routeData.podDirty && !('portName' in routeData.pod) && routeData.podInput" >Please select from the list.</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="gutter">
            <el-col :lg="6" :md="6" :sm="12">
              <el-form-item :label="$t('SERVICE')" prop="svvd.service">
                <el-input v-model="routeData.svvd.service" :maxlength="4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="10" :md="10" :sm="12">
              <el-form-item :label="$t('VESSEL_NAME')" prop="svvd.vesselName" class="required">
                <el-input v-model="routeData.svvd.vesselName" :maxlength="30"></el-input>
              </el-form-item>
            </el-col>
            </el-col>
            <el-col :lg="8" :md="8" :sm="12">
              <el-form-item :label="$t('VOYAGE')" prop="svvd.externalVoyageNumber" class="required">
                <el-input v-model="routeData.svvd.externalVoyageNumber" :maxlength="8"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
      <!--SVVD end-->

      <el-collapse-transition mode="out-in">
        <div v-if="routeData.isSailingSchedule === 3">
          <el-row :gutter="gutter" :class="{required:routeData.judgeChina}">
            <el-col :lg="12" :md="12">
              <el-form-item :label="$t('POL')">
                <type-ahead-port :src="portApiUrl" queryName="portName" :callback="portCallback"
                                :model.sync="routeData.pol" :value.sync="routeData.polInput"
                                :placeholder="$t('FROM_PLACEHOLDER')" 
                                :validate="validatePort('Port of Load')"
                                :dirty.sync="routeData.polDirty"
                                @validate="setPolValidateStatus">                                                                                                           
                </type-ahead-port>
                <div class="error-tip" v-if="routeData.polDirty && !('portName' in routeData.pol) && routeData.polInput" >Please select from the list.</div>    
              </el-form-item>
            </el-col>

            <el-col :lg="12" :md="12">
              <el-form-item :label="$t('POD')">
                <type-ahead-port :src="portApiUrl" queryName="portName" :callback="portCallback"
                                :model.sync="routeData.pod" :value.sync="routeData.podInput"
                                :placeholder="$t('TO_PLACEHOLDER')"
                                :validate="validatePort('Port of Delivery')"
                                :dirty.sync="routeData.podDirty"
                                @validate="setPodValidateStatus">
                </type-ahead-port>
                <div class="error-tip" v-if="routeData.podDirty && !('portName' in routeData.pod) && routeData.podInput" >Please select from the list.</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="gutter">
              <el-col :lg="12" :md="12">
                <el-row>
                  <el-form-item :label="$t('DATE_TYPE')" class="required">
                    <el-col :lg="12" :md="12">
                      <el-radio v-model="routeData.departure3" :label="true">
                        {{$t('EARLIEST_DEPARTURE')}}
                      </el-radio>
                    </el-col>

                    <el-col :lg="12" :md="12">
                      <el-radio v-model="routeData.departure3" :label="false">
                        {{$t('LAST_ARRIVAL')}}
                      </el-radio>
                    </el-col>

                    <el-col :lg="20" :md="20">
                    <el-form-item label-position="right" prop="searchConditionDate3">
                      <el-date-picker :clearable="true" :editable="false" 
                                      style="width: 100%;" :picker-options="pickerOptions3"
                                      v-model="routeData.searchConditionDate3"
                                      :placeholder="$t('EMPTY_PICKUP_DATE')"></el-date-picker>
                      </el-form-item>
                    </el-col>
                
                  </el-form-item>
                </el-row>
              </el-col>
          </el-row>
        </div>
      </el-collapse-transition>

      <el-row>
        <el-form-item>
          <el-col>
            <el-checkbox class="ui-wrap" v-if="routeData.judgeUSorCA" v-model="routeData.isCheckUSorCA">
              {{$t('TIP_FOR_US_AND_CA')}}
            </el-checkbox>
          </el-col>
        </el-form-item>
      </el-row>

    </el-form>
  </div>
</template>
<script>
  import SailingScheduleTable from "@/route/SailingScheduleTable.vue"
  import sailingScheduleData from "../route/SailingScheduleData"
  import TypeAhead from '../common/TypeAhead'
  import TypeAheadPort from '../common/TypeAheadForPort'
  import {mapGetters, mapActions} from 'vuex'
  import mutationTypes from '../../store/mutationTypes'
  export default {
    components: {
      SailingScheduleTable,
      TypeAhead,
      TypeAheadPort
    },
    props: {},
    mounted(){
      if (this.routeData.sailingScheduleResults.length != 0) {
        this.showScheduleTable = true;
      }
    },
    data() {
      return {
        checkdate:true,
        //showOriginCountry:false,
        //showDestinationCountry:false,
        commonRegexp: "^([\\w_ \"'&.\\-;\\\\~`!@#$%\\^\\*\\(\\)\\+\\=\\|\\[\\]\\{\\}:,\\>\\<?/\\r\\n])*$",
        commonErrorMessage: "Please enter only letters (a-z, A-Z), numbers (0,9) and non-alphanumeric characters (! @ # $ %).",
        DEPARTURE_DEFAULT_DAYS: 1,
        ARRIVAL_DEFAULT_DAYS: 45,
        gutter: 15,
        finding: false,
        timeout: null,
        pickerOptions: {
          //onPick: this.onPick,
          disabledDate: this.disabledDateFn(-30)
        },
        pickerOptions3: {
          //onPick: this.onPick,
          disabledDate3: this.disabledDateFn(-30)
        },
        options: [],
        cityApiUrl: "/api/cities",
        portApiUrl: "/api/POLPOD",
        rules: {
          "svvd.service": [
            {max: 4, message: 'Maximun 4 characters', trigger: 'blur'},
            {validator: this.validateIllegalChar, trigger: "blur"}
          ],

          'svvd.vesselName': [
            {required: true, message: 'Vessel is required', trigger: 'blur'},
            {max: 30, message: 'Maximun 30 characters', trigger: 'blur'},
            {validator: this.validateIllegalChar, trigger: "blur"}
          ],
          'svvd.externalVoyageNumber': [
            {required: true, message: 'Voyage is required', trigger: 'blur'},
            {max: 8, message: 'Maximun 8 characters', trigger: 'blur'},
            {validator: this.validateIllegalChar, trigger: "blur"}
          ],
          "searchConditionDate3":[{required:true,message:'Data is required'},{validator:this.validateConditionDate3,trigger:'blur'}]


        },
  
        showScheduleTable: false,
        scheduleOriginCity: "",
        scheduleDestinationCity: ""
      }
    },
    methods: {
      ...mapActions(["setRoutingProgress","setRoutingRecovery"]),
      cityRecommend(type){
          var self =this;
          return function(value,callback){
              self.$http.get('/api/recentCity?type=' + type,{showProgressBar:false}).then(function(res){
                  callback(res.data);
              }).catch(function(err){
                  callback([]);
              })
          }
      },
      //portRecommend(){
          // var self =this;
          // return function(value,callback){
          //     self.$http.get('/api/recentCity?type=' + type,{showProgressBar:false}).then(function(res){
          //         callback(res.data);
          //     }).catch(function(err){
          //         callback([]);
          //     })
      //    },
      setOriginCityValidateStatus(flag){
        if('name' in this.routeData.placeOfReceipt)
            this.routeData.isOriginCityValid = true;
        else
            this.routeData.isOriginCityValid = false;
      },
      setDestinationCityValidateStatus(flag){
        if('name' in this.routeData.finalDestination)
            this.routeData.isDestinationCityValid = true;
        else
            this.routeData.isDestinationCityValid = false;
      },
      setPolValidateStatus(flag){
        if(this.routeData.judgeChina){
            if(this.routeData.polInput){
                 if('portName' in this.routeData.pol)
                     this.routeData.isPolValid = true;
                 else
                     this.routeData.isPolValid = false;
            }
            else
                this.routeData.isPolValid = false;
        }
        else
        {
          if(this.routeData.polInput){
            if('portName' in this.routeData.pol)
                     this.routeData.isPolValid = true;
                 else
                     this.routeData.isPolValid = false;
            }
            else
                this.routeData.isPolValid = true;
        }
      },
      setPodValidateStatus(flag){
        if(this.routeData.judgeChina){
            if(this.routeData.podInput){
                 if('portName' in this.routeData.pod)
                     this.routeData.isPodValid = true;
                 else
                     this.routeData.isPodValid = false;
            }
            else
                this.routeData.isPodValid = false;
        }
        else
        {
          if(this.routeData.podInput){
            if('portName' in this.routeData.pod)
                     this.routeData.isPodValid = true;
                 else
                     this.routeData.isPodValid = false;
            }
            else
                this.routeData.isPodValid = true;
        }
      },
      setBookingOfficeValidateStatus(flag){
        this.routeData.isBookingOfficeValid = flag;
      },

      validateIllegalChar(rule, value, callback){
        if (!new RegExp(this.commonRegexp).test(value)) {
          return callback(new Error(this.commonErrorMessage));
        }
        callback();
      },
      validateCity(type){
        var self = this;
        return function(value,model){
          if (!value || !value.trim()) {
            return new Error(type + " is required");
          }
          if (value.length > 60 &&(Object.keys(model).length==0)) {
            return new Error("Maximum 60 characters");
          }
          var regex = new RegExp(self.commonRegexp);
          if (!regex.test(value)) {
            return new Error(self.commonErrorMessage);
          }
        }
      },
       validatebookingOffice(type){
        var self = this;
        return function(value,model){
          if (!value || !value.trim()) {
            return new Error(type + " is required");
          }
          if (value.length > 60 &&(Object.keys(model).length==0)) {
            return new Error("Maximum 60 characters");
          }
          var regex = new RegExp(self.commonRegexp);
          if (!regex.test(value)) {
            return new Error(self.commonErrorMessage);
          }
        }
      },
      validatePort(type){
      var self = this;
        return function(value,model){
          if(self.routeData.judgeChina){
            if (!value || !value.trim()) {
              return new Error(type + " is required")
            }
          }
            if (value.length > 60 &&(Object.keys(model).length==0)) {
              return new Error("Maximum 60 characters");
            }
          var regex = new RegExp(self.commonRegexp);
          if (!regex.test(value)) {
            return new Error(self.commonErrorMessage);
          }
        }
      },

      validateConditionDate3(callback){ 
         if(!this.routeData.searchConditionDate3){   
               
              return callback(new Error("Data is required"));
        }
        callback();
      },
      //judge that the destination city is the same as the departure city
      validateDestinationCity(type){
        var self = this;
        return function(value,model){
          if (!value || !value.trim()) {
            return new Error("Destination City is required")
          }else if(type == value){
            return new Error("The cities are the same")
          }
          if (value.length > 60 && (Object.keys(model).length==0)) {
            return new Error("Maximum 60 characters");
          }
          var regex = new RegExp(self.commonRegexp);
          if (!regex.test(value)) {
            return new Error(self.commonErrorMessage);
          }
        }
      },
      cityCallback(data){
        return data.result;
      },
      portCallback(data){
        return data.result;
      },

      disabledDateFn(days = 0){
        return function (time) {
          var date = new Date();
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          return time.getTime() < (date.getTime() + days * 24 * 3600 * 1000)
        }
      },

      validateSVVD(field,value){
          if(field=="externalVoyageNumber"){
              if(!value){
                  return false;
              }
          }
          if(field=="vesselName"){
              if(!value){
                  return false;
              }
          }
        return new RegExp(this.commonRegexp).test(value);
      },
      findSailingSchedule(){
        var self = this;
        var placeOfReceipt = JSON.parse(JSON.stringify(this.routeData.placeOfReceipt));

        delete placeOfReceipt.name;
        var finalDestination = JSON.parse(JSON.stringify(this.routeData.finalDestination));
        delete finalDestination.name;
        var data = {
          "departure": this.routeData.departure,
          "numberOfWeeks": this.routeData.numberOfWeeks,
          "searchConditionDate": this.formatDate(this.routeData.searchConditionDate),
          "placeOfReceipt": this.routeData.placeOfReceipt,
          "finalDestination": this.routeData.finalDestination,
          "cargoNature": this.cargoType == "RF" ? this.cargoType : "GC"
        };

        //this.routeData.sailingScheduleResults = sailingScheduleData;
        var flag = true;
        if (!this.routeData.originCityInputHiddenValue || !this.routeData.destinationCityInputHiddenValue) {
          flag = false;
          this.$message({
            showClose: true,
            message: 'To search for a sailing schedule, Both origin city and destination city should select from autocomplete list.',
            type: 'warning',
            duration: 5000
          });
        }
        else if(this.routeData.originCityInputHiddenValue == this.routeData.destinationCityInputHiddenValue)
        {
          flag = false;
          this.$message({
            showClose: true,
            message: 'To search for a sailing schedule, origin city and destination city should not be the same.',
            type: 'warning',
            duration: 5000
          });
        }
        if (!flag) {
          return;
        }
        this.finding = true;
        this.$http.post('/api/sailingSchedule', data).then(function (res) {
          self.finding = false;
          self.showScheduleTable = true;
          self.scheduleOriginCity = self.routeData.originCityInput;
          self.scheduleDestinationCity = self.routeData.destinationCityInput;
          if (!res.data || !res.data.results) {
            return self.routeData.sailingScheduleResults = [];
          }
          res.data.results.forEach(function (item, index) {
            //generate an id for this route
            item.id = new Date().getTime() + item.index + "";
            //for sorting
            item.firstPortPOLETDDate = new Date(item.oceanLegs[0].polETDDate).getTime();
            item.etaAtFNDDateTimeExternal = new Date(item.etaAtFNDDateTime).getTime();
            item.cutOffLocalDateExternal = new Date([item.cutOffLocalDate, item.cutOffLocalTime].join(" ")).getTime();
            item.estimatedTransitTimeInDays = parseInt(item.estimatedTransitTimeInDays);

          });
          self.routeData.sailingScheduleResults = res.data.results;
        }).catch(function (error) {
          self.finding = false;
        })

      },
      formatDate(str){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var date = typeof str == "string" ? new Date(str) : str;
        return [date.getDate(), months[date.getMonth()], date.getFullYear()].join(" ");
      },
      calculateProgress(){
        var self = this;
        var progress = {
          totalMandatoryFields: 0,
          hasCompletedFields: 0
        };
        if(this.routeData.isSailingSchedule === 1){
          progress.totalMandatoryFields = 4;
          progress.hasCompletedFields = 4;
          !this.routeData.searchConditionDate ? progress.hasCompletedFields -= 1 : "";
        }
        else{//2or3
          if(this.routeData.isSailingSchedule === 2){//2
            progress.totalMandatoryFields = 5;
            progress.hasCompletedFields = 5;
            if(this.routeData.svvd.service){
              progress.totalMandatoryFields += 1;
              progress.hasCompletedFields += 1;
              !this.validateSVVD("service",this.routeData.svvd.service) ? progress.hasCompletedFields -= 1 : "";
            }
            !this.validateSVVD("externalVoyageNumber",this.routeData.svvd.externalVoyageNumber) ? progress.hasCompletedFields -= 1 : "";
            !this.validateSVVD("vesselName",this.routeData.svvd.vesselName) ? progress.hasCompletedFields -= 1 : "";
          }
          else{//3
            progress.totalMandatoryFields = 5;
            progress.hasCompletedFields = 5;
            !this.routeData.searchConditionDate3 ? progress.hasCompletedFields -= 1 : "";
          }

            progress.totalMandatoryFields += 2;
            progress.hasCompletedFields += 2;
            !this.routeData.isPolValid ? progress.hasCompletedFields -= 1 : "";
            !this.routeData.isPodValid ? progress.hasCompletedFields -= 1 : "";

        }
        !this.routeData.isOriginCityValid ? progress.hasCompletedFields -= 1 : "";
        !this.routeData.isDestinationCityValid ? progress.hasCompletedFields -= 1 : "";
        !this.routeData.isBookingOfficeValid ? progress.hasCompletedFields -= 1 : "";

        this.setRoutingProgress(progress);
      },
      validateRouteForm(callback){
        var self = this;
        //if (this.routeData.originCityInput && !this.routeData.originCityInputHiddenValue) {
        //  this.showOriginCountry = true;
        //}
        //if (this.routeData.destinationCityInput && !this.routeData.destinationCityInputHiddenValue) {
        //  this.showDestinationCountry = true;
        //}
        this.routeData.originCityDirty = true;
        this.routeData.destinationCityDirty = true;
        this.routeData.bookingOfficeDirty = true;
        this.routeData.polDirty = true;
        this.routeData.podDirty = true;
        this.routeData.dateDirty = true;
   

        setTimeout(function () {
          self.$refs.routeDataForm.validate(function (valid) {
            var flag = self.routeData.isOriginCityValid && self.routeData.isDestinationCityValid && valid && self.routeData.isBookingOfficeValid && self.routeData.searchConditionDate;
            if(self.routeData.judgeChina && (self.routeData.isSailingSchedule ==2 || self.routeData.isSailingSchedule ==3 )){
                flag=flag && self.routeData.isPolValid && self.routeData.isPodValid;
            }
            if(self.routeData.isSailingSchedule ==3 ){
                flag=flag && self.routeData.searchConditionDate3;
            }
            callback(flag)
          })
        }, 100)
      }
    },
    watch: {
      submitStatus(flag){
        var self = this;
        if(flag){
          this.validateRouteForm(function(valid){
            self.$store.commit(mutationTypes.SET_ROUTING_VALIDATE_STATUS,valid);
            self.$store.commit(mutationTypes.SET_VALIDATE_COUNT,6);
          });
        }
      },
      initStatus(flag){
        if(flag){
          this.$store.commit(mutationTypes.INIT_ROUTE_DATA);
          this.$store.commit(mutationTypes.INIT_ROUTE_PROGRESS);
          this.showScheduleTable = false;
          this.scheduleOriginCity = "";
          this.scheduleDestinationCity = "";
        }
      },
      "routeData.searchConditionDate": function (date) {
        if(!this.routeData.searchConditionDate)
            this.checkdate=false;
        else 
            this.checkdate=true;
        if (this.routeData.departure) {
          this.routeData.userSearchConditionDateDeparture = new Date(date.getTime? date.getTime() : date);
        } else {
          this.routeData.userSearchConditionDateArrival = new Date(date.getTime? date.getTime() : date);
        }
      },

       "routeData.searchConditionDate3": function (date) {
        if (this.routeData.departure3) {
          this.routeData.userSearchConditionDateDeparture3 = new Date(date.getTime? date.getTime() : date);
        } else {
          this.routeData.userSearchConditionDateArrival3 = new Date(date.getTime? date.getTime() : date);
        }
      },
      
      "routeData.departure": function (isDeparture) {
        var count;
        count = isDeparture ? -30 : 0;
        this.pickerOptions.disabledDate = this.disabledDateFn(count);
        if (!isDeparture) {
          //if(this.routeData.searchConditionDate.getTime() < new Date().getTime()){
          this.routeData.searchConditionDate = this.routeData.userSearchConditionDateArrival ? new Date(this.routeData.userSearchConditionDateArrival.getTime()) : new Date(new Date().getTime() + this.ARRIVAL_DEFAULT_DAYS * 24 * 3600000);
          //}
          //this.routeData.userSearchConditionDateArrival = new Date(this.routeData.searchConditionDate.getTime());
        } else {
          this.routeData.searchConditionDate = this.routeData.userSearchConditionDateDeparture ? new Date(this.routeData.userSearchConditionDateDeparture.getTime()) : new Date(new Date().getTime() + this.DEPARTURE_DEFAULT_DAYS * 24 * 3600000);
        }
      },

      "routeData.departure3": function (isDeparture) {
        if (!isDeparture) {
          this.routeData.searchConditionDate3 = this.routeData.userSearchConditionDateArrival3;
        } else {
          this.routeData.searchConditionDate3 = this.routeData.userSearchConditionDateDeparture3;
        }
      },

      "routeData.placeOfReceipt": function (place) {
        if (!Object.keys(place).length) {
          return this.routeData.originCityInputHiddenValue = "";
        }
        //this.showOriginCountry = false;
        //this.routeData.originCountryInput = "";

        if (this.routeData.isSailingSchedule === 1) {
          var stringArr = [place.cityKey, place.city, place.county, place.state, place.country, place.unLocationCode];
          this.routeData.originCityInputHiddenValue = stringArr.join(";;;");
        } else {
          this.routeData.originCityInputHiddenValue = place.cityKey;
        }
      },
      "routeData.finalDestination": function (place) {
        if (!Object.keys(place).length) {
          return this.routeData.destinationCityInputHiddenValue = "";
        }
        //this.showDestinationCountry = false;
        //this.routeData.destinationCountryInput = "";
        if (this.routeData.isSailingSchedule === 1) {
          var stringArr = [place.cityKey, place.city, place.county, place.state, place.country, place.unLocationCode];
          this.routeData.destinationCityInputHiddenValue = stringArr.join(";;;");
        } else {
          this.routeData.destinationCityInputHiddenValue = place.cityKey;
        }

      },
      "routeData": {
        deep: true,
        handler: function (value) {
          var self = this;
            this.$store.commit("UPDATE_ROUTEDATA", value);
          setTimeout(function(){
            self.calculateProgress()
          },100)
        }
      },
      "routeData.originCityInput": function(flag){
          var Rule1 = /CHINA(\([A-Z]+\))?$/i;
          this.routeData.judgeChina = Rule1.test(flag);
          var Rule2 = /(United States)|(CANADA)(\([A-Z]+\))?$/i;
          this.routeData.judgeUSorCA = Rule2.test(flag);

          this.routeData.bookingOffice = flag;
      },
      "routeData.bookingOffice": function(flag){

          this.routeData.bookingOffice = flag;

      },
      "routeData.isSailingSchedule": function (flag) {
        var self = this;
        var origin = this.routeData.originCityInput;
        var destination = this.routeData.destinationCityInput;

        var Rule1 = /CHINA(\([A-Z]+\))?$/i;
        this.routeData.judgeChina = Rule1.test(origin);

        if (origin.length >= 3) {
          this.$http.get(this.cityApiUrl + "?cityName=" + origin + "&isSailingSchedule=" + flag, {showProgressBar: false}).then(function (res) {
            var data = res.data.result;
            if (!data || data.indexOf('html') != -1) {
              return self.routeData.placeOfReceipt = {};
            }
            var flag = false;
            data.forEach(function (item) {
              if (item.name.toUpperCase().trim() === self.routeData.originCityInput.toUpperCase().trim()) {
                flag = true;
                self.routeData.placeOfReceipt = item;
              }
            });
            if (!flag) {
              self.routeData.placeOfReceipt = {};
              self.routeData.originCityInputHiddenValue = "";
            }
          })
        }
        if (destination.length >= 3) {
          this.$http.get(this.cityApiUrl + "?cityName=" + destination + "&isSailingSchedule=" + flag, {showProgressBar: false}).then(function (res) {
            var data = res.data.result;
            if (!data || data.indexOf('html') !=-1) {
              return self.routeData.finalDestination = {};
            }
            var flag = false;
            data.forEach(function (item) {
              if (item.name.toUpperCase().trim() === self.routeData.destinationCityInput.toUpperCase().trim()) {
                flag = true;
                self.routeData.finalDestination = item;
              }
            });
            if (!flag) {
              self.routeData.finalDestination = {};
              self.routeData.destCityInputHiddenValue = "";
            }
          })
        }
      },
      researchSailingSchedule(value){
          if(value){
            this.findSailingSchedule();
            this.$store.commit(mutationTypes.RESEARCH_SAILING_SCHEDULE,false);

          }
      },
      routingRecovery: function (val){

        var self=this;
        if(val){
          if(self.restoreBR.routeData){
            self.routeData.originCityInput=self.restoreBR.routeData.originCityInput;
            self.routeData.originCityInputHiddenValue=self.restoreBR.routeData.originCityInputHiddenValue;
            self.routeData.placeOfReceipt=self.restoreBR.routeData.placeOfReceipt;
            self.routeData.destinationCityInput=self.restoreBR.routeData.destinationCityInput;
            self.routeData.destinationCityInputHiddenValue=self.restoreBR.routeData.destinationCityInputHiddenValue;
            self.routeData.finalDestination=self.restoreBR.routeData.finalDestination;
            self.routeData.isSailingSchedule=self.restoreBR.routeData.isSailingSchedule;

            self.routeData.pol=self.restoreBR.routeData.pol;
            self.routeData.pod=self.restoreBR.routeData.pod;
            self.routeData.doorPickupSelect=self.restoreBR.routeData.doorPickupSelect;
            self.routeData.doorDeliverySelect=self.restoreBR.routeData.doorDeliverySelect;
            self.routeData.bookingOffice=self.restoreBR.routeData.bookingOffice;
            self.routeData.polInput=self.restoreBR.routeData.polInput;
            self.routeData.podInput=self.restoreBR.routeData.podInput;
            self.routeData.isCheckUSorCA=self.restoreBR.routeData.isCheckUSorCA;
            self.routeData.judgeUSorCA=self.restoreBR.routeData.judgeUSorCA;
            self.routeData.judgeChina=self.restoreBR.routeData.judgeChina;

            if(self.routeData.isSailingSchedule==1){
              self.routeData.departure=self.restoreBR.routeData.departure;
              self.routeData.numberOfWeeks=self.restoreBR.routeData.numberOfWeeks;
              self.routeData.searchConditionDate=self.restoreBR.routeData.searchConditionDate;
            }
            if(self.routeData.isSailingSchedule==2){
              self.routeData.svvd=self.restoreBR.routeData.svvd;
            }
            if(self.routeData.isSailingSchedule==3){
              self.routeData.departure3=self.restoreBR.routeData.departure3;
              self.routeData.searchConditionDate3=self.restoreBR.routeData.searchConditionDate3;
            }

          }this.setRoutingRecovery(false);
        }
      }
    },
    computed: {
      ...mapGetters({
        doorPickup: "getDoorPickupData",
        doorDelivery: "getDoorDeliveryData",
        cargoType: 'getCargoType',
        countries: "getCountries",
        routeData: "getRouteData",
        submitStatus: 'getSubmitStatus',
        researchSailingSchedule:"getResearchSailingSchedule",
        routingRecovery:"getRoutingRecovery",
        restoreBR: 'getRestoreBR',
        initStatus:'getInitStatus'
      }),
      isSailingSchedule(){
        var isSailingSchedule = this.routeData.isSailingSchedule;
        return {
          isSailingSchedule: isSailingSchedule
        }
      }

    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/theme.less";

  .result-table {
    margin-top: 10px;
  }

  .show-on-lg {
    display: none;
  }

  .search-btn {
    display: inline-block;
    margin-left: 5px;
    position: relative;
    top: 6px;
    height: 32px;
    width: 120px;
    border-radius: 2px;
    font-size: 12pt;
    padding: 8px 15px;
  }

  .no-wrap {
   white-space: nowrap;
   margin-top:15px;
  }

  .ui-wrap {
    white-space: normal;
    margin-top: 15px;
  }

  @media screen and (min-width: 992px) {
    .show-on-lg {
      display: block;
    }
  }

  .pointer {
    cursor: pointer;
  }

  .tab1 {
    width: auto;
    margin-right: 20px;
  }
  .tab2 {
    width: auto;
    margin-right: 20px;
  }
  .tab3 {
    width: 439px;
  }
</style>
