<template>
  <el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">

        <el-col :span="24">
          <h1 >{{$t("CARGO_TITLE")}}</h1>
        </el-col>

        <el-form label-position="top" :model="cargoData" :rules="cargoDescriptionRules" ref="cargoForm">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" class="cargo-nature-div">
            <el-form-item :label="$t('CARGO_NATURE')" class="required">
              <!-- General -->
              <el-col :span="6">
                <el-button @click="selectCargo('GC')" class="cargo-nature-radio"
                           v-bind:class="{ selected: cargoData.cargoNature == 'GC' }">
                  <div class="cargo-nature-selected-style"></div>
                  <div class="cargo-nature-img-style">
                    <img src="../../assets/image/cargo/generalCargo.svg" height="30" width="33"/>
                  </div>
                  <div class="reefer-icon-label">
                    {{$t("GENERAL_CARGO")}}
                  </div>
                </el-button>
              </el-col>
              <!-- Reefer -->
              <el-col :span="6">
                <el-button @click="selectCargo('RF')" class="cargo-nature-radio"
                           v-bind:class="{ selected: cargoData.cargoNature == 'RF' }">
                  <div class="cargo-nature-selected-style"></div>
                  <div class="cargo-nature-img-style">
                    <img src="../../assets/image/cargo/reeferCargo.svg" height="30" width="33"/>
                  </div>
                  <div class="reefer-icon-label">
                    {{$t("REEFER_CARGO")}}
                  </div>
                </el-button>
              </el-col>
              <!-- Dangerous -->
              <el-col :span="6">
                <el-button @click="selectCargo('DG')" class="cargo-nature-radio"
                           v-bind:class="{ selected: cargoData.cargoNature == 'DG' }">
                  <div class="cargo-nature-selected-style"></div>
                  <div class="cargo-nature-img-style">
                    <img src="../../assets/image/cargo/dangerousCargo.svg" height="30" width="33"/>
                  </div>
                  <div class="reefer-icon-label">
                    {{$t("DANGEROUS_CARGO")}}
                  </div>
                </el-button>
              </el-col>
              <!-- Awkward -->
              <el-col :span="6">
                <el-button @click="selectCargo('AK')" class="cargo-nature-radio"
                           v-bind:class="{ selected: cargoData.cargoNature == 'AK' }">
                  <div class="cargo-nature-selected-style"></div>
                  <div class="cargo-nature-img-style">
                    <img src="../../assets/image/cargo/awkwardCargo.svg" height="30" width="33"/>
                  </div>
                  <div class="reefer-icon-label">
                    {{$t("AWKWARD_CARGO")}}
                  </div>
                </el-button>
              </el-col>
            </el-form-item>
          </el-col>

          <!-- Part of Cargo Description -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <el-col :span="24">
              <el-form-item :label="$t('CARGO_DESCRIPTION')" prop="cargoDescription"
                            class="demo-ruleForm required">
                <el-input type="textarea" class="cargo-description-space" resize="none"
                          :rows="3" v-model="cargoData.cargoDescription"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col></el-col>
          <el-col :xs="24" :sm="11" :md="11" :lg="11">
            <el-col :span="24">
              <el-form-item :label="$t('CARGO_CAS_NO')" prop="cargoCASNo">
                <el-input  v-model="cargoData.cargoCASNo"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </el-col>
    </el-row>

    <!--reefer info-->
    <el-form label-position="top" :model="cargoData.reeferCargoSpecs" :rules="reeferRules"
             ref="reeferForm">
      <transition name="el-zoom-in-top">
        <el-row v-show="cargoData.cargoNature == 'RF'">
          <el-row class="reefer-info-row">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-col :span="24">
                <h2>{{$t('REEFER_INFO_TITLE')}}</h2>
              </el-col>

              <el-col :span="24">
                <el-col class="box-card reefer-info-card">

                  <el-col :span="24" style="margin: 0px">
                    <el-col :span="20">
                      
                      <!--Temperature setting -->
                      <el-col :xs="10" :sm="8" :md="8" :lg="10">
                        <el-form-item prop="temperature.magnitude" :label="$t('CARGO_TEMPERATURE')" class="required">
         
                           <!--Temperature inputting -->
                          <el-col :xs="10" :sm="11" :md="10" :lg="12">
                            <el-input v-model="cargoData.reeferCargoSpecs.temperature.magnitude"
                            class="reefer-input-number demo-ruleForm">
                            </el-input>
                          </el-col>
                          
                          <!--C or F-->
                          <el-col :xs="14" :sm="13" :md="14" :lg="12">
                            <el-radio-group v-model="cargoData.reeferCargoSpecs.temperature.unit">
                              <el-radio-button label="C">°C</el-radio-button>
                              <el-radio-button label="F">°F</el-radio-button>
                            </el-radio-group>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      
                        <!--slider setting-->
                      <el-col :xs="14" :sm="16" :md="16" :lg="14" v-if="cargoData.cargoNature == 'RF'">
                        <el-col :span="24">
                          <vue-slider class="reefer-slider-bar"
                                      v-model="cargoData.reeferCargoSpecs.temperature.magnitude"
                                      :show="true"
                                      :interval="0.1"
                                      :realTime="true"
                                      :bgStyle="sliderBar.bgStyle"
                                      :min="sliderBar.min"
                                      :max="sliderBar.max"
                                      :processStyle="sliderBar.processStyle"
                                      :tooltip="sliderBar.tooltip">
                          </vue-slider>
                          <span style="float: left">{{sliderBar.min}}</span>
                          <span style="float: right">{{sliderBar.max}}</span>
                        </el-col>
                      </el-col>

                    </el-col>
                  </el-col>
                </el-col>

              </el-col>

                <el-col :span="24">

                  <el-col class="reefer-info-card">

                    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="cargo-card">

                      <el-col :span="3">
                        <el-form-item :label="$t('VENTILATION')" prop="ventilation.magnitude" :class="{required : !venFlag}">
                          <el-input v-model="cargoData.reeferCargoSpecs.ventilation.magnitude"
                                    class="reefer-input-number" :disabled="venFlag" />
                        </el-form-item>
                      </el-col>

                      <el-col :span="6" :offset="1">
                        <el-form-item :label="$t('CARGO_UNIT')" prop="ventilation.unit" :class="{required : !venFlag}">
                          <el-select v-model="cargoData.reeferCargoSpecs.ventilation.unit" placeholder="Select" :disabled="venFlag">
                            <el-option
                              v-for="item in ventilation_units"
                              :key="item.code"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12" :offset="2">
                        <el-form-item prop="gensetType" :label="$t('GENERATOR_SET')" class="required">
                          <el-select v-model="cargoData.reeferCargoSpecs.gensetType" placeholder="Select"
                                    class="demo-ruleForm">
                            <el-option
                              v-for="item in generators"
                              :key="item.code"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>
                </el-col>
            </el-col>

          </el-row>
        </el-row>
      </transition>
    </el-form>

    <el-form label-position="top" :model="cargoData.awkwardCargoSpecs" :rules="awkwardRules"
             ref="awkwardForm">
      <transition name="el-zoom-in-top">
        <el-row v-show="cargoData.cargoNature == 'AK'">
          <el-row class="awkward-info-row">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              
              <el-col :span="24">
                <h2>{{$t('AWKWARD_INFO_TITLE')}}</h2>
              </el-col>

              <el-col :span="24">

                  <el-col class="awkward-info-card">

                    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="cargo-card">

                      <el-col :span="4">
                        <el-form-item :label="$t('AWKWARD_UNIT')" prop="unit" class="required">
                          <el-select v-model="cargoData.awkwardCargoSpecs.unit" placeholder="Select" class="demo-ruleForm">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.label">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="5" :offset="2">
                        <el-form-item :label="$t('AWKWARD_LENGTH')" prop='length'  class="required">
                          <el-input v-model="cargoData.awkwardCargoSpecs.length"
                                    class="awkward-input-number demo-ruleForm"/>
                        </el-form-item>
                      </el-col>

                      <el-col :span="5" :offset="1">
                        <el-form-item :label="$t('AWKWARD_WIDTH')" prop='width'  class="required">
                          <el-input v-model="cargoData.awkwardCargoSpecs.width"
                                    class="awkward-input-number demo-ruleForm"/>
                        </el-form-item>
                      </el-col>

                      <el-col :span="5" :offset="1">
                        <el-form-item :label="$t('AWKWARD_HEIGHT')" prop='height' class="required">
                          <el-input v-model="cargoData.awkwardCargoSpecs.height"
                                    class="awkward-input-number demo-ruleForm"/>
                        </el-form-item>
                      </el-col>
                      
                    </el-col>
                  </el-col>
                </el-col>


            </el-col>
          </el-row>
        </el-row>

      </transition>

    </el-form>
    

    <el-form label-position="top" :model="cargoData.dangerCargoSpecs" ref="dangerForm" :rules="dangerRules">
      <transition name="el-zoom-in-top">
        <el-row v-show="cargoData.cargoNature == 'DG'" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-col :span="24">
                <h2>{{$t('DANGER_INFO_TITLE')}}</h2>
              </el-col>

                  <el-col :lg="12" :md="12" :xs="24" :sm="12" >
                    <el-form-item :label="$t('UNDG_NUMBER')" prop="cargoUNDG_Number" class="required" >
                         <type-ahead v-model="cargoData.dangerCargoSpecs.cargoUNDG_Number"
                         :src="UNDGNumberUrl" 
                         queryName="cargoUNDGNumber"
                         :callback="UndgCallback"
                         :validate="validateUNnumber1"
                         :value.sync="UNDG_NUMBER" :model.sync="undgnumberCompleteSelected"
                         :recommend-callback = "undgRecommend"
                         ></type-ahead>

                    </el-form-item>
                     
                  </el-col>

                   <el-col :lg="12" :md="12" :xs="24" :sm="12" >
                    <el-form-item :label="$t('PROPER_SHIPPING_NAME')" prop="properShippingName">
                        <el-input :disabled='true' v-model="cargoData.dangerCargoSpecs.properShippingName"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :lg="12" :md="12" :xs="24" :sm="12" >
                    <el-form-item :label="$t('IMO_CLASS')" prop="imoClass">
                        <el-input :disabled='true' v-model="cargoData.dangerCargoSpecs.imoClass"></el-input>
                    </el-form-item>
                  </el-col> 

                  <el-col :lg="12" :md="12" :xs="24" :sm="12" >
                    <el-form-item :label="$t('PACKING_GROUP')" prop="packingGroup">
                        <el-input :disabled='true' v-model="cargoData.dangerCargoSpecs.packingGroup"></el-input>
                    </el-form-item>
                  </el-col>                  

              <el-button class="el-icon-arrow-down"  @click='showMore=false' v-show="showMore&&!originCityIsChina" style="border: 0px; float:right"> more</el-button>

              <el-col :xs="24" :sm="12" :md="12" :lg="12" v-show="!showMore||originCityIsChina">
                    <el-col :span="14">
                        <el-form-item :label="$t('INNER_PACKAGE')" prop="innerPackage.magnitude" :rules="[{trigger:'blur'},
                        {validator:this.validateInner}]" >
                          <el-input  v-model="cargoData.dangerCargoSpecs.innerPackage.magnitude" :maxlength.number="9"
                                    class="reefer-input-number"  />
                        </el-form-item>
                     </el-col>

                      <el-col :span="10" >
                        <el-form-item :label="$t('CARGO_UNIT')" prop="innerPackage.unit" >
                              <type-ahead-unit v-model="cargoData.dangerCargoSpecs.innerPackage.unit"
                              :src="packageUnitUrl" 
                              queryName="parameter"
                              :callback="unitCallback"
                              :validate="validateUNnumber1"
                              :value.sync="innerPackageUnit" :model.sync="innerPackageUnitCompleteSelected"
                              :recommend-callback = "undgRecommend"
                               ></type-ahead-unit>
                        </el-form-item>
                      </el-col>
               </el-col>

              <el-col :xs="24" :sm="12" :md="12" :lg="12" v-show="!showMore||originCityIsChina">
                    <el-col :span="14">
                        <el-form-item :label="$t('OUTER_PACKAGE')" prop="outerPackage.magnitude" 
                        :class="{required :originCityIsChina}" 
                          :rules="[{required:originCityIsChina, message:'Outer Package is required', trigger:'blur'},
                        {validator:this.validateOut}]">
                          <el-input v-model="cargoData.dangerCargoSpecs.outerPackage.magnitude" :maxlength.number="9"
                                    class="reefer-input-number"  />
                        </el-form-item>
                     </el-col>

                      <el-col :span="10" >
                        <el-form-item :label="$t('CARGO_UNIT')" prop="outerPackage.unit" :class="{required :originCityIsChina}">
                              <type-ahead-unit v-model="cargoData.dangerCargoSpecs.outerPackage.unit"
                              :src="packageUnitUrl" 
                              queryName="parameter"
                              :callback="unitCallback"
                              :validate="validateUNnumber1"
                              :value.sync="outerPackageUnit" :model.sync="outerPackageUnitCompleteSelected"
                              :recommend-callback = "undgRecommend"
                              ></type-ahead-unit>
                        </el-form-item>
                      </el-col>
               </el-col>
              
              <el-col :xs="24" :sm="12" :md="12" :lg="12" v-show="!showMore||originCityIsChina">
                    <el-col :span="14">
                        <el-form-item :label="$t('NET_WEIGHT')" prop="netWeight.magnitude" :class="{required :originCityIsChina}">
                          <el-input v-model="cargoData.dangerCargoSpecs.netWeight.magnitude"
                                    class="reefer-input-number"  />
                        </el-form-item>
                     </el-col>

                      <el-col :span="10" >
                        <el-form-item :label="$t('CARGO_UNIT')" prop="netWeight.unit" :class="{required :originCityIsChina}">
                          <el-select v-model="cargoData.dangerCargoSpecs.netWeight.unit" clearable placeholder="Select">
                            <el-option
                              v-for="item in weightUnitOptions"
                              :key="item.code"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
               </el-col>

               <el-col :xs="24" :sm="12" :md="12" :lg="12" v-show="!showMore||originCityIsChina">
                    <el-col :span="14">
                        <el-form-item :label="$t('GROSS_WEIGHT')" prop="grossWeight.magnitude" :class="{required :originCityIsChina}">
                          <el-input v-model="cargoData.dangerCargoSpecs.grossWeight.magnitude"
                                    class="reefer-input-number"  />
                        </el-form-item>
                     </el-col>

                      <el-col :span="10" >
                        <el-form-item :label="$t('CARGO_UNIT')" prop="grossWeight.unit" :class="{required :originCityIsChina}">
                          <el-select v-model="cargoData.dangerCargoSpecs.grossWeight.unit" clearable placeholder="Select">
                            <el-option
                              v-for="item in weightUnitOptions"
                              :key="item.code"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
               </el-col>

               <el-col :xs="24" :sm="12" :md="12" :lg="12" v-show="!showMore||originCityIsChina">
                    <el-col :span="14">
                        <el-form-item :label="$t('FLASH_POINT')" prop="flashPoint.magnitude">
                          <el-input v-model="cargoData.dangerCargoSpecs.flashPoint.magnitude"
                                    class="reefer-input-number"  />
                        </el-form-item>
                     </el-col>

                      <el-col :span="10" >
                        <el-form-item :label="$t('CARGO_UNIT')" prop="flashPoint.unit">
                          <el-select v-model="cargoData.dangerCargoSpecs.flashPoint.unit" clearable placeholder="Select">
                            <el-option
                              v-for="item in FlashOptions"
                              :key="item.code"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
               </el-col>

              <el-col :lg="7" :md="7" :xs="14" :sm="7"  v-show="!showMore||originCityIsChina">
                <el-form-item :label="$t('TECHNICAL_NAME')" prop="technicalName">
                     <el-input v-model="cargoData.dangerCargoSpecs.technicalName" :maxlength.number="180"></el-input>
                </el-form-item> 
             </el-col>
             <el-col :lg="5" :md="5" :xs="10" :sm="5"  v-show="!showMore||originCityIsChina">
                <el-form-item :label="$t('BLANK')" prop="marinePollutant">
                     <el-checkbox v-model="cargoData.dangerCargoSpecs.marinePollutant" label="marinePollutant"></el-checkbox>
                </el-form-item> 
             </el-col>

              <el-col :lg="12" :md="12" :xs="24" :sm="12"  v-show="!showMore||originCityIsChina">
                <el-form-item :label="$t('OB_CONTACT_NAME')" prop="OBContactName" :class="{required:originCityIsChina}"                    
                
                >
                     <el-input v-model="cargoData.dangerCargoSpecs.OBContactName" :maxlength.number="20"></el-input>
                </el-form-item> 
             </el-col>
              <el-col :lg="12" :md="12" :xs="24" :sm="12" v-show="!showMore||originCityIsChina">
                <el-form-item :label="$t('OB_CONTACT_PHONE_NUMBER')" prop="OBContactPhoneNumber" :class="{required:originCityIsChina}"> 
               
                     <el-input v-model="cargoData.dangerCargoSpecs.OBContactPhoneNumber" :maxlength.number="25"></el-input>
                </el-form-item> 
             </el-col>   

              <el-col :lg="12" :md="12" :xs="24" :sm="12" v-show="!showMore||originCityIsChina">
                <el-form-item :label="$t('IB_CONTACT_NAME')" prop="IBContactName" :class="{required:originCityIsChina}">
               
                     <el-input v-model="cargoData.dangerCargoSpecs.IBContactName" :maxlength.number="20"></el-input>
                </el-form-item> 
             </el-col>
              <el-col :lg="12" :md="12" :xs="24" :sm="12" v-show="!showMore||originCityIsChina">
                <el-form-item :label="$t('IB_CONTACT_PHONE_NUMBER')" prop="IBContactPhoneNumber" :class="{required:originCityIsChina}"
                >
                     <el-input v-model="cargoData.dangerCargoSpecs.IBContactPhoneNumber" :maxlength.number="25"></el-input>
                </el-form-item> 
             </el-col>           

            <el-col></el-col>
              <el-button class="el-icon-arrow-up"  @click='showMore=true' v-show="!showMore&&!originCityIsChina" style="border: 0px ; float:right"> less</el-button>

            </el-col>
        </el-row>

      </transition>
    </el-form>
  

  </el-row>
