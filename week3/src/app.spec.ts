import { expect } from 'chai';
import 'mocha';
import { Item, ShoppingList } from './app';


describe('Tests for app.ts', () => {
  let arr: Item[] = [];
  let circuitCity = new ShoppingList('Circuit City', 'Winchester, Virginia', arr);
  it('should equal store name of the ShoppingList', () => { 
    expect(circuitCity.storeName).to.equal("Circuit City");
  });

  
  it('should match the properties of the item added', () => {
    circuitCity.addItem({"itemId":1337,"itemName":'GeForce RTX 3090',"itemQty":2});

    expect(circuitCity.items[0].itemId).to.equal(1337);
    expect(circuitCity.items[0].itemName).to.equal('GeForce RTX 3090');
    expect(circuitCity.items[0].itemQty).to.equal(2);
  });

  it('should equal true when item added', () => {
    var itemAdd = circuitCity.addItem({"itemId":123,"itemName":'AMD Ryzen Threadripper 3990X',"itemQty":1});

    expect(itemAdd).to.equal(true);
  });
});