import { trimInputs } from "../../middlewares/validateInputs";

import chai from 'chai';
import sinon from 'sinon';
chai.should();

describe('trimpInputs function', () => {
    let req = {};
    let res= {};

    req.body = {
      name: 'Farrida',
      age: '',
      address: '14, Kentwood, oakland East'
    };

    it('should trim empty input fields and call the'       + 
    ' next middleware function', () => {
      const spyNext = sinon.spy();
      trimInputs(req, res, spyNext);

      req.body.should.not.have.property('age')
      spyNext.called.should.be.true;
    });
});


