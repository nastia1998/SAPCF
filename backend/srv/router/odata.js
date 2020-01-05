/*eslint no-unused-vars: 0, no-undef:0, no-process-exit:0, new-cap:0*/
/*eslint-env node, es6 */
"use strict";

const dbClass = require(global.__base + "utils/dbClass");
const hdbext = require("@sap/hdbext");

const addWhereClause = (req, aWhere) => {
    req.query.SELECT.where = req.query.SELECT.where ?
        req.query.SELECT.where.concat(["and"]).concat(aWhere) :
        aWhere;

};
const getCompanyClause = sCompany => [{ref: ["mandt"]}, "=", {val: sCompany}];
const getLangClause = sLang => [{ref: ["lang"]}, "=", {val: sLang}];

module.exports = function () {
    this.before("READ", req => {
        req.log.debug(`BEFORE_READ ${req.target["@Common.Label"]}`);

        //restrict by mandt
        // addWhereClause(req, getCompanyClause("LeverX"));

        //restrict by lang
        // addWhereClause(req, getLangClause("EN"));
    });

    this.after("READ", "Good", (entity) => {
        if (entity.length > 0) {
            entity.forEach(item => item.name ="");
        }
    })

};
