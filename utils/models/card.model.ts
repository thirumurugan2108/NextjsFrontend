export class Card {
    title: String;
    description: String;
    price: String;
    isEditMode?: Boolean = false;
    constructor( title:String, description:string,price:string){
        this.title = title;
        this.description = description;
        this.price = price;
    };
}