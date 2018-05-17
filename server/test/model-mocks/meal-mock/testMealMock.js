import chai from 'chai';
import meals from '../../../model-mocks/meals';

chai.should();

describe('Meal mock data', () => {
  it('should return an array', () => {
    meals.should.be.an('array');
  });

  it('should contain meals', () => {
    const sampleMeal = {
      id: 2,
      name: 'Extra Turkey',
      description: 'Honey turkey masked with cinnamon',
      price: 1400.00,
      imageurl: 'https://adadasdasd.com/coed',
    };
    meals[1].should.deep.equal(sampleMeal);
  });
});
