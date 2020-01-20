sap.ui.define([
    "goods/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("goods.controller.Main", {
        onInit: function () {
            //For local development. Start your NodeJS server.
            var router = sap.ui.core.UIComponent.getRouterFor(this);
            router.getRoute("Master").attachMatched(this._onRouteMatched, this);
            this.host = "http://localhost:3000";
            this.oDataModel = new JSONModel({});
            this.getView().setModel(this.oDataModel, "goods");

            //For cloud router. So... router will see prefix /api and will forward request to NodeJS in cloud
            //this.host = "/api";
            //For directly NodeJS. So request will be sent directly to NodeJS in cloud (replace with your uri)
            //this.host = "https://p2001634032trial-trial-dev-router.cfapps.eu10.hana.ondemand.com";

        },


        _onRouteMatched: function (oEvent) {

            var XHR = new XMLHttpRequest();
            XHR.open("GET", "http://localhost:3000/goods", true);
            XHR.setRequestHeader("Content-Type", "application/json");
            XHR.send();
            XHR.onreadystatechange = function () {
                if (XHR.readyState == 4 && XHR.status == 200) {
                    var data = XHR.response;
                    //console.log(data);
                    this.getView().getModel("goods").setData(JSON.parse(data));

                }

            }.bind(this);

        },
        onSave: function(){
            //var oData = this.oDataModel.getData();

            this.getApp().setBusy(true);
            jQuery.ajax({
                type: "POST",
                url: this.host + "/goods",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(oData),
                success: function(data){
                    sap.m.MessageBox.success("Good Created");
                    this.oDataModel.setData(data);
                    this.getApp().setBusy(false);
                }.bind(this),
                error: function(oError){
                    this.getApp().setBusy(false);
                    jQuery.sap.log.error(oError);
                    sap.m.MessageBox.error("Creating failed");
                }.bind(this)
            });
        },
        onCancel: function(){
            this.oDataModel.setData();
        }
    });
});
