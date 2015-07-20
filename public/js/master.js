
var app = angular.module('testApp',[]);

app.controller('masterCntrl', function($scope,$http) {

  $scope.bidHidden = true;
  $scope.dataLog = null;
  $scope.bidTemp = {

    bidding_option:null,
    max_cpc:null,
    budget:null,
    delivery_method:null

  };

	$scope.form = {
      "campaign": {
          "name": "settings exam",
          "bids": {
              "bidding_options_list": [
                  {
                      "id": 1,
                      "value": "By clicks - use maximum CPC bids"
                  },
                  {
                      "id": 2,
                      "value": "By clicks - use maximum CPC bids + Enhanced CPC"
                  },
                  {
                      "id": 3,
                      "value": "By clicks - maximize clicks within my target budget"
                  },
                  {
                      "id": 4,
                      "value": "By clicks - maximize clicks within my target budget + Enhanced CPC"
                  },
                  {
                      "id": 5,
                      "value": "By conversions - max cpa"
                  },
                  {
                      "id": 6,
                      "value": "By conversions - target cpa"
                  }
              ],
              "delivery_method_list": [
                  {
                      "id": "STANDARD",
                      "value": "Standard: Show ads evenly over time"
                  },
                  {
                      "id": "ACCELERATED",
                      "value": "Accelerated: Show ads as quickly as possible"
                  }
              ],
              "saved_values": {
                  "bidding_option": 3,
                  "max_cpc": 0.95,
                  "max_cpa": 1,
                  "budget": 100,
                  "delivery_method": "STANDARD"
              },
              "cpc_eligible": 0
          },
          "location": {
              "location_list": [
                  "Arizona, United States - state",
                  "Australia - country",
                  "Austin, Texas, United States - city",
                  "Alabama, United States - state",
                  "Arkansas, United States - state",
                  "Atlanta, Georgia, United States - city",
                  "Argentina - country",
                  "Arlington, Virginia, United States - city",
                  "Albuquerque, New Mexico, United States - city",
                  "Anaheim, California, United States - city"
              ],
              "selected_values": [
                  "France - country",
                  "England - country"
              ]
          }
      }
  }
  $scope.nameNotOK = false;
  $scope.$watch('form.campaign.name',function(n,o){
    console.log('new',n,'old',o);

    $scope.nameNotOK = /(^\d)/.test(n);
    console.log('$scope.nameOK',$scope.nameNotOK);

  });

  $scope.removeLocation = function(index){
    $scope.form.campaign.location.selected_values.splice(index, 1);
    console.log('$scope.form.location.selected_values',$scope.form.campaign.location.selected_values);
  }

  $scope.addLocation = function(location){
    // Validation if location already exists.
    if($scope.form.campaign.location.selected_values.indexOf(location) != -1)
      return;

    $scope.form.campaign.location.selected_values.push(location);
  }

  var docWidth = $( document ).width();
  var docHeight = $( document ).height();

  $scope.setBidFalse = function(){

    // Make bids popup visible

    $scope.bidHidden = false;
    // Get Selected Values.
    $scope.bidTemp.bidding_option = $scope.form.campaign.bids.saved_values.bidding_option;
    $scope.bidTemp.max_cpc = $scope.form.campaign.bids.saved_values.max_cpc;
    $scope.bidTemp.budget = $scope.form.campaign.bids.saved_values.budget;
    $scope.bidTemp.delivery_method = $scope.form.campaign.bids.saved_values.delivery_method;


  }

  $scope.closeBid = function(){

    // Dont make any changes in bid and close.
    $scope.bidHidden = true;
    $scope.bidTemp.bidding_option = null;
    $scope.bidTemp.max_cpc = null;
    $scope.bidTemp.budget = null;
    $scope.bidTemp.delivery_method = null;
  }

  $scope.getLogFile = function(){
    $http.get(window.location.origin + '/getLog').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.dataLog = data;
        console.log('data',data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });  
  }

  $scope.saveBid = function(){
    console.log('$scope.bidTemp',$scope.bidTemp)
    if($scope.bidTemp.bidding_option == null || $scope.bidTemp.max_cpc == null || $scope.bidTemp.max_cpc <= 0 || $scope.bidTemp.budget == null || $scope.bidTemp.delivery_method == null)
      return;

    // change SAVED VALUES according to user's choice
    $scope.form.campaign.bids.saved_values.bidding_option = $scope.bidTemp.bidding_option;
    $scope.form.campaign.bids.saved_values.max_cpc = $scope.bidTemp.max_cpc;
    $scope.form.campaign.bids.saved_values.budget = $scope.bidTemp.budget;
    $scope.form.campaign.bids.saved_values.delivery_method = $scope.bidTemp.delivery_method;

    $scope.bidHidden = true;

    var data = "(POPUP) Bid Saved : ";
    data += JSON.stringify($scope.form.campaign.bids.saved_values);
    $scope.saveToLog(data);

  }

  $scope.saveJSON = function(){
    $scope.saveToLog(JSON.stringify($scope.form));
  }

  $scope.saveToLog = function(data){
    
    if(data == null)
      return;

    console.log('data', data);

    $http.post(window.location.origin + '/writeLog', { data:data }).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });  
  }

	
});