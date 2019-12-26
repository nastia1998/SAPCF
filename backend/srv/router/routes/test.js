"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        let tracer = req.loggingContext.getTracer(__filename);
        tracer.entering("/test", req, res);

        try {
            tracer.exiting("/test", "Test Get works");
            res.type("application/json").status(201).send(JSON.stringify({text: "Test Get works"}));
        } catch (e) {
            tracer.catching("/test", e);
            next(e);
        }
    })
}