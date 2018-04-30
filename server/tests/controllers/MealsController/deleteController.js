import chai from 'chai';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';

import MealsController from '../../../controllers/meals';
import Meals from '../../../model-mocks/meals';

chai.use(sinonChai);
chai.should();

const request = {
  params: {
    mealId: 3,
  },
};

const wrongReq = {
  params: {
    mealId: 15,
  },
};

const req = mockReq(request);
const res = mockRes();

describe('destroyMeal method', () => {
  beforeEach(() => {
    MealsController.destroyMeal(req, res);
  });

  it('should return 204 0n success', () => {
    res.status.should.have.been.calledWith(204);
  });

  it('should delete meal with mealId in params', () => {
    const deletedMealIndex = Meals.findIndex(meal => meal.id === req.params.mealId);
    deletedMealIndex.should.be.below(0);
  });

  it('should return 404 if no meal with specified mealId', () => {
    const wrongRequest = mockReq(wrongReq);
    MealsController.destroyMeal(wrongRequest, res);
    res.status.should.have.been.calledWith(404);
  });

  it('should return error message if no meal with specified mealId', () => {
    const wrongRequest1 = mockReq(wrongReq);
    MealsController.destroyMeal(wrongRequest1, res);
    res.send.should.have.been.calledWith({
      message: 'Meal Not Found',
    });
  });

});