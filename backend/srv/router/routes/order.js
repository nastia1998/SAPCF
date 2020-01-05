"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oUser, req) {
    oUser.changedBy = "DebugUser";
    return oUser;
}

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('orders get request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/orders", req, res);

        try {
            tracer.exiting("/orders", "Get orders");
            res.type("application/json").status(201).send(JSON.stringify({text: "Get orders"}));
        } catch (e) {
            tracer.catching("/orders", e);
            next(e);
        }
    });
    return app;
};