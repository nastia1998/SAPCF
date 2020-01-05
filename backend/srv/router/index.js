"use strict";

module.exports = (app, server) => {
    app.use("/goods", require("./routes/good")());
    app.use("/customers", require("./routes/customer")());
    app.use("/orders", require("./routes/order")());
};
