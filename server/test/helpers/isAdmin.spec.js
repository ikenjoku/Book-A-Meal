import chai from 'chai';
import sinon from 'sinon';
import { trimInputs } from '../../middlewares/validateInputs';

chai.should();

describe('trimpInputs function', () => {
  const req = {};
  const res = {};

  req.body = {
    name: '  Farrida      ',
    age: '',
    address: '14, Kentwood, oakland East',
  };

  it('should trim empty input fields and call the' +
    ' next middleware function', () => {
    const spyNext = sinon.spy();
    trimInputs(req, res, spyNext);

    req.body.should.have.property('name').eql('Farrida');
    spyNext.called.should.be.true;
  });
});

