import { result } from 'underscore';
import { Model } from 'backbone';
import mn, { View, bindEvents } from 'backbone.marionette';

const StateView = View.extend({
    constructor({ state = {}, ...options } = {}, ...args) {
        const isModel = state instanceof Model;
        const stateModel = isModel ? state : new Model();
        const initialState = {
            ...result(this, 'defaultState'),
            ...(isModel ? state.attributes : state),
        };

        // Attach model for managing state
        this.state = stateModel.set(initialState);

        // Bind stateEvents result to the state model
        bindEvents(this, this.state, result(this, 'stateEvents'));

        // Call original constructor
        return View.prototype.constructor.apply(this, [options, ...args]);
    },

    defaultState: {},
    stateEvents: {},

    // Mix-in the state data
    serializeData(...args) {
        return {
            ...View.prototype.serializeData.apply(this, args),
            _state: { ...this.state.attributes },
        };
    },
});

// Expose as Marionette.StateView
mn.StateView = StateView;

export default StateView;
