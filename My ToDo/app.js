'use strict';

(function () {
    var app = {
        data: {}
    };
    //DFC 20160316 insert code here to handle WebSQL/sqlite
    app.db = null;

    var bootstrap = function () {
        //DFC 20160316 init dbengine WebSQL/sqlite
        var dbName = "Todo.sqlite";
        if (window.navigator.simulator === true) {
            // For debugin in simulator fallback to native SQL Lite
            console.log("Use built in SQL Lite");
            app.db = window.openDatabase(dbName, "1.0", "Cordova Demo", 200000);
        } else {
            app.db = window.sqlitePlugin.openDatabase(dbName);
        }
        app.db.transaction(
            function(tx){
                tx.executeSql(
                    "DROP TABLE IF EXISTS users"
                );
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY ASC, user TEXT, password TEXT)"
                );
                tx.executeSql(
                    "INSERT INTO users (user, password) VALUES ('diego', 'secure123')"
                );
            }
        );
        //DFC 20160316 init dbengine WebSQL/sqlite
        
        $(function () {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                initial: 'components/home/view.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li a.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function () {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());

// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_kendoUiMobileApp