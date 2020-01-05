using Id from './Customer';

entity Good {
    key goid : Id;
    name : String(100);
    price : Double
}