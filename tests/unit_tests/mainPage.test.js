const mainPageFunctions = require('../../public/javascripts/mainPage');

describe('Test filter products function', () => {
  it('Filter by brand -(Valid)', () => {
    const products = [
      {
        id: 1,
        name: 'Milk',
        picture: 'https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg',
        price: 5,
        category: 'dairy',
        quantity: 0,
        brand: 'Tnuva',
        description: '1.5 liter milk bottle',
      },
      {
        id: 2,
        name: 'Sausage',
        picture: 'https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg',
        price: 15,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Four sausages in a box',
      },
      {
        id: 3,
        name: 'Popcorn',
        picture: 'https://images.heb.com/is/image/HEBGrocery/001907864',
        price: 10,
        category: 'other',
        quantity: 0,
        brand: 'Osem',
        description: 'microwave preparation 300g',
      },
      {
        id: 4,
        name: 'Hamburger',
        picture: 'https://www.kroger.com/product/images/xlarge/front/0001111000917',
        price: 50,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Eight frozen beef burgers',
      },
    ];

    // eslint-disable-next-line no-undef
    expected = [
      {
        id: 2,
        name: 'Sausage',
        picture: 'https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg',
        price: 15,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Four sausages in a box',
      },
      {
        id: 4,
        name: 'Hamburger',
        picture: 'https://www.kroger.com/product/images/xlarge/front/0001111000917',
        price: 50,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Eight frozen beef burgers',
      },
    ];
    const result = mainPageFunctions.filterProducts(products, 'brand', 'zog');
    // eslint-disable-next-line no-undef
    expect(result).toStrictEqual(expected);
  });

  it('Filter by brand -(Invalid)', () => {
    const products = [
      {
        id: 1,
        name: 'Milk',
        picture: 'https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg',
        price: 5,
        category: 'dairy',
        quantity: 2,
        brand: 'Tnuva',
        description: '1.5 liter milk bottle',
      },
      {
        id: 2,
        name: 'Sausage',
        picture: 'https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg',
        price: 15,
        category: 'meat',
        quantity: 5,
        brand: 'Zoglovek',
        description: 'Four sausages in a box',
      },
      {
        id: 3,
        name: 'Popcorn',
        picture: 'https://images.heb.com/is/image/HEBGrocery/001907864',
        price: 10,
        category: 'other',
        quantity: 7,
        brand: 'Osem',
        description: 'microwave preparation 300g',
      },
      {
        id: 4,
        name: 'Hamburger',
        picture: 'https://www.kroger.com/product/images/xlarge/front/0001111000917',
        price: 50,
        category: 'meat',
        quantity: 8,
        brand: 'Zoglovek',
        description: 'Eight frozen beef burgers',
      },
    ];
    const result = mainPageFunctions.filterProducts(products, 'brand', 'BMW');
    expect(result).toStrictEqual([]);
  });

  it('Filter by category -(Valid)', () => {
    const products = [
      {
        id: 1,
        name: 'Milk',
        picture: 'https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg',
        price: 5,
        category: 'dairy',
        quantity: 0,
        brand: 'Tnuva',
        description: '1.5 liter milk bottle',
      },
      {
        id: 2,
        name: 'Sausage',
        picture: 'https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg',
        price: 15,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Four sausages in a box',
      },
      {
        id: 3,
        name: 'Popcorn',
        picture: 'https://images.heb.com/is/image/HEBGrocery/001907864',
        price: 10,
        category: 'other',
        quantity: 0,
        brand: 'Osem',
        description: 'microwave preparation 300g',
      },
      {
        id: 4,
        name: 'Hamburger',
        picture: 'https://www.kroger.com/product/images/xlarge/front/0001111000917',
        price: 50,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Eight frozen beef burgers',
      },
    ];

    // eslint-disable-next-line no-undef
    expected = [
      {
        id: 1,
        name: 'Milk',
        picture: 'https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg',
        price: 5,
        category: 'dairy',
        quantity: 0,
        brand: 'Tnuva',
        description: '1.5 liter milk bottle',
      },
    ];
    const result = mainPageFunctions.filterProducts(products, 'category', 'dairy');
    // eslint-disable-next-line no-undef
    expect(result).toStrictEqual(expected);
  });

  it('Filter by category -(Invalid)', () => {
    const products = [
      {
        id: 1,
        name: 'Milk',
        picture: 'https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg',
        price: 5,
        category: 'dairy',
        quantity: 2,
        brand: 'Tnuva',
        description: '1.5 liter milk bottle',
      },
      {
        id: 2,
        name: 'Sausage',
        picture: 'https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg',
        price: 15,
        category: 'meat',
        quantity: 5,
        brand: 'Zoglovek',
        description: 'Four sausages in a box',
      },
      {
        id: 3,
        name: 'Popcorn',
        picture: 'https://images.heb.com/is/image/HEBGrocery/001907864',
        price: 10,
        category: 'other',
        quantity: 7,
        brand: 'Osem',
        description: 'microwave preparation 300g',
      },
      {
        id: 4,
        name: 'Hamburger',
        picture: 'https://www.kroger.com/product/images/xlarge/front/0001111000917',
        price: 50,
        category: 'meat',
        quantity: 8,
        brand: 'Zoglovek',
        description: 'Eight frozen beef burgers',
      },
    ];
    const result = mainPageFunctions.filterProducts(products, 'category', 'popcorn');
    expect(result).toStrictEqual([]);
  });
});

