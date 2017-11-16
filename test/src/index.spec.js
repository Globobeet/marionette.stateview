import bb from 'backbone';
import mn from 'backbone.marionette';
import StateView from '../../src/index';

describe('StateView', () => {
    it('should be exposed as mn.StateView', () => {
        expect(mn.StateView).to.be.ok;
        expect(mn.StateView).to.deep.equal(StateView);
    });

    it('should expose the state model to the view', () => {
        const view = new StateView();
        expect(view.state).to.be.an.instanceOf(bb.Model);
        expect(view.state.toJSON()).to.deep.equal({});

        view.state.set({
            foo: 'foobar',
            baz: 'buz',
        });

        expect(view.state.toJSON()).to.deep.equal({
            foo: 'foobar',
            baz: 'buz',
        });
    });

    it('should load with initial state', () => {
        const TestView = StateView.extend({
            defaultState: {
                foo: 'foobar',
            },
        });

        const view = new TestView();
        expect(view.state.get('foo')).to.equal('foobar');
    });

    it('should add state data to serialized data (view.serializeData)', () => {
        sinon.stub(mn.View.prototype, 'serializeData').returns({ foo: 'foobar' });

        const view = new StateView();
        view.state.set('foo', 'bazbuz');

        expect(view.serializeData()).to.deep.equal({
            foo: 'foobar',
            _state: {
                foo: 'bazbuz',
            },
        });

        mn.View.prototype.serializeData.restore();
    });

    it('should bind to events on the state model', () => {
        const spy = sinon.spy();
        const TestView = mn.StateView.extend({
            stateEvents: {
                'change:foo': 'testFn',
            },

            testFn() { spy(); },
        });

        const view = new TestView();
        sinon.spy(view, 'testFn');

        view.state.set('baz', 'buz');
        expect(spy).to.not.have.been.called;

        view.state.set('foo', 'foobar');
        expect(spy).to.have.been.calledOnce;
    });

    it('should accept state passed in as a plain object', () => {
        const TestView = StateView.extend({
            defaultState: {
                foo: 'initial-foo',
                bar: 'initial-bar',
            },
        });

        const view = new TestView({
            state: {
                foo: 'foo-value',
                zed: 'zed-value',
            },
        });

        expect(view.state.toJSON()).to.deep.equal({
            foo: 'foo-value',
            bar: 'initial-bar',
            zed: 'zed-value',
        });
    });

    it('should use the passed-in state model', () => {
        const TestView = StateView.extend({
            defaultState: {
                foo: 'initial-foo',
                bar: 'initial-bar',
            },
        });

        const stateModel = new bb.Model({
            foo: 'foo-value',
            zed: 'zed-value',
        });

        const view = new TestView({ state: stateModel });

        expect(view.state.toJSON()).to.deep.equal({
            foo: 'foo-value',
            bar: 'initial-bar',
            zed: 'zed-value',
        });

        expect(view.state).to.deep.equal(stateModel);
    });
});
