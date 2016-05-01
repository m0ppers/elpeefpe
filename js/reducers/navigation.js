import * as types from '../constants/winjsActionTypes.js';

let initialState = {
    location: WinJS.Navigation.location,
    state: WinJS.Navigation.state,
}

export default function navigation(state = initialState, action) {
    switch(action.type) {
        case types.NAV:
            return {
                location: action.location,
                state: action.state,
            }
            break;
    }
    return state;
}