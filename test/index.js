import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;

const requireAll = r => r.keys().forEach(r);
requireAll(require.context('./src/', true, /\.spec\.js$/));
requireAll(require.context('../src/', true, /\.js$/));
