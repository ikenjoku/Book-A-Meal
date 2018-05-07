import chai from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import MenuController from '../../controllers/menu';
import Menu from '../../model-mocks/menus';


chai.use(sinonChai);
chai.should();


describe('createMenu method', () => {
  const request = {
    body: {
      name: 'test',
      date: '16-09-2018',
      meals: [{
        id: 5,
        name: 'Utazi',
        description: 'Smoked fish with a belleful coke',
        price: 1450.40,
        imageurl: 'https://adadasdasd.com/coed',
      },
      {
        id: 6,
        name: 'Vegetable Rice',
        description: 'Healthy spicy hot veggie rice',
        price: 1200.00,
        imageurl: 'https://adadasdasd.com/coed',
      },
      ],
    },
  };
  const wrongRequest = {
    body: {
      name: 'Love Naija',
      meals: [{
        id: 5,
        name: 'Utazi',
        description: 'Smoked fish with a belleful coke',
        price: 1450.40,
        imageurl: 'https://adadasdasd.com/coed',
      },
      ],
    },
  };

  const req = mockReq(request);
  const res = mockRes();
  beforeEach(() => {
    MenuController.createMenu(req, res);
  });

  it('should create new menu data', () => {
    const newMenu = Menu.filter(menu => menu.name === 'test');
    newMenu.length.should.be.above(0);
  });

  it('should return 201 on success', () => {
		 res.status.should.have.been.calledWith(201);
  });

  it('should return status code 400 with missing menu data fields', () => {
    const badRequest = mockReq(wrongRequest);
    MenuController.createMenu(badRequest, res);
    res.status.should.have.been.calledWith(400);
  });

  it('sends an error message with missing data fields', () => {
    const badReq = mockReq(wrongRequest);
    MenuController.createMenu(badReq, res);
    res.send.should.have.been.calledWith({
      message: 'Missing Menu Information',
    });
  });
});


describe('listMenu method', () => {
  const request = {
    body: {
    },
  };

  const req = mockReq(request);
  const res = mockRes();
  beforeEach(() => {
    MenuController.listMenu(req, res);
  });

  it('should return status code 200 on success', () => {
		 res.status.should.have.been.calledWith(200);
  });
});
