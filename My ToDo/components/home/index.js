'use strict';

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function(parent){
    console.log("Init  Web SQL");
    //DFC 20160319 reference to dbengine WebSQL/sqlite with
    // app.db = ...
    // app.db.transaction(...
    var startModel = kendo.observable({
        fields: {
            user: "guest",
            password: "pdw123",
            StartUser: "",
            StartPassword: "",
        },
        getUsrPwd: function() {
            $("#sqlengine").html(app.dbEngine);
            app.db.transaction(
                function(tx) {
                    tx.executeSql(
                        "SELECT user, password FROM users WHERE id = 1",
                        [],
                        function(tx, rs) {
                            parent.set("startModel.fields.user",rs.rows.item(0).user);
                            app.home.set("startModel.fields.password",rs.rows.item(0).password);
                            console.log("DFC >>> QUERY SELECT >>> u:"+rs.rows.item(0).user+" p:"+rs.rows.item(0).password);
                        },
                        null
                    );
                }
            );
        },
        LogIn: function() {
            //console.log("Log in for: "+$("#usr").val()+" // "+$("#pwd").val());
            console.log("MVVM >>> Log in for: "+startModel.fields.StartUser+" // "+startModel.fields.StartPassword);
        },
    });
    parent.set('startModel', startModel);
    
})(app.home);
// END_CUSTOM_CODE_home

function doLogin(user,password) {
	app.db.transaction   {
        function(tx) {
            tx.executeSql(
                "SELECT COUNT(*) AS USERFOUND FROM users WHERE user=? AND  password=?",
                [user,password],
                function(tx, rs) {
                    //DFC 20160319 TODO: IMPLEMENT HERE THE CHECK POINT IF USR EXISTS...
                }
            )
        }
    }
}