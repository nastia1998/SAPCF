using Good as _Good from '../db/Good';
using Customer as _Customer from '../db/Customer';
using Order_st as _Order from '../db/Order_st';

service odata {

  entity Good @(
      title: 'Good',
      Capabilities: {
          InsertRestrictions: {Insertable: false},
          UpdateRestrictions: {Updatable: false},
          DeleteRestrictions: {Deletable: false}
      }
  ) as projection on _Good;

  entity Customer @(
    title: 'Customer',
    Capabilities: {
        InsertRestrictions: {Insertable: false},
        UpdateRestrictions: {Updatable: false},
        DeleteRestrictions: {Deletable: false}
    }
  ) as projection on _Customer;

  entity Order @(
    title: 'Order',
    Capabilities: {
        InsertRestrictions: {Insertable: false},
        UpdateRestrictions: {Updatable: false},
        DeleteRestrictions: {Deletable: false}
    }
  ) as projection on _Order;
}