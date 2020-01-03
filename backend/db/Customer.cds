using Id from './User';

entity Customer {
    key adid : Id;
    usid : String(4);
    name : String(100);
    telephone : String(50)
}