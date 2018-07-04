module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Meals', [
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
    {
      name: 'Green Calulu',
      description: 'Chicken salad with extra cabbage',
      price: 1250,
      imageurl: 'https://dynamic/production/ng/images/products/80/_ma.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Onion Jappatti',
      description: 'Ingera palate with raw meat sauce',
      price: 2200,
      imageurl: 'https://dynamic/production/ng/images/produc475724_ma.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Meals', null, {}),
};
