<template>
  <div>
    <el-form ref="form" label-position="top">
      <el-row>
        <!--<h1>{{$t('SPECIAL_REQUIREMENT')}}</h1>-->
        <!--Miscellaneous Requirements-->
        <el-form-item class="RequireForm" :label="$t('MISCELLANEOUS_REQUIREMENTS')">
          <el-col v-for="item in specialRequirementsData" :key="item.code">
            <el-checkbox v-if="$t('LANGUAGE_TYPE') == 'en' && item.code== 'OFU'" v-model="specialHandlings[0].code" :true-label="item.code"
                         false-label="">
              {{item.enName}}
            </el-checkbox>
            <el-checkbox v-else-if="$t('LANGUAGE_TYPE') == 'zh' && item.code== 'OFU'" v-model="specialHandlings[0].code" :true-label="item.code"
                         false-label="">
              {{item.cnName}}
            </el-checkbox >
            <el-checkbox v-else-if="$t('LANGUAGE_TYPE') == 'tr' && item.code== 'OFU'" v-model="specialHandlings[0].code" :true-label="item.code"
                         false-label="">
              {{item.trName}}
            </el-checkbox>
          </el-col>
        </el-form-item>
      </el-row>

      <el-row class="SpecialStowage">
        <br>
        <el-form-item :label="$t('SPECIAL_STOWAGE')">
          <el-col :span="24">
            <div class="note inner-space">{{$t("SPECIAL_STOWAGE_NOTE")}}</div>
          </el-col>
          <el-checkbox-group 
            v-model="specialHandlings[1].code"
            :min="0"
            :max="6">
            <el-col  class="special-stowage-class" v-for="item in specialRequirementsData" :key="item.code" :span="12">
              <el-checkbox v-if="$t('LANGUAGE_TYPE') == 'en' && item.code!='OFU'" :label="item.code">
                {{item.enName}}
              </el-checkbox>
              <el-checkbox v-else-if="$t('LANGUAGE_TYPE') == 'zh' && item.code!='OFU'" :label="item.code">
                {{item.cnName}}
              </el-checkbox >
              <el-checkbox v-else-if="$t('LANGUAGE_TYPE') == 'tr' && item.code!='OFU'" :label="item.code">
                {{item.trName}}
              </el-checkbox>
            </el-col>
          </el-checkbox-group>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    props: ["specialHandlings"],
    computed: {
      ...mapGetters({
        specialRequirementsData:'getSpecialRequirementsData',
        restoreBR:'getRestoreBR',
        specialRequireRecovery:'getSpecialRequireRecovery'
      }),
    },
    data() {
      return{};
    },
    mounted(){
    },
    methods: {
      ...mapActions([
          'setSpecialRequireRecovery'
      ])
    },
    watch: {
      specialRequireRecovery:function(val){
          var self = this;
          if(val){
              console.log(self.restoreBR)
            self.specialHandlings[0].code = self.restoreBR.specialHandlings[0].code;
            self.specialHandlings[1].code = self.restoreBR.specialHandlings[1].code;
          }
          self.setSpecialRequireRecovery(false);
      }
    }
  }
</script>

<style>
  .RequireForm {
    margin-bottom: 15px;
  }

  .RequireReeferForm {
    margin-bottom: 15px;
    margin-top: -10px;
  }

  .special-title {
    margin-top: 5px;
  }

  .split-specialRequirement-line {
    height: 1px;
    border-top: 1px solid #CCC;
    margin-top: -20px;
  }

  .RequireReeferRadioForm {
    margin-bottom: 15px;
    margin-top: -20px;
    margin-left: 18px;
  }

  .SpecialStowage {
    margin-bottom: -10px;
  }

  .note{
    font-style: oblique;
    font-size: 10pt;
  }

  .special-stowage-class{
    font-size: 14pt;
    font-weight: normal;
    line-height: 20px;
  }
</style>
