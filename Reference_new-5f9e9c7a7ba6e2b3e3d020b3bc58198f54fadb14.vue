<template>
  <div class="reference reference-edit" style="margin-top: 0px">
    <el-form label-position="top" >
      <el-row class="input-block">
        <el-col>
            <el-form-item :label="$t('COMPANY')" class="required" >
              <!--<el-input v-model="reference.partyName"  @blur="validateRequire(reference.partyName,'isCompanyValid')" :maxlength.number="70"></el-input>-->
              <type-ahead :src="queryCompanyUrl" queryName="query" :isDisabled="isDisabled"
              :callback="queryCompanyCallback" 
              :placeholder="$t('ENTER_COMPANY_NAME')"
              :value.sync="queryCompanyKey" 
              :recommendCallback="companyRecommend()"
              :model.sync="autoCompletePartySelected" 
              :validRequire="validateStatus">
              </type-ahead>
              <transition name="el-zoom-in-top">
                <div class="error-tip"  v-if="!validateStatus.isCompanyValid" >{{companyInvalidMsg}}</div>
              </transition>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row class="input-block">
        <el-col>
          <el-form-item :label="$t('STREET')" :class="{required:(this.partyTypeByRadio!='Consignee')}" >
            <!--<el-input v-model="reference.address.addressLine" placeholder="" @blur="validateRequire(reference.address.addressLine,'isAddressValid')" :maxlength.number="100"></el-input>-->
            <el-input v-model="reference.address.addressLine" placeholder="" @blur="validateAddressLine()" :maxlength.number="100"></el-input>
            <transition name="el-zoom-in-top">
              <div class="error-tip" v-if="!validateStatus.isAddressValid && (this.partyTypeByRadio!='Consignee')" >{{streetInvalidMsg}}</div>
            </transition>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="input-block">
        <el-col>
          <el-form-item :label="$t('CITY')" :class="{required:(this.partyTypeByRadio!='Consignee')}">
            <!--<el-input v-model="reference.address.city" placeholder="" @blur="validateRequire(reference.address.city,'isCityValid')" :maxlength.number="60"></el-input>-->
            <el-input v-model="reference.address.city" placeholder="" @blur="validateCity()" :maxlength.number="60"></el-input>
            <transition name="el-zoom-in-top">
              <div class="error-tip" v-if="!validateStatus.isCityValid && (this.partyTypeByRadio!='Consignee')" >{{cityInvalidMsg}}</div>
            </transition>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="input-block">
        <el-col :lg="12" :md="12" :sm="12" :xs="12">
          <el-form-item :label="$t('COUNTY')" >
          <el-input v-model="reference.address.county" placeholder="" :maxlength.number="35" @blur="validateCounty()"></el-input>
            <transition name="el-zoom-in-top">
              <div class="error-tip" v-if="!validateStatus.isCountyValid" >{{countyInvalidMsg}}</div>
            </transition>
            </el-form-item>
        </el-col>

        <el-col :lg="12" :md="12" :sm="12" :xs="12">
          <el-form-item :label="$t('STATE')">
            <el-input v-model="reference.address.state" placeholder="" :maxlength.number="35" @blur="validateProvince"></el-input>
            <transition name="el-zoom-in-top">
              <div class="error-tip" v-if="!validateStatus.isProvinceValid" >{{provinceInvalidMsg}}</div>
            </transition>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="input-block" :gutter="20">
        <el-col :lg="12" :md="12" :sm="12" :xs="12">
          <!--el-form-item :label="$t('COUNTRY')" class="required"-->
          <el-form-item :label="$t('COUNTRY')" :class="{required:(this.partyTypeByRadio!='Consignee')}">
          <el-select @visible-change="validateCountry" @blur="validateCountry()"
            v-model="reference.address.country"
            filterable clearable
            loading-text="loading..."
            :placeholder="$t('ENTER_COUNTRY_NAME')"
            :loading="loading"
            class="region">
            <el-option
              v-for="item in dropDownListData.countries"
              :key="item.name"
              :label="item.name"
              :value="item.name" >
            </el-option>
          </el-select>
              <transition name="el-zoom-in-top">
                <div class="error-tip" style="border-top-color:#e54e3b;width: 100%;margin-top: -1px" v-if="!validateStatus.isCountryValid && (this.partyTypeByRadio!='Consignee')">{{countryInvalidMsg}}</div>
              </transition>
            </el-form-item>
        </el-col>
        <el-col :lg="12" :md="12" :sm="12" :xs="12">
          <el-form-item :label="$t('ZIP')" >
            <el-input v-model="reference.address.postalCode" placeholder="" :maxlength.number="10" @blur="validateZip()"></el-input>
            <transition name="el-zoom-in-top">
              <div class="error-tip" style="border-top-color:#e54e3b;width: 100%;margin-top: -1px" v-if="!validateStatus.isZipValid">{{zipInvalidMsg}}</div>
            </transition>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="input-block">
        <el-form-item :label="$t('NAME')" >
          <el-col class="name">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item >
                <el-input v-model="reference.contact.firstName" :placeholder="$t('FIRST_NAME')" :maxlength.number="35" @blur="validateFirstName()"></el-input>
                  <transition name="el-zoom-in-top">
                    <div class="error-tip" style="border-top-color:#e54e3b;width: 100%;margin-top: -1px" v-if="!validateStatus.isFirstNameValid">{{firstNameInvalidMsg}}</div>
                  </transition>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                <el-input v-model="reference.contact.lastName" :placeholder="$t('LAST_NAME')" :maxlength.number="35" @blur="validateLastName"></el-input>
                  <transition name="el-zoom-in-top">
                    <div class="error-tip" style="border-top-color:#e54e3b;width: 100%;margin-top: -1px" v-if="!validateStatus.isLastNameValid">{{lastNameInvalidMsg}}</div>
                  </transition>
                  </el-form-item>
              </el-col>

            </el-row>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row class="input-block">
        <el-form-item :label="$t('PHONE')" >
        <el-col :span="24">
          <el-row type="flex" :gutter="10">
            <el-col :span="12">
              <el-row type="flex" :gutter="10">
                <el-col :span="12">
                  <el-form-item>
                    <el-input  v-model="reference.contact.phone.countryCode" :placeholder="$t('PHONE_COUNTRY')" :maxlength.number="3" @blur="validatePhone"></el-input>
                    <transition name="el-zoom-in-top">
                      <div class="error-tip" v-if="!validateStatus.isCountryPhoneValid" >{{countryPhoneValidateMsg}}</div>
                    </transition>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <el-input v-model="reference.contact.phone.areaCode" :placeholder="$t('PHONE_AREA')" :maxlength.number="5" @blur="validatePhone"></el-input>
                    <transition name="el-zoom-in-top">
                      <div class="error-tip" v-if="!validateStatus.isAreaPhoneValid" >{{areaPhoneValidateMsg}}</div>
                    </transition>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-input v-model="reference.contact.phone.number" :placeholder="$t('PHONE_LOCAL')" :maxlength.number="22" @blur="validatePhone" ></el-input>
                <transition name="el-zoom-in-top">
                  <div class="error-tip" v-if="!validateStatus.isLocalPhoneValid" >{{localPhoneValidateMsg}}</div>
                </transition>
              </el-form-item>

            </el-col>

          </el-row>
        </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
  <!--</el-col>-->
