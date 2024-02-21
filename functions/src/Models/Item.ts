export interface Item {
    id: string,
    name: string,
    price: string,
    is_veg: string
}

export class ItemModel{
    private items:Array<Item>;
    
    constructor(items:Array<Item>){
       this.items = items; 
    }

    getItems(){
        return this.items
    }

    classToDocument(){
       var documentList: Item[] = [];
       this.items.forEach((item)=>{
           documentList.push({
               id : item.id,
               name : item.name,
               price : item.price,
               is_veg : item.is_veg,
           }) 
       })
       return documentList;
    }
}