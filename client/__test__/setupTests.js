import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({
  adapter: new Adapter(),
});

const localStorage = {
  removeItem: jest.fn(),
};

global.localStorage = localStorage;
