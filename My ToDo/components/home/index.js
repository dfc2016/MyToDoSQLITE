'use strict';

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function(parent){
    console.log("Init  Web SQL");
    //DFC 20160316 reference to dbengine WebSQL/sqlite with
    // parent.db = ...
    // parent.db.transaction(...
    var startModel = kendo.observable({
        fields: {
            user: "guest",
            password: "pdw123"
        },
        getUsrPwd: function() {
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
    });
    parent.set('startModel', startModel);
    
})(app.home);
// END_CUSTOM_CODE_home