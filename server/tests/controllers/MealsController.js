import chai from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import MealsController from '../../controllers/meals';
import Meals from '../../model-mocks/meals';


chai.use(sinonChai);
chai.should();


describe('createMeal method', () => {
  const request = {
    body: {
      name: 'Indain Japatti',
      description: 'Creamy spicy hot',
      price: 1500.00,
      img: 'hhtp://assa.sdsddd',
    },
  };

  const wrongRequest = {
    body: {
      name: 'Indain Japatti',
      description: 'Creamy spicy hot',
      imageurl: 'hhtp://assa.sdsddd',
    },
  };

  const req = mockReq(request);
  const res = mockRes();

  beforeEach(() => {
    MealsController.createMeal(req, res);
  });

  it('should create a new meal', () => {
    const newMeal = Meals.filter(meal => meal.name === 'Indain Japatti');
    newMeal.length.should.be.above(0);
  });

  it('should return status code 201 on success', () => {
    res.status.should.have.been.calledWith(201);
 });

  it('should return error 400 with missing meal data fields', () => {
    const badReq = mockReq(wrongRequest);
    MealsController.createMeal(badReq, res);
    res.status.should.have.been.calledWith(400);
  });

  it('sends an error message with missing data fields', () => {
    const badReq = mockReq(wrongRequest);
    MealsController.createMeal(badReq, res);
    res.send.should.have.been.calledWith({
      message: 'Missing Meal Information',
    });
  });
});


describe('listMeals method', () => {
  const request = {
    body: {
    },
  };

  const req = mockReq(request);
  const res = mockRes();

  beforeEach(() => {
    MealsController.listMeals(req, res);
  });


  it('should return 200 on success', () => {
		 res.status.should.have.been.calledWith(200);
  });
});


describe('removeMeal method', () => {
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
  beforeEach(() => {
    MealsController.removeMeal(req, res);
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
    MealsController.removeMeal(wrongRequest, res);
    res.status.should.have.been.calledWith(404);
  });

  it('should return error message if no meal with specified mealId', () => {
    const wrongRequest1 = mockReq(wrongReq);
    MealsController.removeMeal(wrongRequest1, res);
    res.send.should.have.been.calledWith({
      message: 'Meal Not Found',
    });
  });
});

describe('updateMeal method', () => {
  const request = {
    body: {
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
  beforeEach(() => {
    MealsController.updateMeal(req, res);
  });

  it('should return 200 on success', () => {
    res.status.should.have.been.calledWith(200);
  });

  it('should update meal with specified mealId', () => {
    MealsController.updateMeal(req, res);
    const updatedMealIndex = Meals.findIndex(meal => meal.name === req.body.name);
    updatedMealIndex.should.have.been.above(-1);
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
