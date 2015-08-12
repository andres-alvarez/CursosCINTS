// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.pushnotifications', [])

.constant('mmaPushNotificationsComponent', 'mmaPushNotifications')

.run(function($mmaPushNotifications, $ionicPlatform, $rootScope, $mmEvents, $mmLocalNotifications, mmCoreEventLogin,
            mmaPushNotificationsComponent) {

    // Register device on GCM or APNS server.
    $ionicPlatform.ready(function() {
        $mmaPushNotifications.registerDevice();
    });

    // Notification received.
    $rootScope.$on('$cordovaPush:notificationReceived', function(e, notification) {
        if (ionic.Platform.isAndroid()) {
            $mmaPushNotifications.onGCMReceived(notification);
        } else if (ionic.Platform.isIOS()) {
            $mmaPushNotifications.onMessageReceived(notification);
        }
    });

    // Register device on Moodle site when login.
    $mmEvents.on(mmCoreEventLogin, function() {
        $mmaPushNotifications.registerDeviceOnMoodle();
    });

    // Listen for local notification clicks (generated by the app).
    $mmLocalNotifications.registerClick(mmaPushNotificationsComponent, $mmaPushNotifications.notificationClicked);
});
