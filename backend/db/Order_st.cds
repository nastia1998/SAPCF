using Id from './Customer';
using Good from './Good';
using Customer from './Customer';

entity Order_st {
    key orid : Id;
    orderDate : DateTime;
    goid : Id;
    cuid : Id;

    toGood : association to one Good on toGood.goid = goid;
    toCustomer : association to one Customer on toCustomer.cuid = cuid;
}