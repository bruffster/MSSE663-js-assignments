// Source code here

/*
1 Create an interface that has 3 properties and 2 methods.

- all properties should be typed.
- one method should return boolean.
- one method should return an array of items of a custom type.
*/
export type Item = {
  itemId: number;
  itemName: string;
  itemQty: number;
}

export interface List {
  storeName: string;
  storeLocation: string;
  items: Item[];

  addItem: (item:Item) => boolean;
  getItems: () => Item[];
  listItems: () => void;
}

// 2 Create a class that implements that interface.
export class ShoppingList implements List {
  storeName: string;
  storeLocation: string;
  items: Item[];

  constructor(storeName:string, storeLocation:string, items:Item[]){
    this.storeName = storeName;
    this.storeLocation = storeLocation;
    this.items = items;
  }

  addItem(item:Item): boolean {
    let itemAdded = false;
    if(this.items.push(item)) {
      console.log(`\nAdding item: ${item.itemName} to the list.`)
      itemAdded = true;
    }
    return itemAdded;
  }

  getItems(): Item[] {
    console.log('\nItem Array:');
    console.log(this.items);
    return this.items;
  }

  listItems(): void {
    let arr: Item[] = this.getItems();
    let count = 1;
    console.log(`\nShopping List for ${this.storeName} in ${this.storeLocation}\n`)
    for(let i of arr) {
      console.log(`Item #: ${count} - ItemId: ${i.itemId} - ItemName: ${i.itemName} - ItemQty: ${i.itemQty}`)
      count++;
    }
  }
}

// 3 Make a new instance of your class that calls your methods and outputs a result.
let arr: Item[] = [];
let circuitCity = new ShoppingList('Circuit City', 'Winchester, Virginia', arr);

circuitCity.addItem({"itemId":1,"itemName":'ASUS ROG Strix TRX40-E Gaming',"itemQty":1});
circuitCity.addItem({"itemId":1337,"itemName":'GeForce RTX 3090',"itemQty":2});
circuitCity.addItem({"itemId":123,"itemName":'AMD Ryzen Threadripper 3990X',"itemQty":1});
circuitCity.listItems();