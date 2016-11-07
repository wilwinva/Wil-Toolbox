'use strict';

/**
 * @ngdoc controller
 * @name vactApp.controller:AdminCtrl
 * @description methods and properties for the admin page - create/modify/save room configurations AND validate room stats (Iguana Version, equipment temps/serial numbers)
 */

angular.module('vactApp')
    .controller('AdminCtrl', ['vactModel', 'equipmentList', 'INSTALLED', 'vactRoomList', 'vactRoomTemps', 'vactRoomSerials', 'vactRoomIguanaVersion', function (vactModel, equipmentList, INSTALLED, vactRoomList, vactRoomTemps, vactRoomSerials, vactRoomIguanaVersion) {
/*      console.log('made it in adminCtrl');*/
      var self = this;

    /**
     * @description - Initalize local variables
     */
      self.isClient = INSTALLED.isClient;
      self.roomState = '';
      self.activeRoom = '';
      self.selectedBldg = '';
      self.selectedRoom = '';
      self.roomType = '';
      self.bldgs = [];
      self.rooms = [];
      self.roomStateOptions = [{'label':'Validate a room','id':'validation'},{'label':'Create a room configuration','id':'createConfiguration'},{'label':'Manage a room configuration','id':'manageConfiguration'}];
      self.vactRooms = vactRoomList;

      for(var iBldg=0;iBldg<self.vactRooms.length;iBldg++){
        var bldg = self.vactRooms[iBldg].bldg;
        if(self.bldgs.indexOf(bldg) < 0){
          self.bldgs.push(bldg);
        }
      }

/**
 * @description - room validation variables
 * */
      self.vactRoomIguanaVersions = vactRoomIguanaVersion;
      self.currentIguanaVersion = '';
      self.igunanVersions = [{'label': 'v12.5.3','data':'v12.5.3'},{'label': 'v12.5.2','data':'v12.5.2'},{'label': 'v12.4.9','data':'v12.4.9'}];
      self.newestIguanaVersion = self.igunanVersions[0].label;
      self.updateIguana = false;

      self.vactRoomTemps = vactRoomTemps;
      self.equipmentTemps =  [];
      self.getTemps = false;

      self.vactRoomSerials = vactRoomSerials;
      self.equipmentSerials = [];
      self.getSerials = false;
      self.serialsLoaded = false;

/**
 *  @description - room configuration variables
 */
      self.equipmentLists = equipmentList;

      self.computers = self.equipmentLists.computers;
      self.displays = self.equipmentLists.displays;
      self.cameras = self.equipmentLists.cameras;
      self.peripherals = self.equipmentLists.peripherals;
      self.preloadedConfigurations = self.equipmentLists.preloadedConfigurations;
      self.roomConfigurations = self.equipmentLists.rooms;

      self.configurationTypes = [{'label':'','id':''},{'label':'Custom','id':'custom'},{'label':'Basic','id':'basic'},{'label':'Chameleon-Mini','id':'chameleon-mini'},{'label':'Chameleon','id':'chameleon'}];
      self.configurationType = '';
      self.roomConfiguration ='';
      self.unclassified = false;
      self.classified = false;
      self.spn = false;

      self.computerSelected = '';
      self.displaySelected = '';
      self.cameraSelected = '';
      self.peripheralSelected = '';

      self.showComputers = false;
      self.showDisplays = false;
      self.showCameras = false;
      self.showPeripherals = false;
      self.showEquipmentSpecifics = false;

      self.equipmentType = '';
      self.equipmentLabel = '';
      self.equipmentId = '';
      self.equipmentSecured = false;

      self.addAnother = false;
      self.equipmentCount = 0;
      self.equipmentGroup = '';

      self.tempObj = {};
      self.sources = [];
      self.targets = [];
      self.equipmentSpecifics = [];
      self.destinationArray = [];


    /**
     * @ngdoc method
     * @name loadRoomState
     * @methodOf vactApp.controller:AdminCtrl
     * @description - Load current room state
     * @param {string} roomState - The roomState what you want to do to a room (validate, manage configuration)
     */
      self.loadRoomState = function(roomState){
        self.roomState = roomState;
        self.sources = [];
        self.targets = [];
        self.roomConfiguration = '';
        self.activeRoom = '';
        self.selectedBldg = '';
        self.selectedRoom = '';
        if( self.isClient){
          self.activeRoom = INSTALLED.bldg + "/" + INSTALLED.room;
          self.openRoomSocket(self.activeRoom);
          self.loadRoomIguanaVersion();
          self.getRoomType();
          self.loadRoomConfiguration();
        }else{
          self.activeRoom = '';
        }

      };

  /*room validation method/properties - start*/

      /**
       * @ngdoc method
       * @name getBldgRooms
       * @methodOf vactApp.controller:AdminCtrl
       * @description - Load list of rooms base on bldg
       * @param {string} bldg - the bldg
       */
      self.getBldgRooms = function(bldg){
        //self.rooms = self.vactRooms.filter(bldg);
        self.rooms = [];
        for(var iBldg=0;iBldg<self.vactRooms.length;iBldg++){
          var brObj = self.vactRooms[iBldg];
          if(brObj.bldg === bldg){
            self.rooms.push(brObj.room);
          }
        }
      };

      /**
       * @ngdoc method
       * @name getRoomType
       * @methodOf vactApp.controller:AdminCtrl
       * @description - get room configuration type based on self.activeRoom
       */
      self.getRoomType = function(){
        for(var iBldg=0;iBldg<self.vactRooms.length;iBldg++){
          var brObj = self.vactRooms[iBldg];
          if(brObj.label === self.activeRoom){
            self.roomType=brObj.type;
            break;
          }
        }
      };

      /**
       * @ngdoc method
       * @name setBldgRooms
       * @methodOf vactApp.controller:AdminCtrl
       * @description - set self.activeRoom, fires self.getRoomType and self.loadRoomIguanaVersion methods
       * self.activeRoom is a bld/room combo used as a unique identifier
       */
      self.setBldgRooms = function(){
        self.activeRoom = self.selectedBldg + "/" + self.selectedRoom;
        self.getRoomType();
        self.loadRoomIguanaVersion();
      };

      /**
       * @ngdoc method
       * @name openRoomSocket
       * @methodOf vactApp.controller:AdminCtrl
       * @description - open a socket based on room provided
       * @param {string} room - this is really a bld/room combo used as a unique identifier
       */
      self.openRoomSocket = function(room){
        self.activeRoom = room;
        /*window.alert(self.activeRoom);*/
      };

      /**
       * @ngdoc method
       * @name loadRoomIguanaVersion
       * @methodOf vactApp.controller:AdminCtrl
       * @description - set Iguana Version based on self.activeRoom
       * set self.iguanaUpToDate text field to show where current iguana version is in relationship to list of versions
       */
      self.loadRoomIguanaVersion = function(){
        for(var iRIV=0;iRIV<self.vactRoomIguanaVersions.length;iRIV++){
          var vrivObj = self.vactRoomIguanaVersions[iRIV];
          if(vrivObj.room === self.activeRoom){
            self.currentIguanaVersion=vrivObj.igunanVersion;
            self.iguanaUpToDate = 'Current Iguana version ' + '(' + self.currentIguanaVersion + ') ';
            self.iguanaUpToDate += (self.currentIguanaVersion === self.newestIguanaVersion?'is up to date':'is behind the latest version');
            break;
          }
        }
      };

      /**
       * @ngdoc method
       * @name updateIguanaVersion
       * @methodOf vactApp.controller:AdminCtrl
       * @description - update Iguana Version for self.activeRoom
       * set self.iguanaUpToDate text field to show where current iguana version is in relationship to list of versions
       */
      self.updateIguanaVersion = function(newIguanaVersion){
        //window.alert(newIguanaVersion);
        self.currentIguanaVersion = newIguanaVersion;
        self.iguanaUpToDate = 'Current Iguana version ' + '(' + self.currentIguanaVersion + ') ';
        self.iguanaUpToDate += (self.currentIguanaVersion === self.newestIguanaVersion?'is up to date':'is behind the latest version');
      };

      /**
       * @ngdoc method
       * @name getTempData
       * @methodOf vactApp.controller:AdminCtrl
       * @description - button action to show/hide equipment temps
       * if temps are visible reload new temps - need to repull temps each time clicked
       */
      self.getTempData = function() {
        if (self.getTemps) {
          /*hide temps*/
          self.getTemps = false;
        } else {
          /*ajax in room equipment temps*/
          console.log('ajax in room equipment temps');
          self.loadRoomTemps();
          self.getTemps = true;
        }
      };

      /**
       * @ngdoc method
       * @name loadRoomTemps
       * @methodOf vactApp.controller:AdminCtrl
       * @description - build list of current equipment temps for self.activeRoom
       */
      self.loadRoomTemps = function(){
        for(var iRR=0;iRR<self.vactRoomTemps.length;iRR++){
          var vrrObj = self.vactRoomTemps[iRR];
          if(vrrObj.room === self.activeRoom){
            self.equipmentTemps=vrrObj.temps;
            break;
          }
        }
      };

      /**
       * @ngdoc method
       * @name getSerialData
       * @methodOf vactApp.controller:AdminCtrl
       * @description - button action to show/hide equipment serial numbers
       * if temps are NOT visible get serial numbers - only need to pull once
       */
      self.getSerialData = function() {
        if (self.getSerials) {
          self.getSerials = false;//hide serial numbers
        } else {
          if (!self.serialsLoaded) {
            //ajax in room serial numbers
            console.log('ajax in room serial numbers');
            self.loadRoomSerials();
            self.serialsLoaded = true;
          }
          self.getSerials = true;
        }
      };

      /**
       * @ngdoc method
       * @name loadRoomSerials
       * @methodOf vactApp.controller:AdminCtrl
       * @description - build list of current equipment serial numbers for self.activeRoom
       */
      self.loadRoomSerials = function(){
        for(var iRS=0;iRS<self.vactRoomSerials.length;iRS++){
          var vrsObj = self.vactRoomSerials[iRS];
          if(vrsObj.room === self.activeRoom){
            self.equipmentSerials=vrsObj.serials;
            break;
          }
        }
      };

      /**
       * @description - determines if this is a local or remote access
       */
      if( self.isClient){
        self.openRoomSocket(self.activeRoom);
        self.loadRoomIguanaVersion();
      }
  /*room validation methods/properties - end*/

  /*room configuration methods/properties - start*/

      /**
       * @ngdoc method
       * @name loadConfiguration
       * @methodOf vactApp.controller:AdminCtrl
       * @description - load source and target equipment arrays based on configurationType from dropdown
       * @param {string} configurationType - the configurationType
       */
      self.loadConfiguration = function(configurationType){
        var preloadConfiguration = [];
        switch(configurationType){
          case 'custom':
            self.sources = [];
            self.targets = [];
            break;
          case 'basic':
            preloadConfiguration = self.preloadedConfigurations.basic;
            break;
          case 'chameleon-mini':
            preloadConfiguration = self.preloadedConfigurations.mini;
            break;
          case 'chameleon':
            preloadConfiguration = self.preloadedConfigurations.chameleon;
            break;
        }
        if(preloadConfiguration.length > 0) {
          self.sources = preloadConfiguration.source;
          self.targets = preloadConfiguration.target;
        }
      };

      /**
       * @ngdoc method
       * @name equipmentSelected
       * @methodOf vactApp.controller:AdminCtrl
       * @description - radio button selection that displays which dropdown list of equipment via self.findEquipmentObjByReference
       * build list of current equipment serial numbers for self.activeRoom
       * @param {string} equipment - the equipment
       * @param {string} equipmentGroup - the equipmentGroup
       */
      self.equipmentSelected = function(equipment, equipmentGroup){
/*        console.log('made it in equipmentSelected:'+equipment);*/
        self.equipmentCount = 0;
        self.equipmentGroup = equipmentGroup;
        var arrayToSearch = [];
        switch(equipmentGroup){
          case 'computers':
            arrayToSearch = self.computers;
            self.destinationArray = self.sources;
            break;
          case 'displays':
            arrayToSearch = self.displays;
            self.destinationArray = self.targets;
            break;
          case 'cameras':
            arrayToSearch = self.cameras;
            self.destinationArray = self.sources;
            break;
          case 'peripheral':
            arrayToSearch = self.peripherals;
            self.destinationArray = self.sources;
            break;
        }

        for(var i=0;i<arrayToSearch.length;i++){
          if(arrayToSearch[i].type === equipment){
            self.tempObj = arrayToSearch[i];
          }
        }

        var increment = 1;
        if(self.destinationArray.length > 0){
          for(var a=0;a<self.destinationArray.length;a++){
            if(self.destinationArray[a].type === equipment){
              increment++;
            }
          }
        }

        self.equipmentCount = increment;
        self.equipmentType = self.tempObj.type;
        self.equipmentLabel = self.tempObj.label + ' ' + increment;
        self.equipmentId = self.tempObj.id + '_' + increment;

        self.showEquipmentSpecifics = true;
      };

      /**
       * @ngdoc method
       * @name saveEquipment
       * @methodOf vactApp.controller:AdminCtrl
       * @description - save equipment to destinationArray (source or target)
       */
      self.saveEquipment = function(){
        var newEquipment = {};
        newEquipment.type = self.equipmentType;
        newEquipment.label = self.equipmentLabel;
        newEquipment.id = self.equipmentId;
        newEquipment.secured = self.equipmentSecured;
        self.destinationArray.push(newEquipment);
        self.addAnother = true;
      };

      /**
       * @ngdoc method
       * @name addAnotherEquipment
       * @methodOf vactApp.controller:AdminCtrl
       * @description - add another of same equipment to destinationArray (source or target) but increment by 1
       */
      self.addAnotherEquipment = function(){
        self.equipmentCount++;
        var newEquipment = {};
        newEquipment.type = self.tempObj.type;
        newEquipment.label = self.tempObj.label + ' ' + self.equipmentCount;
        newEquipment.id = self.tempObj.id + '_' + self.equipmentCount;
        newEquipment.secured = self.equipmentSecured;
        self.destinationArray.push(newEquipment);
        self.addAnother = true;
      };

      /**
       * @ngdoc method
       * @name resetEquipment
       * @methodOf vactApp.controller:AdminCtrl
       * @description - clear equipment variables
       */
      self.resetEquipment = function(){
        self.computerSelected = '';
        self.displaySelected = '';
        self.cameraSelected = '';
        self.peripheralSelected = '';
        self.computerSelected = '';
        self.displaySelected = '';
        self.cameraSelected = '';
        self.peripheralSelected = '';
        self.showComputers = false;
        self.showDisplays = false;
        self.showCameras = false;
        self.showPeriphals = false;
        self.showEquipmentSpecifics = false;
        self.addAnother = false;
      };

      /**
       * @ngdoc method
       * @name loadConfiguration
       * @methodOf vactApp.controller:AdminCtrl
       * @description - load source and target equipment arrays based on saved room configuration
       * @param {string} configurationType - the configurationType
       */
      self.loadRoomConfiguration = function(){
        if(self.activeRoom === '') {
          self.activeRoom = self.selectedBldg + "/" + self.selectedRoom;
        }
        var preloadConfiguration =[];
        switch(self.activeRoom){
          case '870/123':
            preloadConfiguration = self.roomConfigurations["870/123"];
            break;
        }
        self.sources = preloadConfiguration.source;
        self.targets = preloadConfiguration.target;
        self.unclassified = preloadConfiguration.classification.unclassified;
        self.classified = preloadConfiguration.classification.classified;
        self.spn = preloadConfiguration.classification.spn;
        self.resetEquipment();

      };
 /*room configuration methods/properties - end*/

    }
  ])
;
