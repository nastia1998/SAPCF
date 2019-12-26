using Id from './User';

entity Good {
    key adid : Id;
    usid : String(4);
    name : String(100);
    price : Double
}