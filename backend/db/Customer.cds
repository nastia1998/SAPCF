type Id : String(4);

entity Customer {
    key cuid : Id;
    name : String(100);
    telephone : String(50)
}