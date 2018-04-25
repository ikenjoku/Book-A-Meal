import chai from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import MealsController from '../../../controllers/meals';


chai.use(sinonChai);
chai.should();

const request = {
  body: {
    name: 'Indain Japatti',
    description: 'Creamy spicy hot',
    price: 1500.00,
    img: 'hhtp://assa.sdsddd',
  },
};

const badRequest = {
  body: {
    name: 'Indain Japatti',
    description: 'Creamy spicy hot',
    img: 'hhtp://assa.sdsddd',
  },
};

const req = mockReq(request);
const res = mockRes();

describe('createMeal method', () => {
  beforeEach(() => {
    MealsController.createMeal(req, res);
  });

  it('should return 201 on success', () => {
		 res.status.should.have.been.calledWith(201);
  });

  it('should return error 400 with missing meal data fields', () => {
    const badReq = mockReq(badRequest);
    MealsController.createMeal(badReq, res);
    res.status.should.have.been.calledWith(400);
  });

  it('sends an error message with missing data fields', () => {
    const badReq = mockReq(badRequest);
    MealsController.createMeal(badReq, res);
    res.send.should.have.been.calledWith({
      message: 'Missing Meal Information',
    });
  });
});