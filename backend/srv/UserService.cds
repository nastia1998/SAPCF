using User as _User from '../db/User';
using Address as _Address from '../db/ExtraInfo';
using Cars as _Cars from '../db/ExtraInfo';
using Test as _Test from '../db/Test';
using Good as _Good from '../db/Good';

service odata {

  entity Users @(
		title: 'Users',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _User;

  entity Address @(
		title: 'Address',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Address;

    entity Cars @(
		title: 'Cars',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Cars;

     entity Test @(
            title: 'Test',
            Capabilities: {
                InsertRestrictions: {Insertable: false},
                UpdateRestrictions: {Updatable: false},
                DeleteRestrictions: {Deletable: false}
            }
     ) as projection on _Test;

      entity Good @(
    		title: 'Good',
    		Capabilities: {
    			InsertRestrictions: {Insertable: false},
    			UpdateRestrictions: {Updatable: false},
    			DeleteRestrictions: {Deletable: false}
    		}
    	) as projection on _Good;

}