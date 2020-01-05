"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oCustomer, req) {
    // oUser.changedBy = "DebugUser";
    return oCustomer;
}

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('customers get request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/customers", req, res);

        try {
            const db = new dbClass(req.db);
            const oCustomer = _prepareObject(req.body, req);
            const sSql = "SELECT * FROM \"CUSTOMER\"";
            //const customers = await db.executeQuery(sSql, []);
            oCustomer.customers = await db.executeUpdate(sSql);
            tracer.exiting("/customers", "customers GET works");
            res.type("application/json").status(201).send(JSON.stringify(oCustomer));
        } catch (e) {
            tracer.catching("/customers", e);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {

        const logger = req.loggingContext.getLogger("/Application");
        logger.info('customers post request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/customers", req, res);

        try {
            const db = new dbClass(req.db);
            logger.info('create db instance');
            const oCustomer = _prepareObject(req.body, req);
            logger.info('create oCustomer instance');
            oCustomer.cuid = await db.getNextval("cuid");
            const sSql = "INSERT INTO \"CUSTOMER\" VALUES(?,?,?)";
            const aValues = [ oCustomer.name, oCustomer.telephone, oCustomer.cuid ];

            console.log(aValues);
            console.log(sSql);
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/customers", "customers POST works");

            res.type("application/json").status(201).send(JSON.stringify(oCustomer));
        } catch (e) {
            next(e);
        }
    });

    return app;
};