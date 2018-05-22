module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Meals', [
      {
        name: 'Nigerian Jollof',
        description: 'Max Jollof rice, plantain, grilled turkey, bellefull Coke',
        price: 1100,
        imageurl: 'https://africa-public.food.jumia.com/dynamic/production/ng/images/products/80/80418_1465475724_ma.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rice and Beans',
        description: 'Rice, Beans, Plantain, Panla Sauce, Max Coke',
        price: 1500,
        imageurl: 'https://africa-public.food.jumia.com/dynamic/production/ng/images/products/80/80418_1465475724_ma.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Egusi Semo',
        description: 'Semolina, Egusi Soup, Meat, Extra',
        price: 1200,
        imageurl: 'https://africa-public.food.jumia.com/dynamic/production/ng/images/products/80/80418_1465475724_ma.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Meals', null, {});
  },
};
