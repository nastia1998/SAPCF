"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oOrder, req) {
    return oOrder;
}

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('orders get request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/orders", req, res);

        try {
            const db = new dbClass(req.db);
            const oOrder = _prepareObject(req.body, req);
            const sSql = "SELECT * FROM \"ORDER_ST\"";
            oOrder.orders = await db.executeUpdate(sSql);
            tracer.exiting("/orders", "orders GET works");
            res.type("application/json").status(200).send(JSON.stringify(oOrder));
        } catch (e) {
            tracer.catching("/orders", e);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {

        const logger = req.loggingContext.getLogger("/Application");
        logger.info('orders post request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/orders", req, res);

        try {
            const db = new dbClass(req.db);
            const oOrder = _prepareObject(req.body, req);
            oOrder.orid = await db.getNextval("orid");
            const sSql = "INSERT INTO \"ORDER_ST\" VALUES(?,?,?,?)";
            const aValues = [ oOrder.orid, oOrder.orderdate, oOrder.goid, oOrder.cuid ];
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/orders", "orders POST works");

            res.type("application/json").status(201).send(JSON.stringify(oOrder));
        } catch (e) {
            next(e);
        }
    });

    app.put("/:orid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('orders put request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/orders", req, res);

        try {
            const db = new dbClass(req.db);
            const orid = req.params.orid;
            const oOrder = _prepareObject(req.body, req);
            const sSql = "UPDATE \"ORDER_ST\" SET \"ORDERDATE\" = ?, \"GOID\" = ?, \"CUID\" = ? " +
                "WHERE \"ORID\" = ? ";
            const aValues = [ oOrder.orderdate, oOrder.goid, oOrder.cuid, orid ];
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/orders", "orders PUT works");

            res.type("application/json").status(200).send(JSON.stringify(oOrder));
        } catch (e) {
            next(e);
        }
    });

    app.delete("/:orid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('orders delete request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/orders", req, res);

        try {
            const db = new dbClass(req.db);
            const orid = req.params.orid;
            const sSql = "DELETE FROM \"ORDER_ST\" WHERE \"ORID\" = ? ";
            const aValues = [ orid ];
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/orders", "orders DELETE works");

            res.type("application/json").status(200).send();
        } catch (e) {
            next(e);
        }
    });
    return app;
};