angular.module("myApp").controller("myController", function ($scope, $http) {

    $scope.size = "";

    //function to  calculate size
    $scope.calculateSize = function () {

        for (var i = 0; i < $scope.companies.length; i++) {
            if ($scope.companyElectricity == $scope.companies[i].name) {
                $scope.size = ($scope.customerBill / $scope.companies[i].rate) / 140;

            }
        }
        

    }

$scope.questionaireHide = null;
$scope.summaryHide = null;
$scope.equipmentHide = null;
$scope.contractorHide = null;
$scope.engineerHide = null;

$scope.moveToQuestionaire = function() {
    $scope.questionaireHide = 1;
    $scope.summaryHide = 1;
    
    console.log("this is working");
}

$scope.moveToEquipment = function(){
        $scope.questionaireHide = null;
        $scope.equipmentHide = 1;
}

$scope.backContractor = function(){
        $scope.engineerHide = null;
        $scope.contractorHide = 1;
        
}

 $scope.backEquip= function(){
        $scope.engineerHide = null;
        $scope.equipmentHide = 1;
 }

        $scope.backQuestions = function() {
            $scope.engineerHide = null;
            $scope.questionaireHide = 1;
        }


    //caling the json:
    $http.get("http://localhost:8080/json/equipment.json")
        .then(function (response) {
            $scope.panels = response.data.panels;
            $scope.mounts = response.data.mountingBracket;
            $scope.inverters = response.data.inverter;
            $scope.companies = response.data.companies

        });

    $http.get("http://localhost:8080/json/contractors.json")
        .then(function (response) {
            $scope.contractors = response.data.contractor;
        });


    $http.get("http://localhost:8080/json/engineer.json")
        .then(function (response) {
            $scope.engineer = response.data;

        });



    //ngmodel info from the input:
    $scope.customerBill;
    $scope.companyElectricity;
    $scope.address;
    $scope.yesPool;
    $scope.noPool;
    $scope.typeRoof;
    $scope.ageRoof;
    $scope.yesFinance;
    $scope.noFinance;


    $scope.selectedPanel = $scope.panels;
    $scope.selectedBracket = $scope.mounts;
    $scope.selectedInverter = $scope.inverters;

    $scope.panelPower = null,
    $scope.numberPanels = null;
    $scope.totalPrice = null;


    $scope.equipmentPrice = function () {
        $scope.panelPower = parseInt($scope.selectedPanel.model);
        $scope.numberPanels = Math.ceil(($scope.size * 1000) / $scope.panelPower);
        $scope.panelPrice = $scope.numberPanels * $scope.selectedPanel.price;
        $scope.totalMountPrice = ($scope.numberPanels * $scope.selectedBracket.price);
        $scope.inverterPrice = $scope.selectedInverter.price;

        $scope.totalPrice = $scope.totalMountPrice + $scope.panelPrice + $scope.inverterPrice;
        $scope.equipmentHide = null;
        $scope.contractorHide = 1;


    }

    $scope.selectedContractor = $scope.contractors;
    $scope.totalPriceOfContractor = null;

    $scope.totalCostOfContractor = function () {

        var additionOfCostContractor = 0;
        for (var i = 0; i < $scope.engineer.services.length; i++) {
            additionOfCostContractor += $scope.engineer.services[i].cost;
        };
        
        $scope.totalPriceOfContractor = $scope.numberPanels * parseInt($scope.selectedContractor.averagePrice);
        $scope.totalCostOfSystem = $scope.totalPrice + $scope.totalPriceOfContractor + additionOfCostContractor;
        
        $scope.totalWithTaxCredit = $scope.totalCostOfSystem * .70;
        $scope.paybackInMonths = Math.ceil($scope.totalCostOfSystem / $scope.customerBill);
        $scope.paybackInYears = $scope.paybackInMonths / 12;
        $scope.remainderInYears = Math.ceil(($scope.paybackInYears % 1) * 12);
        $scope.paybackInYears = Math.floor($scope.paybackInMonths / 12);
        
        $scope.contractorHide = null;
        $scope.engineerHide = 1;
    }




    // $scope.numberPanels="";
    // $scope.panelPower = "";
    // $scope.panelPrice ="";
    // $scope.mountPrice ="";
    // $scope.inverPrice = "";
    // $scope.finalPrice = "";

    //  $scope.calculateprice = function() {





    // $scope.mountPrice = $scope.mounts.price;
    // $scope.inverPrice = $scope.inver.price;

    // $scope.finalPrice = $scope.panelPrice + $scope.mountPrice+ $scope.inverPrice

    //  }












}); //the end do not delete