describe('Test find index by ID if the product', () => {
  it('Find index of the product - (Valid Test)', () => {
    const products = [
      {
        id: 1,
        name: 'Milk',
        picture: 'https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg',
        price: 5,
        category: 'dairy',
        quantity: 0,
        brand: 'Tnuva',
        description: '1.5 liter milk bottle',
      },
      {
        id: 2,
        name: 'Sausage',
        picture: 'https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg',
        price: 15,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Four sausages in a box',
      },
      {
        id: 3,
        name: 'Popcorn',
        picture: 'https://images.heb.com/is/image/HEBGrocery/001907864',
        price: 10,
        category: 'other',
        quantity: 0,
        brand: 'Osem',
        description: 'microwave preparation 300g',
      },
      {
        id: 4,
        name: 'Hamburger',
        picture: 'https://www.kroger.com/product/images/xlarge/front/0001111000917',
        price: 50,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Eight frozen beef burgers',
      },
    ];
    const result = mainPageFunctions.findIndexProducdID(products, 1);
    expect(result).toBe(0);
  });

  it('Find index of the product - (Invalid Test)', () => {
    const products = [
      {
        id: 1,
        name: 'Milk',
        picture: 'https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg',
        price: 5,
        category: 'dairy',
        quantity: 2,
        brand: 'Tnuva',
        description: '1.5 liter milk bottle',
      },
      {
        id: 2,
        name: 'Sausage',
        picture: 'https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg',
        price: 15,
        category: 'meat',
        quantity: 5,
        brand: 'Zoglovek',
        description: 'Four sausages in a box',
      },
      {
        id: 3,
        name: 'Popcorn',
        picture: 'https://images.heb.com/is/image/HEBGrocery/001907864',
        price: 10,
        category: 'other',
        quantity: 7,
        brand: 'Osem',
        description: 'microwave preparation 300g',
      },
      {
        id: 4,
        name: 'Hamburger',
        picture: 'https://www.kroger.com/product/images/xlarge/front/0001111000917',
        price: 50,
        category: 'meat',
        quantity: 8,
        brand: 'Zoglovek',
        description: 'Eight frozen beef burgers',
      },
    ];
    const result = mainPageFunctions.findIndexProducdID(products, 7);
    expect(result).toBe(-1);
  });
});

describe('Test available products function', () => {
  it('No available products (Invalid)', () => {
    const products = [
      {
        id: 1,
        name: 'Milk',
        picture: 'https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg',
        price: 5,
        category: 'dairy',
        quantity: 0,
        brand: 'Tnuva',
        description: '1.5 liter milk bottle',
      },
      {
        id: 2,
        name: 'Sausage',
        picture: 'https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg',
        price: 15,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Four sausages in a box',
      },
      {
        id: 3,
        name: 'Popcorn',
        picture: 'https://images.heb.com/is/image/HEBGrocery/001907864',
        price: 10,
        category: 'other',
        quantity: 0,
        brand: 'Osem',
        description: 'microwave preparation 300g',
      },
      {
        id: 4,
        name: 'Hamburger',
        picture: 'https://www.kroger.com/product/images/xlarge/front/0001111000917',
        price: 50,
        category: 'meat',
        quantity: 0,
        brand: 'Zoglovek',
        description: 'Eight frozen beef burgers',
      },
    ];
    const result = mainPageFunctions.getAvailableProducts(products);
    expect(result).toStrictEqual([]);
  });

  it('All products are available- (Valid)', () => {
    const products = [
      {
        id: 1,
        name: 'Milk',
        picture: 'https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg',
        price: 5,
        category: 'dairy',
        quantity: 2,
        brand: 'Tnuva',
        description: '1.5 liter milk bottle',
      },
      {
        id: 2,
        name: 'Sausage',
        picture: 'https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg',
        price: 15,
        category: 'meat',
        quantity: 5,
        brand: 'Zoglovek',
        description: 'Four sausages in a box',
      },
      {
        id: 3,
        name: 'Popcorn',
        picture: 'https://images.heb.com/is/image/HEBGrocery/001907864',
        price: 10,
        category: 'other',
        quantity: 7,
        brand: 'Osem',
        description: 'microwave preparation 300g',
      },
      {
        id: 4,
        name: 'Hamburger',
        picture: 'https://www.kroger.com/product/images/xlarge/front/0001111000917',
        price: 50,
        category: 'meat',
        quantity: 8,
        brand: 'Zoglovek',
        description: 'Eight frozen beef burgers',
      },
    ];
    const result = mainPageFunctions.getAvailableProducts(products);
    expect(result).toStrictEqual(products);
  });
});
