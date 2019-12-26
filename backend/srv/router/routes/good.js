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
        logger.info('good get request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/good", req, res);

        try {
            tracer.exiting("/good", "Get goods");
            res.type("application/json").status(201).send(JSON.stringify({text: "Get Goods"}));
        } catch (e) {
            tracer.catching("/good", e);
            next(e);
        }
    });

};