</template>
<script>
  import {mapGetters} from 'vuex'
  import _ from 'lodash'
  import TypeAhead from '@/common/TypeAheadForCompany'
  import partiesCommon from '@/parties/partiesCommon'
  export default {
    components: {
      TypeAhead
    },
    ready(){

    },
    props: ['title', 'reference', 'isDisabled','partyTypeByRadio'],
    data() {
      return {
        loading: false,
        autoCompleteCountryOptions: [],
        companyInvalidMsg:'Company is Required.',
        streetInvalidMsg:'Street is Required.',
        cityInvalidMsg:'City is Required.',
        phoneValidateMsg:'',
        countryInvalidMsg:'',
        countyInvalidMsg:'',
        provinceInvalidMsg:'',
        zipInvalidMsg:'',
        firstNameInvalidMsg:'',
        lastNameInvalidMsg:'',
        countryPhoneValidateMsg:'',
        areaPhoneValidateMsg:'',
        localPhoneValidateMsg:'',
        validateStatus:{
          isCompanyValid:true,
          isCountryValid:true,
          isAddressValid:true,
          isCityValid:true,
          isPhoneValid:true,
          isCountyValid:true,
          isZipValid:true,
          isFirstNameValid:true,
          isLastNameValid:true,
          isCountryPhoneValid:true,
          isAreaPhoneValid:true,
          isLocalPhoneValid:true,
          isProvinceValid:true

        },
        validateMsg:{
          companyInvalidMsg:'Company is Required.',
          streetInvalidMsg:'Street is Required.',
          cityInvalidMsg:'City is Required.',
        },
        queryCompanyKey:'',
        autoCompletePartySelected:{},
        queryCompanyUrl:'/api/parties/queryCompany',
        companyDiry:0
      }
    },
    computed:{
      ...mapGetters({
        dropDownListData: "getDropDownListData"
      })
    },
    watch: {
      autoCompletePartySelected: {
        handler:function(val, oldVal){
          if(val){
            this.reference.partyName = val.partyName;
            this.reference.address.addressLine = val.addressLine;
            this.reference.address.city = val.city;
            this.reference.address.country = val.country;
            this.reference.address.country = partiesCommon.mappingCountryName(this.reference.address.country)
            this.reference.address.county = val.county;
            this.reference.address.postalCode = val.postalCode;
            this.reference.address.state = val.state;
            this.reference.csCompanyID = '';
            this.reference.carrierCustomerCode = val.carrierCustomerCode||'';
            this.$set(this.reference,'contact',{phone:{}});
            var data={
              "company":this.autoCompletePartySelected,
              "type":this.partyTypeByRadio
            };
            this.$http.post('/api/saveRecentCompany',data).then(function(res){
              console.log("call save company success");
            }).catch(function(error){
            });
          }else{
            return;
          }
        },
        deep: true
      },
      queryCompanyKey:function(val){
        this.companyDiry++;
        if(this.companyDiry>=2){
          if(this.autoCompletePartySelected){
            if(this.autoCompletePartySelected.partyName != val){
              this.reference.carrierCustomerCode = ''
            }
          }else{
            this.reference.carrierCustomerCode = ''
          }
        }
        this.reference.partyName = val;
      }
    },
    created: function () {
      this.$root.eventHub.$on('validate',(target) => {
        let result = this.validateAll();
        this.$root.eventHub.$emit('updateReferenceValidStatus',result);
      });
      this.$root.eventHub.$on('updateCompanyInvalidMsg',(target) => {
       this.companyInvalidMsg = target;
    });

      this.queryCompanyKey = this.reference.partyName;
//      let valid = this.validateAll()
//      this.$root.eventHub.$emit('updateReferenceValidStatus', valid);
    },
    methods: {
      companyRecommend(){
        var self=this;
        return function(value,callback){
          self.$http.get('/api/recentCompany?type='+self.partyTypeByRadio,{showProgressBar:false}).then(function(res){
              callback(res.data);
          }).catch(function(err){
              callback([]);
          })
        }
      },
      queryCompanyCallback:function(res){
        let data = res.result;
        for(let i = 0; i < data.length; i++){
          let detail = '';
          if(data[i].addressLine)
            detail +=  data[i].addressLine;
          if(data[i].city)
            detail+=", "+data[i].city;
          if(data[i].postalCode)
            detail+=", "+data[i].postalCode;
          if(data[i].country)
            detail+=", "+data[i].country;
          data[i].detail = detail;
        }
        return data;
      },
      validateAll:function(){
        if(!this.reference.partyName){
          this.validateStatus.isCompanyValid = false;
          this.companyInvalidMsg = 'Company is required.'
        }
        this.validateAddressLine();
        this.validateCity();
        this.validateCountry();
        this.validateCounty();
        this.validateZip();
        this.validateFirstName();
        this.validateLastName();
        this.validatePhone();
        let val = this.validateStatus
        let valid = true;
        for(let key in val){
          if(!val[key]){
            valid = false;
          }
        }
        return valid;
      },
//      validatePhone:function(){
//        let phone = this.reference.contact.phone;
//        if(phone.countryCode||phone.number||phone.areaCode){
//          if(!(phone.countryCode)){
//            this.phoneValidateMsg = 'Country is required.';
//            this.validateStatus.isPhoneValid = false;
//            return;
//          }
//          if(!(phone.number)){
//            this.phoneValidateMsg = 'Local is required.';
//            this.validateStatus.isPhoneValid = false;
//            return;
//          }
//          if(phone.countryCode&&phone.number){
//            this.validateStatus.isPhoneValid = true;
//          }
//        }else{
//          this.validateStatus.isPhoneValid = true;
//        }
//      },
      validate:function(value,type){
        if(!partiesCommon.asciiChars(value)){
          this.validateStatus[type] = false;
          this.companyInvalidMsg = partiesCommon.asciiCharsTip;
          return;
        }
      },
//      validateRequire:function(value,type){
//        if(!value){
//          this.validateStatus[type] = false;
//        }else {
//          this.validateStatus[type]= true;
//        }
//      },
      validateRequire:function(value){
        if(!value){
          return false;
        }else {
          return true;
        }
      },
//      validateCountry:function(value){
//        if(!value){
//          this.validateRequire(this.reference.address.country,'isCountryValid');
//        }
//      },
      validateRequireField:function(val,valid,msg){
        if(!this.validateRequire(val)){
          valid = false;
          msg = 'Street is required.'
        }else if(!partiesCommon.asciiChars(val)){
          valid = false;
          msg = partiesCommon.asciiCharsTip
        }else{
          valid = true;
          msg = ''
        }
      },
      validateAddressLine:function(){

        if(!this.validateRequire(this.reference.address.addressLine) && (this.partyTypeByRadio!='Consignee')){
          this.validateStatus.isAddressValid = false;
          this.streetInvalidMsg = 'Street is required.'
        }else if(!partiesCommon.asciiChars(this.reference.address.addressLine)){
          this.validateStatus.isAddressValid = false;
          this.streetInvalidMsg = partiesCommon.asciiCharsTip
        }else{
          this.validateStatus.isAddressValid = true;
          this.streetInvalidMsg = ''
        }
      },
      validateCity:function(){
        if(!this.validateRequire(this.reference.address.city) && (this.partyTypeByRadio!='Consignee')){
          this.validateStatus.isCityValid = false;
          this.cityInvalidMsg = 'City is required.'
        }else if(!partiesCommon.asciiChars(this.reference.address.city)){
          this.validateStatus.isCityValid= false;
          this.cityInvalidMsg = partiesCommon.asciiCharsTip
        }else{
          this.validateStatus.isCityValid = true;
          this.streetInvalidMsg = ''
        }
      },
      validateCountry:function(){
        if(!this.validateRequire(this.reference.address.country) && (this.partyTypeByRadio!='Consignee')){
          this.validateStatus.isCountryValid = false;
          this.countryInvalidMsg = 'City is required.'
        }else if(!partiesCommon.asciiChars(this.reference.address.country)){
          this.validateStatus.isCountryValid= false;
          this.countryInvalidMsg = partiesCommon.asciiCharsTip
        }else{
          this.validateStatus.isCountryValid = true;
          this.countryInvalidMsg = ''
        }
      },
      validateCounty:function(){
        if(this.reference.address.county&&!partiesCommon.asciiChars(this.reference.address.county)){
          this.validateStatus.isCountyValid= false;
          this.countyInvalidMsg  = partiesCommon.asciiCharsTip
        }else{
          this.validateStatus.isCountyValid = true;
          this.countyInvalidMsg  = ''
        }
      },
      validateZip:function(){
        if(this.reference.address.postalCode&&!partiesCommon.asciiChars(this.reference.address.postalCode)){
          this.validateStatus.isZipValid= false;
          this.zipInvalidMsg  = partiesCommon.asciiCharsTip
        }else{
          this.validateStatus.isZipValid = true;
          this.zipInvalidMsg  = ''
        }
      },
      validateProvince:function(){
        if(this.reference.address.state&&!partiesCommon.asciiChars(this.reference.address.state)){
          this.validateStatus.isProvinceValid= false;
          this.provinceInvalidMsg  = partiesCommon.asciiCharsTip
        }else{
          this.validateStatus.isProvinceValid = true;
          this.provinceInvalidMsg  = ''
        }
      },
      validateFirstName:function(){

        if(this.reference.contact.firstName&&!partiesCommon.asciiChars(this.reference.contact.firstName)){
          this.validateStatus.isFirstNameValid= false;
          this.firstNameInvalidMsg  = partiesCommon.asciiCharsTip
        }else{
          this.validateStatus.isFirstNameValid= true;
          this.firstNameInvalidMsg   = ''
        }
      },
      validateLastName:function(){
        if(this.reference.contact.lastName&&!partiesCommon.asciiChars(this.reference.contact.lastName)){
          this.validateStatus.isLastNameValid= false;
          this.lastNameInvalidMsg  = partiesCommon.asciiCharsTip
        }else{
          this.validateStatus.isLastNameValid= true;
          this.lastNameInvalidMsg   = ''
        }
      },
      validatePhone:function(){
        this.validateCountryPhone();
        this.validateAreaPhone();
        this.validateLocalPhone();
      },
      validateCountryPhone:function(){

        let phone =this.reference.contact.phone;
        let notNull = phone.countryCode||phone.number||phone.areaCode
        if(!this.validateRequire(this.reference.contact.phone.countryCode)&&notNull){
          this.validateStatus.isCountryPhoneValid = false;
          this.countryPhoneValidateMsg = 'Country is required.'
        }else if(this.reference.contact.phone.countryCode&&!partiesCommon.asciiChars(this.reference.contact.phone.countryCode)){
          this.validateStatus.isCountryPhoneValid= false;
          this.countryPhoneValidateMsg = partiesCommon.asciiCharsTip
        }else if (this.reference.contact.phone.countryCode&&(isNaN(this.reference.contact.phone.countryCode) || this.reference.contact.phone.countryCode.indexOf('-') != -1 || this.reference.contact.phone.countryCode.indexOf('.') != -1)) {
          this.validateStatus.isCountryPhoneValid= false;
          this.countryPhoneValidateMsg = 'Only numbers (0-9) are allowed.';
        }else{
          this.validateStatus.isCountryPhoneValid = true;
          this.countryPhoneValidateMsg = ''
        }
      },
      validateAreaPhone:function(){
//        this.validateCountryPhone();
//        this.validateLocalPhone();
        let phone = this.reference.contact.phone;
        if(this.reference.contact.phone.areaCode&&!partiesCommon.asciiChars(this.reference.contact.phone.areaCode)){
          this.validateStatus.isAreaPhoneValid = false;
          this.areaPhoneValidateMsg = partiesCommon.asciiCharsTip
        }else if (this.reference.contact.phone.areaCode&&(isNaN(this.reference.contact.phone.areaCode) || this.reference.contact.phone.areaCode.indexOf('-') != -1 || this.reference.contact.phone.areaCode.indexOf('.') != -1)) {
          this.validateStatus.isAreaPhoneValid= false;
          this.areaPhoneValidateMsg = 'Only numbers (0-9) are allowed.';
        }else{
          this.validateStatus.isAreaPhoneValid  = true;
          this.areaPhoneValidateMsg = ''
        }

      },
      validateLocalPhone:function(){

        let phone =this.reference.contact.phone;
        let notNull = phone.countryCode||phone.number||phone.areaCode;
        if(!this.validateRequire(this.reference.contact.phone.number)&&notNull){
          this.validateStatus.isLocalPhoneValid = false;
          this.localPhoneValidateMsg = 'Local is required.'
        }else if(this.reference.contact.phone.number&&!partiesCommon.asciiChars(this.reference.contact.phone.number)){
          this.validateStatus.isLocalPhoneValid = false;
          this.localPhoneValidateMsg = partiesCommon.asciiCharsTip
        }else if (this.reference.contact.phone.number&&(isNaN(this.reference.contact.phone.number) || this.reference.contact.phone.number.indexOf('-') != -1 || this.reference.contact.phone.number.indexOf('.') != -1)) {
          this.validateStatus.isLocalPhoneValid= false;
          this.localPhoneValidateMsg = 'Only numbers (0-9) are allowed.';
        }else{
          this.validateStatus.isLocalPhoneValid  = true;
          this.localPhoneValidateMsg = ''
        }
      }
    }

  }
</script>
<style scoped>


  a:link {
    color: #00ce9d;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }

  a:visited {
    color: #00ce9d;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }

  a:active {
    color: #5a5a5a;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }

  .reference-edit {
    width: 100%;
    /*border: 1px solid #e6e6e6;*/
  }

  .phone-gap {
    line-height: 36px;
    text-align: center;
  }

  .mandatory-option-Separated {
    border-left: 1px solid #999;
  }

  .region {
    width: 100%;
  }

  .option {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    font-style: oblique;
  }

  .contact-info {
    border: 1px dotted #c4c4c4;
    padding: 15px 10px;
    margin-top: 10px;
  }

  .contact-info::before {
    content: 'Contact Information';
    position: relative;
    top: -26px;
    background-color: white;
    font-size: 12px;
    color: #666;
    margin: 5px 0px;
    font-weight: bold;
  }

  .input-block {
    /*margin-top: 10px;*/
  }

  .error-tip{
    color: #bd081c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    border-top:2px solid rgb(229, 78, 59);
    margin-top: -2px;width: 100%
  }



</style>
