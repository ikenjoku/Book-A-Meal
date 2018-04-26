import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockRes, mockReq } from 'sinon-express-mock';

import MealsController from '../../../controllers/meals';
import Meals from '../../../model-mocks/meals';

chai.use(sinonChai);


const request = {
  body:{
    name: 'Indain Japatti',
    description: 'Creamy spicy hot',
    img: 'hhtp://assa.sdsddd',
  },
  params: {
    mealId: 1,
  },
};

const badRequest = {
  body: {
    name: 'Indain Japatti',
    description: 'Creamy spicy hot',
    img: 'hhtp://assa.sdsddd',
  },
  params: {
    mealId: 15,
  },
};

const req = mockReq(request);
const res = mockRes();

describe('updateMeal method', () => {
  beforeEach(() => {
    MealsController.updateMeal(req, res);
  });

  it('should return 200 on success', () => {
    res.status.should.have.been.calledWith(200);
  });

  it('should return 404 if no meal with specified mealId', () => {
    const wrongReq = mockReq(badRequest);
    MealsController.updateMeal(wrongReq, res);
    res.status.should.have.been.calledWith(404);
  });

  it('should return error message if no meal with specified mealId', () => {
    const wrongReq1 = mockReq(badRequest);
    MealsController.updateMeal(wrongReq1, res);
    res.send.should.have.been.calledWith({
      message: 'Meal Not Found',
    });
  });
});
