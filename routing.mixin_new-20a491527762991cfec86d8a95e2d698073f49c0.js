import _ from 'lodash'
export default {
  methods: {
    handleRouteData(submitData, routeData){
      var result = {
        placeOfReceipt: this.generateCity(routeData.placeOfReceipt),
        finalDestination: this.generateCity(routeData.finalDestination),
        sailingScheduleSelected: routeData.isSailingSchedule
      };
      console.log(JSON.stringify(result))
      return result;
    },
    generateCity(place){
      var result = {};
      result.city = {
        city: place.city,
        cityAndCountryName: place.searchCriteriaString,
        cityDetailInformation: place.searchCriteriaString,
        cityDetailInformationForAutocompleteDiaplayName: place.searchCriteriaString,
        cityDetailInformationForCityAndCountry: place.searchCriteriaString,
        cityDisplayNameByCountry: place.searchCriteriaString,
        cityFullName: place.searchCriteriaString,
        cityID: parseInt(place.cityKey),
        cityIDForJsonString: place.cityKey,
        country: place.country,
        countryCode: "",
        "county": place.county,
        "locationCode": {
          "empty": false,
          "mutuallyDefinedCode": "",
          "scheduleKDCode": "",
          "scheduleKDType": "",
          "unLocationCode": place.unLocationCode
        },
        "state": place.state
      }
      return result;
    },
    handleSailingScheduleInfo(routeData){
      if (routeData.selectedRoute && routeData.selectedRoute.recordSaveState) {
        var recordSaveState = JSON.parse(routeData.selectedRoute.recordSaveState);
        return JSON.stringify(recordSaveState);
      }
      return "";
    },
    handleRoueInBrDTO(submitData, routeData){
      var brdto = JSON.parse(submitData.brDTO);
      var {
        originCityInputHiddenValue, originCityInput, originCountryInput, destinationCityInputHiddenValue,// destinationCityInput, destinationCountryInput,
        isSailingSchedule, departure, numberOfWeeks, searchConditionDate, bookingOffice, polInput, podInput, doorPickupSelect, doorDeliverySelect, isCheckUSorCA
      } = routeData;
      brdto = Object.assign({}, brdto, {
        originCityInputHiddenValue,
        originCityInput,
        doorPickupSelect,
        doorDeliverySelect,
        bookingOffice,
        polInput,
        podInput,
        isCheckUSorCA,
        //originCountryInput,
        destinationCityInputHiddenValue,
        destinationCityInput,
        //destinationCountryInput,
        sailingScheduleSelected: isSailingSchedule,
        departure,
        numberOfWeeks,
        searchConditionDate
      })

      if (isSailingSchedule === 1) {
        var selectedRoute = JSON.parse(JSON.stringify(routeData.selectedRoute));

        if (!_.isEmpty(selectedRoute)) {
          var legs = JSON.parse(selectedRoute.recordSaveState).oceanComponent.oceanleg;
          legs = _.sortBy(legs, function (item) {
            return item.legSequence;
          });
          brdto.portOfLoadCityInput = legs[0].POL.portName;
          brdto.portOfDischargeCityInput = legs[legs.length - 1].POD.portName;
        } else {
          brdto.portOfLoadCityInput = "";
          brdto.portOfDischargeCityInput = "";
        }
      }
      if (isSailingSchedule === 2) {//待添加case3
        brdto.originCityInputHiddenValue = routeData.placeOfReceipt.cityKey;
        brdto.destinationCityInputHiddenValue = routeData.finalDestination.cityKey;
        var {service, vesselName, externalVoyageNumber, direction} = routeData.svvd;
        brdto = Object.assign({}, brdto, {
          service, vesselName, externalVoyageNumber, direction
        });
      }
      return JSON.stringify(brdto);
    },
    isSameCity(hiddenCityId, currentSelectedRouteCityId){
      return hiddenCityId == "" || (hiddenCityId != "" && hiddenCityId == currentSelectedRouteCityId);
    },

    isSameOriginAndDestination(){
      if(!this.routeData.selectedRoute || !this.routeData.selectedRoute.recordSaveState){
        return true;
      }
      var selectedRoute = JSON.parse(this.routeData.selectedRoute.recordSaveState);
      var currentSSOriginCityId = selectedRoute.origin.cityKey;
      var currentSSDestinationCityId = selectedRoute.destination.cityKey;
      return this.isSameCity(this.routeData.placeOfReceipt.cityKey || "", currentSSOriginCityId) && this.isSameCity(this.routeData.finalDestination.cityKey || "", currentSSDestinationCityId);
    },
    handleRouteWarning(routeData, callback){
      var selectedRoute = JSON.parse(JSON.stringify(routeData.selectedRoute));
      if ((routeData.isSailingSchedule === 1) && _.isEmpty(selectedRoute)) {
        this.$confirm('No Sailing Schedule was selected.  Click "Continue" to proceed, or "Cancel" and select a Sailing Schedule or enter an Intended Vessel Voyage.', 'Warning', {
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          if(ga){
            ga('send', {
              hitType: 'event',
              eventCategory: 'NoSailingScheduleSelected',
              eventAction: 'continue',
              eventLabel: 'continue'
            });
          }
          callback(true)
        }).catch(() => {
          if(ga){
            ga('send', {
              hitType: 'event',
              eventCategory: 'NoSailingScheduleSelected',
              eventAction: 'cancel',
              eventLabel: 'cancel'
            });
          }
          callback(false)
        });
      } else if (!_.isEmpty(this.routeData.selectedRoute) && !this.isSameOriginAndDestination()) {
        this.$confirm('The Origin and Destination do not match the selected Sailing Schedule. Click "Continue" to proceed or "Cancel" to change the Origin and Destination or select another sailing schedule.', 'Warning', {
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          if(ga){
            ga('send', {
              hitType: 'event',
              eventCategory: 'CityNotMatch',
              eventAction: 'continue',
              eventLabel: 'continue'
            });
          }
          callback(true)
        }).catch(() => {
          if(ga){
            ga('send', {
              hitType: 'event',
              eventCategory: 'CityNotMatch',
              eventAction: 'cancel',
              eventLabel: 'cancel'
            });
          }
          callback(false)
        });
      }else{
        callback(true)
      }
    }


  }
}
