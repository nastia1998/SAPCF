//MOCK service
module.exports = (srv) => {

    srv.on('READ', 'Users', () => [
        {
            usid: 'U001', name: "Batman",
            toCars: [
                {crid: "C001", usid: "U001", name: "BatMobile", toUser: {usid: 'U001', name: "Batman"}}
            ],
            toAddress: [
                { adid: "A001", usid: "U001", city: "Gotam", strt: "unknown" }
            ]
        }
    ]);

    srv.on('READ', 'Address', () => [
        { adid: "A001", usid: "U001", city: "Gotam", strt: "unknown" }
    ]);

    srv.on('READ', 'Cars', () => [
        {crid: "C001", usid: "U001", name: "BatMobil", toUser: {usid: 'U001', name: "Batman"}},
        {crid: "C002", usid: "U002", name: "New Car", toUser: {usid: "U001", name: "Batman"}}
    ]);

    srv.on('READ', 'Test', () => [
        {usid: "U001", name: "Testing data"}
    ]);

    srv.on('READ', 'Good', () => [
        {adid: "A001", usid: "U001", name: "Sofa", price: 4.08}
    ]);

};
