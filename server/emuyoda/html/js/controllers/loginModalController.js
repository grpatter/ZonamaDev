define([ "./module", "services" ], function(controllers) {
    "use strict";
    controllers.controller("loginModalController", [ "$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
        $scope.username = "";
        $scope.password = "";
        $scope.ok = function() {
            $uibModalInstance.close({
                username: $scope.username,
                password: $scope.password
            });
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };
    } ]);
});
