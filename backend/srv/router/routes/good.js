"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");


function _prepareObject(oGood, req) {
    return oGood;
}

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('goods get request');
        console.log('odata1');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/goods", req, res);

        try {
            const db = new dbClass(req.db);
            let oGood = _prepareObject(req.body, req);
            const sSql = "SELECT * FROM \"GOOD\"";
            oGood = await db.executeUpdate(sSql);
            tracer.exiting("/goods", "goods GET works");
            console.log('odata');
            //res.set("Access-Control-Expose-Header","OData-Version");
            //res.set('OData-Version', '4.0');
            console.log(res.getHeaders());
            res.type("application/json").status(200).send(JSON.stringify(oGood));
        } catch (e) {
            tracer.catching("/goods", e);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {

        const logger = req.loggingContext.getLogger("/Application");
        logger.info('goods post request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/goods", req, res);

        try {
            const db = new dbClass(req.db);
            const oGood = _prepareObject(req.body, req);
            oGood.goid = await db.getNextval("goid");
            const sSql = "INSERT INTO \"GOOD\" VALUES(?,?,?)";
            const aValues = [ oGood.name, oGood.price, oGood.goid ];
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/goods", "goods POST works");

            res.type("application/json").status(201).send(JSON.stringify(oGood));
        } catch (e) {
            next(e);
        }
    });

    app.put("/:goid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('goods put request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/goods", req, res);

        try {
            const db = new dbClass(req.db);
            const goid = req.params.goid;
            const oGood = _prepareObject(req.body, req);
            const sSql = "UPDATE \"GOOD\" SET \"NAME\" = ?, \"PRICE\" = ? " +
                "WHERE \"GOID\" = ? ";
            const aValues = [ oGood.name, oGood.price, goid ];
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/goods", "goods PUT works");

            res.type("application/json").status(200).send(JSON.stringify(oGood));
        } catch (e) {
            next(e);
        }
    });

    app.delete("/:goid", async (req, res, next) => {
        const logger = req.loggingContext.getLogger("/Application");
        logger.info('goods delete request');
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/goods", req, res);

        try {
            const db = new dbClass(req.db);
            const goid = req.params.goid;
            const sSql = "DELETE FROM \"GOOD\" WHERE \"GOID\" = ? ";
            const aValues = [ goid ];
            await db.executeUpdate(sSql, aValues);
            tracer.exiting("/goods", "goods DELETE works");

            res.type("application/json").status(200).send();
        } catch (e) {
            next(e);
        }
    });
    return app;
};