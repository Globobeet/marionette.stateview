import { result } from 'underscore';
import bb from 'backbone';
import mn from 'backbone.marionette';

const StateView = mn.View.extend({
    _ensureElement() {
        this._initializeStateview();
        bb.View.prototype._ensureElement.call(this);
    },

    _initializeStateview() {
        // Create a model to hold the state
        this.state = new bb.Model(result(this, 'defaultState'));
    },

    initialize() {
        // Bind stateEvents result to the state model
        mn.bindEvents(this, this.state, result(this, 'stateEvents'));
    },

    defaultState: {},
    stateEvents: {},

    // Mix-in the state data
    serializeData(...args) {
        return {
            ...mn.View.prototype.serializeData.apply(this, args),
            _state: { ...this.state.attributes },
        };
    },
});

// Expose as Marionette.StateView
mn.StateView = StateView;

export default StateView;
