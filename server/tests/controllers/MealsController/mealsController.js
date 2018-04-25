import chai from 'chai';
import indexController from '../../../controllers/index';
import MealsController from '../../../controllers/meals';

chai.should();

describe('Meal Controller', () => {
  it('should be a function', () => {
    MealsController.should.be.a('function');
  });
  it('should extend index controller', () => {
    const mealController = new MealsController();

    mealController.should.be.instanceOf(MealsController);
    mealController.should.be.instanceOf(indexController);
  });
});