</template>

<script>
  import _ from 'lodash'
  import {mapGetters, mapActions} from "vuex"
  import cargoValidator from '../../valicator/cargo.contanst'
  import cargoMixin from "../mixins/cargo.mixin"
  import TypeAhead from '../common/TypeAheadForCargo'
  import TypeAheadUnit from '../common/TypeAheadForUnit'
  import vueSlider from 'vue-slider-component'

  export default {
   
    mixins: [cargoMixin],
    components: { TypeAhead,vueSlider,TypeAheadUnit},
    mounted() {
      var self = this;
      self.initData()
    },

    //data
    data() {
      return {
        venFlag: false, 
        flag: true,
        showMore:true,
        isReatoreData: true,
        cargoNature: '',
        originCityIsChina:false,      
        UNDGNumberUrl:"/api/cargo/findUNDGNumber",
        packageUnitUrl:"/api/cargo/findOuterPackageUnit",
        UNDG_NUMBER:"",
        innerPackageUnit:'',  
        outerPackageUnit:'',
        innerPackageUnitCompleteSelected:{},
        outerPackageUnitCompleteSelected:{},
        undgnumberCompleteSelected:{},
        sliderBar: {
          tooltip: 'always',
          min: -35,
          max: 30,
          bgStyle: {
            "backgroundImage": "-webkit-linear-gradient(left, #3498db, #f05b72)",
          },
          processStyle: {
            "backgroundColor": "#fff",
            "opacity": "0"
          }
        },
        temperatureControl: {
          C: {
            max: 30,
            min: -35
          },
          F: {
            max: 86,
            min: -31
          },
        },
        max: 2,
        temperature_units: [{code: "C", name: "Celsius"}, {code: "F", name: "Fahrenheit"}],

        cargoDescriptionRules: {
          cargoDescription: [
            {min: 0, max: 60, message: cargoValidator.CARGO_DESCRIPTION_SIEZE_LIMIT, trigger: 'blur'},
            {validator: this.validateData, trigger: 'blur'},
            {required: true, message: cargoValidator.CARGO_DESCRIPTION_IS_REQUIRE, trigger: 'blur'},

          ]
        },

        reeferRules: {
          gensetType: [
            {required: true, message: cargoValidator.GENERATOR_SET_IS_REQUIRE, trigger: 'change'}
          ],
          "temperature.magnitude": [
            {validator: this.validateTemperture, trigger: 'blur'}
          ],
          "ventilation.magnitude": [
            {required: true, message: cargoValidator.VENTILATION_IS_REQUIRE, trigger: 'change'},
            {min: 0, max: 3, message: cargoValidator.ventilation_SIZE_LIMIT, trigger: 'blur'},
            {required: true, validator: this.validateNumberLimit, trigger: 'blur'},
          ],
          "ventilation.unit": [
            {required: true, message: cargoValidator.VENTILATION_UNIT_IS_REQUIRE, trigger: 'change'}
          ],
        },
        dangerRules:{
          "netWeight.magnitude":[{required:this.originCityIsChina, message:'netWeight is required', trigger:'blur'},
                              {validator:this.validateNetWeight,trigger:'blur'}],
          "netWeight.unit":[{required:this.originCityIsChina, message:'netWeightUnit is required', trigger:'blur'},  
                              {validator:this.validateNetWeightunit,trigger:'blur'}],
          "grossWeight.magnitude":[{required:this.originCityIsChina, message:'grossWeight is required', trigger:'blur'},
                        {validator:this.validateGrossWeight,trigger:'blur'}],
          "grossWeight.unit":[{required:this.originCityIsChina, message:'grossWeightUnit is required', trigger:'blur'},
            {validator:this.validateGrossWeightunit,trigger:'blur'}],
          "outerPackage.unit":[{required:this.originCityIsChina, message:'outerPackageUnit is required', trigger:'blur'},
            {validator:this.validateOuterPackageunit,trigger:'blur'}],
          "innerPackage.unit":[{trigger:'blur'},{validator:this.validateInnerPackageunit,trigger:'blur'}],
          "flashPoint.magnitude": [{validator:this.validateFlashPoint,trigger:'blur'}],
          "flashPoint.unit": [{validator:this.validateFlashPointUnit,trigger:'blur'}],
          "cargoUNDG_Number":[{validator : this.validateUNnumber}],
          "OBContactName":[{required:this.originCityIsChina, message:'OBContactName is required', trigger:'blur'},{validator : this.validateOBContactName,trigger:'blur'}],
          "OBContactPhoneNumber":[{required:this.originCityIsChina, message:'OBContactPhoneNumber is required', trigger:'blur'},{validator : this.validateOBContactPhoneNumber,trigger:'blur'}],
          "IBContactName":[{required:this.originCityIsChina, message:'IBContactName is required', trigger:'blur'},{validator : this.validateIBContactName,trigger:'blur'}],
          "IBContactPhoneNumber":[{required:this.originCityIsChina, message:'IBContactPhoneNumber is required', trigger:'blur'},{validator : this.validateIBContactPhoneNumber,trigger:'blur'}],
          "technicalName":[{validator : this.validateTechnicalName,tigger:'blur'}]
        },
        //rules about awkward
        awkwardRules: {
          unit:[
            {required: true, message: cargoValidator.AWKWARD_UNIT_IS_REQUIRE, trigger: 'blur'}
          ],
          length:[
            {required: true, message: cargoValidator.AWKWARD_LENGTH_IS_REQUIRE, trigger: 'blur'},
            {validator: this.validateAwkwardLength, trigger: 'blur'}
          ],
          width:[
            {validator: this.validateAwkwardWidth, trigger: 'blur'}
          ],
          height:[
            {validator: this.validateAwkwardHeight, trigger: 'blur'}
          ]
        },
        weightUnitOptions: [
          {
            code: 'KGS',
            name: "Kilograms"
          },
          {
            code: 'LBS',
            name: "Pounds"
          }, {
            code: 'TON',
            name: "Metric Tons"
          }
        ],
        FlashOptions:[
          {
            code:'Celsius',
            name:'Celsius'
          },
          {
            code:'Fahrenheit',
            name:'Fahrenheit'
          },
        ],

        isSubmit: false,
        validEmergencyContact: true,

        options: [{
          value: '选项1',
          label: 'Meter'
        }, {
          value: '选项2',
          label: 'Feet'
        }],
      }
    },

    watch: {
      originCityIsChina:function(val){
        var self=this;
         var progress = self.cargoProgressCounter();
          self.setCargoProgress({
            cargoProgress: {
              totalMandatoryFields: progress.totalMandatoryFields,
              hasCompletedFields: progress.hasCompletedFields
            }
          });
      },

      undgnumberCompleteSelected: {
        handler:function(val, oldVal){
          if(val){
            this.cargoData.dangerCargoSpecs.cargoUNDG_Number=val.undgNumber;
            this.cargoData.dangerCargoSpecs.properShippingName=val.properShippingName;
            this.cargoData.dangerCargoSpecs.imoClass=val.imoClass;
            this.cargoData.dangerCargoSpecs.packingGroup=val.packingGroup;
            
          }else{
            return;
          }
        },
        deep: true
      },
      innerPackageUnitCompleteSelected:{
          handler:function(val){
          if(val){
          this.cargoData.dangerCargoSpecs.innerPackage.unit = val.name;
        
          }else{
            return;
          }
        },
        deep: true   
      },
      outerPackageUnitCompleteSelected:{
         handler:function(val){
          if(val){
          this.cargoData.dangerCargoSpecs.outerPackage.unit = val.name;       
          }else{
            return;
          }
        },
        deep: true        
      },


      getCargoRecovery: function (val) {
        var self = this;
        if (val) {
          Object.assign(self.cargoData, self.getRestoreBR.cargoes);
          self.cargoNature = self.cargoData.cargoNature;
          self.setCargoType({cargoType: self.cargoData.cargoNature});
          self.isReatoreData = true;
          self.setCargoRecovery(false);
        }
      },

      cargoData: {
        handler(curVal, oldVal)
        {
          var self = this;

          //listening Reefer data
          if(self.cargoData.cargoNature === "RF"){
            if (self.cargoData.reeferCargoSpecs.temperature.magnitude == '' || isNaN(self.cargoData.reeferCargoSpecs.temperature.magnitude))
            {
              self.sliderBar.tooltip = 'false';
            } else { 
              self.sliderBar.tooltip = 'always';
            }

            
            if(curVal.reeferCargoSpecs.temperature.unit == 'F'){
              self.sliderBar.min = -31;
              self.sliderBar.max = 86;
              this.venFlag = curVal.reeferCargoSpecs.temperature.magnitude<=24 ? true:false;

              if(curVal.reeferCargoSpecs.temperature.magnitude<=24){
                this.cargoData.reeferCargoSpecs.ventilation.magnitude = "";
                this.cargoData.reeferCargoSpecs.ventilation.unit = "";
              }
            }
            if(curVal.reeferCargoSpecs.temperature.unit == 'C'){
              self.sliderBar.min = -35;
              self.sliderBar.max = 30;
              this.venFlag = curVal.reeferCargoSpecs.temperature.magnitude<=-4.4 ? true:false;

              if(curVal.reeferCargoSpecs.temperature.magnitude <= -4.4){
                this.cargoData.reeferCargoSpecs.ventilation.magnitude = "";
                this.cargoData.reeferCargoSpecs.ventilation.unit = "";
            }
            }

            this.reeferRules["ventilation.magnitude"][0].required = !this.venFlag;
            this.reeferRules["ventilation.magnitude"][2].required = !this.venFlag;
            this.reeferRules["ventilation.unit"][0].required = !this.venFlag;
          }

          var progress = self.cargoProgressCounter();
          self.setCargoProgress({
            cargoProgress: {
              totalMandatoryFields: progress.totalMandatoryFields,
              hasCompletedFields: progress.hasCompletedFields
            }
          });
        },
        deep: true
      },

      submitStatus: function (val) {
       // debugger
        var self = this;
        if (val) {
         var progress = self.cargoProgressCounter();
          self.setCargoProgress({
            cargoProgress: {
              totalMandatoryFields: progress.totalMandatoryFields,
              hasCompletedFields: progress.hasCompletedFields
            }
          });
          this.submitForm(function (valid) {
            self.setCargoValidateStatus(valid);
            self.setValidateCount(5);
          });

        }
      },
      OriginCityInput:function(val){
      
        var self=this;
        if(val){
          var VAL=val.toUpperCase();
          var Rule = new RegExp("CHINA");
          var judgeChina = Rule.test(VAL);
          if(judgeChina){
            self.originCityIsChina=true;
          }else {
            self.originCityIsChina=false;
          }
          self.setIsFromChinaStatus(self.originCityIsChina);
        }
      }
      ,
      "cargoData.cargoNature": function (onlineSelectedCargoNature, oldCargoNature) {
        if (!this.selectedRoute) {
          return;
        }
        var self = this;
        var selectedRouteDefaultCargoNature = this.selectedRoute.defaultCargoNature;
        if (self.isCargoNatureAndScheduleConflict(selectedRouteDefaultCargoNature, onlineSelectedCargoNature)) {
          this.$confirm('Cargo Nature and the selected schedule are contradictory, system will find Sailing Schedule again.', 'Booking Request Warning', {
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(function () {
            self.researchSailingSchedule(true);
            var routeDiv = document.getElementById("routing")
            document.body.scrollTop = routeDiv.offsetTop


          }).catch(function () {
            self.cargoData.cargoNature = oldCargoNature;
            self.setCargoType({cargoType: oldCargoNature});
          })
        }
      }
    },


    //methods
    methods: {

      // 
    validateUNnumber1(rule,value){
      
    },
    validateUnit(rule,value){

    },

 
    undgRecommend(){
      var self =this;
      return function(value,callback){
          self.$http.get('/api/cargo/findUNDGNumber?parameter=',{showProgressBar:false}).then(function(res){
              callback(res.data);
              }).catch(function(err){
                callback([]);
              })
          }
     },
      // 

      UndgCallback(data){
        return data.result;
      },
      unitCallback(data){
        return data.result;
      },
      submitForm(callback){
        var self = this;
        self.$refs.cargoForm.validate(function (valid) 
        {
	    if (self.cargoData.cargoNature == 'RF') {
            self.$refs['reeferForm'].validate(function (validRF) {
                callback(valid && validRF && self.validEmergencyContact);
              });
            }
            else if (self.cargoData.cargoNature == 'AK') {
            self.$refs['awkwardForm'].validate(function (validAK) {
                callback(valid && validAK);
              }
            );
          }  
          else if( self.cargoData.cargoNature== 'DG'){
            self.$refs['dangerForm'].validate(function (validDG) {
            callback(valid&&validDG);
          } );
        } else {          
            callback(valid);
          }
        });
        
        },
      //Cargo
      ...
        mapActions(['setCargoType', 'setIsFromChinaStatus','setCargoProgress', 'setCargoValidateStatus', 'setValidateCount', "researchSailingSchedule", "setCargoRecovery"]),
      selectCargo: function (cargoNature) {
        var self = this;
        if (self.cargoData.cargoNature != cargoNature && (cargoNature == 'RF' || self.cargoData.cargoNature == 'RF')) {
          console.log(self.containerStatus)
          if (cargoNature == 'RF') {
            for (var key in self.containerStatus) {
              console.log('Key:' + key);
              var index = _.findIndex(self.dropDownListData.containerTypes[1], function (containerTypes) {
                return containerTypes.name == key;
              });
              if (index == -1) {
                self.cargoNature = cargoNature;
                self.deleteBox();
                return;
              }
            }
          }
          if (cargoNature == 'GC' || cargoNature == 'DG') {
            for (var key in self.containerStatus) {
              console.log('Key:' + key);
              var index = _.findIndex(self.dropDownListData.containerTypes[0], function (containerTypes) {
                return containerTypes.name == key;
              });
              if (index == -1) {
                console.log(key);
                self.cargoNature = cargoNature;
                self.deleteBox();
                return;
              }
            }
          }
        }
        self.cargoData.cargoNature = cargoNature;
        self.setCargoType({cargoType: cargoNature});
      },
      initData: function () {
        var self = this;
        if (self.cargoData.cargoNature == "") {
          self.cargoData.cargoNature = self.cargoType;
        }
        self.cargoData.inboundTrafficModeName = "Full Container Load";
        self.cargoData.outboundTrafficModeName = "Full Container Load";
        self.cargoData.trafficMode = {
          inbound: "FCL", outbound: "FCL"
        };
        console.log(self.cargoData);

      }
      ,


      cargoProgressCounter: function () {
        
        var self = this;
        var cargoData = self.cargoData;
        var cargoProgress = {
          totalMandatoryFields: 2,
          hasCompletedFields: 1,
        };

        cargoProgress.hasCompletedFields += cargoData.cargoDescription && self.validateCargoDescription('cargoDescription') ? 1 : 0;
        if (cargoData.cargoNature == "GC") {
          return cargoProgress;
        }
        else if(cargoData.cargoNature=="RF"){
          if(this.venFlag)
            cargoProgress.totalMandatoryFields = 4;
          if(!this.venFlag){
            cargoProgress.totalMandatoryFields = 6;
            cargoProgress.hasCompletedFields += cargoData.reeferCargoSpecs.ventilation.magnitude && self.validateReeferField('ventilation.magnitude') ? 1 : 0;
            cargoProgress.hasCompletedFields += this.cargoData.reeferCargoSpecs.ventilation.unit && self.validateReeferField('ventilation.unit') ? 1 : 0;
          }

          cargoProgress.hasCompletedFields += cargoData.reeferCargoSpecs.gensetType && self.validateReeferField('gensetType') ? 1 : 0;
          cargoProgress.hasCompletedFields += cargoData.reeferCargoSpecs.temperature.magnitude && self.validateReeferField('temperature.magnitude') ? 1 : 0;
          self.isReatoreData = false;
          return cargoProgress;
      }
      else if(cargoData.cargoNature=='DG'&&!this.originCityIsChina){
       
          cargoProgress.totalMandatoryFields=3;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.cargoUNDG_Number&&self.validateDangerField('cargoUNDG_Number')?1:0;
          if((cargoData.dangerCargoSpecs.outerPackage.magnitude!=''&&cargoData.dangerCargoSpecs.outerPackage.unit=='')||(cargoData.dangerCargoSpecs.outerPackage.magnitude==''&&cargoData.dangerCargoSpecs.outerPackage.unit!='')){
              cargoProgress.totalMandatoryFields+=1;
              cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.outerPackage.unit&&self.validateDangerField('outerPackage.unit')&&cargoData.dangerCargoSpecs.outerPackage.magnitude&&self.validateDangerField('outerPackage.magnitude')?1:0;
          }
          if((cargoData.dangerCargoSpecs.innerPackage.magnitude!=undefined&&cargoData.dangerCargoSpecs.innerPackage.unit==undefined)||(cargoData.dangerCargoSpecs.innerPackage.magnitude==undefined&&cargoData.dangerCargoSpecs.innerPackage.unit!=undefined)){
              cargoProgress.totalMandatoryFields+=1;
              cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.innerPackage.unit&&self.validateDangerField('innerPackage.unit')&&cargoData.dangerCargoSpecs.innerPackage.magnitude&&self.validateDangerField('innerPackage.magnitude')?1:0;
          }

          if((cargoData.dangerCargoSpecs.netWeight.magnitude!=''&&cargoData.dangerCargoSpecs.netWeight.unit=='')||(cargoData.dangerCargoSpecs.netWeight.magnitude==''&&cargoData.dangerCargoSpecs.netWeight.unit!='')){
              cargoProgress.totalMandatoryFields+=1;
              cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.netWeight.unit&&self.validateDangerField('netWeight.unit')&&cargoData.dangerCargoSpecs.netWeight.magnitude&&self.validateDangerField('netWeight.magnitude')?1:0;
          }
          if((cargoData.dangerCargoSpecs.grossWeight.magnitude!=''&&cargoData.dangerCargoSpecs.grossWeight.unit=='')||(cargoData.dangerCargoSpecs.grossWeight.magnitude==''&&cargoData.dangerCargoSpecs.grossWeight.unit!='')){
              cargoProgress.totalMandatoryFields+=1;
              cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.grossWeight.unit&&self.validateDangerField('grossWeight.unit')&&cargoData.dangerCargoSpecs.grossWeight.magnitude&&self.validateDangerField('grossWeight.magnitude')?1:0;
          }
          if((cargoData.dangerCargoSpecs.flashPoint.magnitude!=''&&cargoData.dangerCargoSpecs.flashPoint.unit=='')||(cargoData.dangerCargoSpecs.flashPoint.magnitude==''&&cargoData.dangerCargoSpecs.flashPoint.unit!='')){
              cargoProgress.totalMandatoryFields+=1;
              cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.flashPoint.unit&&self.validateDangerField('flashPoint.unit')&&cargoData.dangerCargoSpecs.flashPoint.magnitude&&self.validateDangerField('flashPoint.magnitude')?1:0;
          }
          if(cargoData.dangerCargoSpecs.technicalName!=''&& !self.validateDangerField('technicalName')){
              cargoProgress.totalMandatoryFields+=1;
              cargoProgress.hasCompletedFields +=cargoData.dangerCargoSpecs.technicalName&&self.validateDangerField('technicalName')?1:0;
          }          
          return cargoProgress;
      }else if(cargoData.cargoNature=='DG'&&this.originCityIsChina){
          cargoProgress.totalMandatoryFields=13;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.cargoUNDG_Number&&self.validateDangerField('cargoUNDG_Number')?1:0;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.outerPackage.magnitude&&self.validateDangerField('outerPackage.magnitude')?1:0;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.outerPackage.unit&&self.validateDangerField('outerPackage.unit')?1:0;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.netWeight.magnitude&&self.validateDangerField('netWeight.magnitude')?1:0;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.grossWeight.magnitude&&self.validateDangerField('grossWeight.magnitude')?1:0;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.netWeight.unit&&self.validateDangerField('netWeight.unit')?1:0;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.grossWeight.unit&&self.validateDangerField('grossWeight.unit')?1:0;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.OBContactName&&self.validateDangerField('OBContactName')?1:0;
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.OBContactPhoneNumber&&self.validateDangerField('OBContactPhoneNumber')?1:0; 
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.IBContactName&&self.validateDangerField('IBContactName')?1:0;          
          cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.IBContactPhoneNumber&&self.validateDangerField('IBContactPhoneNumber')?1:0;  
       
          if((cargoData.dangerCargoSpecs.innerPackage.magnitude!=undefined&&cargoData.dangerCargoSpecs.innerPackage.unit==undefined)||(cargoData.dangerCargoSpecs.innerPackage.magnitude==undefined&&cargoData.dangerCargoSpecs.innerPackage.unit!=undefined)){
              cargoProgress.totalMandatoryFields+=1;
              cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.innerPackage.unit&&self.validateDangerField('innerPackage.unit')&&cargoData.dangerCargoSpecs.innerPackage.magnitude&&self.validateDangerField('innerPackage.magnitude')?1:0;
          }
          if((cargoData.dangerCargoSpecs.flashPoint.magnitude!=''&&cargoData.dangerCargoSpecs.flashPoint.unit=='')||(cargoData.dangerCargoSpecs.flashPoint.magnitude==''&&cargoData.dangerCargoSpecs.flashPoint.unit!='')){
              cargoProgress.totalMandatoryFields+=1;
              cargoProgress.hasCompletedFields += cargoData.dangerCargoSpecs.flashPoint.unit&&self.validateDangerField('flashPoint.unit')&&cargoData.dangerCargoSpecs.flashPoint.magnitude&&self.validateDangerField('flashPoint.magnitude')?1:0;
          }
       if(cargoData.dangerCargoSpecs.technicalName!=''&& !self.validateDangerField('technicalName')){
              cargoProgress.totalMandatoryFields+=1;
              cargoProgress.hasCompletedFields +=cargoData.dangerCargoSpecs.technicalName&&self.validateDangerField('technicalName')?1:0;
          }          
          return cargoProgress;                           
      }else if(cargoData.cargoNature == "AK"){
          cargoProgress.totalMandatoryFields = 6;
          cargoProgress.hasCompletedFields += cargoData.awkwardCargoSpecs.unit && self.validateAwkwardField('unit') ? 1 : 0;
          cargoProgress.hasCompletedFields += cargoData.awkwardCargoSpecs.length && self.validateAwkwardField('length') ? 1 : 0;
          cargoProgress.hasCompletedFields += cargoData.awkwardCargoSpecs.width && self.validateAwkwardField('width') ? 1 : 0;
          cargoProgress.hasCompletedFields += cargoData.awkwardCargoSpecs.height && self.validateAwkwardField('height') ? 1 : 0;
          self.isReatoreData = false;
          return cargoProgress;
      }
    },
      validateAwkwardField: function (field) {
        if (this.isReatoreData) {
          return true;
        } else {
          var error;
          this.$refs.awkwardForm.validateField(field, callback => {
            error = callback;
          });
          if (error)
            return false;
          return true;
        }
      },


     
      
        validateDangerField:function(field){
        var error;
        this.$refs.dangerForm.validateField(field, callback => {
          error = callback;
        });
        if (error)
          return false;
        return true;
      },
      validateReeferField: function (field) {
        if (this.isReatoreData) {
          return true;
        } else {
          var error;
          this.$refs.reeferForm.validateField(field, callback => {
            error = callback;
          });
          if (error)
            return false;
          return true;
        }
      }
      ,
      validateCargoDescription: function () {
        var error;
        this.$refs.cargoForm.validateField('cargoDescription', callback => {
          error = callback;
        });
        if (error)
          return false;
        return true;
      }
      ,
      isCargoNatureAndScheduleConflict(selectedRouteDefaultCargoNature, onlineSelectedCargoNature)
      {
        return ((selectedRouteDefaultCargoNature == "Dry" && onlineSelectedCargoNature == 'RF') ||
        (selectedRouteDefaultCargoNature == "Reefer" && (onlineSelectedCargoNature == 'GC' || onlineSelectedCargoNature == "DG")))
      }
      ,
      deleteBox: function (index) {
        var self = this;
        this.$confirm("Cargo Nature will be change. Certain Container Size Types may no longer be valid and will be removed.", 'Warning', {
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          self.cargoData.cargoNature = self.cargoNature;
          self.setCargoType({cargoType: self.cargoNature});
        }).catch(() => {
        });
      }
      ,

    }
    ,
    props: ['cargoData'],
    computed: {
      ...
        mapGetters({
          "cargoType": "getCargoType",
          "dropDownListData": "getDropDownListData",
          submitStatus: 'getSubmitStatus',
          selectedRoute: "getSelectedRoute",
          containerStatus: "getContainerStatus",
          getCargoRecovery: "getCargoRecovery",
          getRestoreBR: "getRestoreBR",
          OriginCityInput:"getOriginCityInput"
        }),
      generators: function () {
        var self = this;
        if (self.dropDownListData && self.dropDownListData.reeferContainerGeneratorSets) {
          return self.dropDownListData.reeferContainerGeneratorSets
        }
      },
      ventilation_units: function () {
        var self = this;
        if (self.dropDownListData && self.dropDownListData.reeferContainerVentilationUnits) {
          return self.dropDownListData.reeferContainerVentilationUnits
        }
      },
    }
  }


</script>


<style lang="less" rel="stylesheet/less" scoped>
  @import "./../../assets/css/theme";

  .cargo-header {
    margin-bottom: 15px;
  }

  .cargo-nature-div .el-col-6 .cargo-nature-radio {
    background-color: white;
    
    border: 1px solid #999;
    font-size: 17px;
    padding: 1px;
    height: 80px;
    width: 80px;
    text-align: center;
    position: relative;
  }

  .cargo-nature-radio.selected .cargo-nature-selected-style {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.18;
    /*background-color:  #fd94a1;*/
  }

  .cargo-nature-div .el-col-6 .cargo-nature-radio.selected {
    border: 2px solid @primaryColor !important;
    //  border: 3px solid #d63246;
  }

  .cargo-nature-div .el-col-6 .cargo-nature-radio:focus {
    border: 1px solid @primaryColor;
    color: inherit;
    //  border: 3px solid #d63246;
  }

  .cargo-nature-div .el-col-6 .cargo-nature-radio .cargo-nature-img-style {
    margin: auto;
  }

  #app .cargo-nature-div .el-col-6 div img {
    padding-left: 0px;
  }

  .cargo-noted {
    font-style: oblique;
  }

  .cargo-radio-box {
    -moz-padding-start: 10px;
    -webkit-padding-start: 10px;
  }

  .cargo-radio-box li {
    margin-bottom: 10px;
    list-style-type: none;
  }

  /*reefer info style*/
  .reefer-info-row .el-col .el-select {
    width: 100%;
  }

  .reefer-info-row .el-col .reefer-input-number {
    width: 90%;
  }

  /*awkward info style*/
  .awkward-info-row .el-col .el-select {
    width: 100%;
  }

  .awkward-info-row .el-col .awkward-input-number {
    width: 90%;
  }

  .cargo-switch {
    margin-top: 5px;
  }

  .reefer-info-card .el-col .reefer-percentage {
    width: 80%;
  }

  .reefer-info-card .el-col .reefer-percentage.optional {
    width: 80%;
  }

  .awkward-info-card .el-col .reefer-percentage {
    width: 80%;
  }

  .awkward-info-card .el-col .reefer-percentage.optional {
    width: 80%;
  }

  .reefer-percentageChar {
    font-weight: bold;
    margin-left: 2%;
  }

  /*Emergency contact style*/
  .cargo-card {
    padding: 0 10px 0 0;
    margin-top: 15px;
  }

  .cargo-card-left {
    padding: 0 5px 0 0;
  }

  .cargo-card-right {
    padding: 0 0 0 5px;
  }

  .contact-card-row {
    margin-top: -15px;
  }

  .emergency-contact-row .box-card i {
    font-size: 22px;
    line-height: 45px;
  }

  .emergency-contact-row .box-card .fa-close {
    font-size: 24px;
    float: right;
    margin-top: -6%;
    margin-right: -3%;
    line-height: 30px;
    cursor: pointer;
  }

  @media screen and (min-width: @screen-xs) and  (max-width: @screen-xs-max) {
    .emergency-contact-row .box-card .fa-close {
      font-size: 24px;
      float: right;
      margin-top: -3%;
      margin-right: -2%;
      line-height: 20px;
    }
  }

  .emergency-contact-row div {
    float: left;
  }

  .emergency-name-style {
    padding-left: 3%;
  }

  .emergency-name-style:first-of-type {
    padding-left: 0;
    padding-right: 3%;
  }

  .emergency-phone {
    margin-top: 10px;
  }

  .emergency-phoneInput {
    width: 80%;
  }

  .emergency-phone .span-container {
    width: 20%;
    text-align: center;
    padding-top: 9px;
  }

  .emergency-phone .span-container span {
    font-size: 18px;
  }

  .emergency-phoneLocal {
    width: 99.9%;
  }

  .emergency-new {
    color: @primaryColor;
    font-weight: bold;
    font-size: 17px;
    margin-top: 10px;
  }

  .el-icon-delete:before {
    line-height: 50px;
  }

  .reefer-icon-label {
    margin-top: 8px;
    font-size: 14px;
    color: #666;
  }

  .card-item-label {
    font-weight: bold;
    font-size: 14px;
    color: #666;
    white-space: nowrap;
  }

  .fa-close:hover {
    color: @primaryColor;
  }

  .cargo-description-space {
    margin-top: -5px;
  }

  .emergency-contact-bottom {
    margin-bottom: 10px;
  }

  .reefer-pre-cooling {
    margin-top: 30px;
    font-size: 14px;
    color: #666;
    font-weight: bold;
  }

  .reefer-slider-bar {
    margin-top: 29px;
  }

</style>
