app.controller("adminBodyController", function ($scope, $http) {

    $http.get("http://localhost:8080/json/equipment.json")
        .then(function (response) {

            $scope.mounts = response.data.mountingBracket;
            $scope.panels = response.data.panels;
            $scope.inverters = response.data.inverter;



        })

    $http.get("http://localhost:8080/json/contractors.json")
        .then(function (response) {
            $scope.contractors = response.data.contractor;
        })

    $scope.pushMountingBracket = function () {
        var newMount = {
            name: $scope.bracketName,
            warranty: $scope.bracketWarranty,
            rating: $scope.bracketRating,
            price: $scope.bracketPrice
        }
        $scope.mounts.push(newMount);
    }

    $scope.pushContractors = function () {
        var newContractor = {
            companyName: $scope.companyName,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            age: $scope.contractorAge,
            address: {
                streetAddress: $scope.streetAddress,
                city: $scope.cityAddress,
                state: $scope.stateAddress,
                postalCode: $scope.zipCode
            },
            contactInfo: {
                email: $scope.emailInfo,
                number: $scope.phoneNumber
            },
            averagePrice: $scope.pricePerWatt,
            averageCustomerRating: $scope.starRating + " stars",
            warranty: $scope.laborWarranty + " years"
        }
        $scope.contractors.push(newContractor);
    }

    $scope.pushPanels = function () {
        var newPanel = {
            name: $scope.panelBrand,
            model: $scope.panelModel,
            warranty: $scope.panelWarranty + " warranty",
            rating: $scope.panelRating + " stars",
            price: $scope.panelPrice
        }
        $scope.panels.push(newPanel)
    }

    $scope.pushInverters = function () {

        var newInverter = {
            name:   $scope.inverterName,
            model: $scope.inverterModel,
            watts: $scope.inverterWatts,
            price: $scope.inverterPrice,
            warranty: $scope.inverterWarranty
        }
        $scope.inverters.push(newInverter);
    }
})