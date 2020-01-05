"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oCustomer, req) {
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
            oCustomer.customers = await db.executeUpdate(sSql);
            tracer.exiting("/customers", "customers GET works");
            res.type("application/json").status(200).send(JSON.stringify(oCustomer));
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
            const oCustomer = _prepareObject(req.body, req);
            oCustomer.cuid = await db.getNextval("cuid");
            const sSql = "INSERT INTO \"CUSTOMER\" VALUES(?,?,?)";
            const aValues = [ oCustomer.name, oCustomer.telephone, oCustomer.cuid ];
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/customers", "customers POST works");

            res.type("application/json").status(201).send(JSON.stringify(oCustomer));
        } catch (e) {
            next(e);
        }
    });

    app.put("/:cuid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('customers put request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/customers", req, res);

        try {
            const db = new dbClass(req.db);
            const cuid = req.params.cuid;
            const oCustomer = _prepareObject(req.body, req);
            const sSql = "UPDATE \"CUSTOMER\" SET \"NAME\" = ?, \"TELEPHONE\" = ? " +
                         "WHERE \"CUID\" = ? ";
            const aValues = [ oCustomer.name, oCustomer.telephone, cuid ];
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/customers", "customers PUT works");

            res.type("application/json").status(200).send(JSON.stringify(oCustomer));
        } catch (e) {
            next(e);
        }
    });

    app.delete("/:cuid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('customers delete request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/customers", req, res);

        try {
            const db = new dbClass(req.db);
            const cuid = req.params.cuid;
            const sSql = "DELETE FROM \"CUSTOMER\" WHERE \"CUID\" = ? ";
            const aValues = [ cuid ];
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/customers", "customers DELETE works");

            res.type("application/json").status(200).send();
        } catch (e) {
            next(e);
        }
    });

    return app;
};