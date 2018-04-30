import chai from 'chai';
import indexController from '../../controllers/index';

chai.should();

describe('Index Controller', () => {
  it('should be a function', () => {
    indexController.should.be.a('function');
  });
});
