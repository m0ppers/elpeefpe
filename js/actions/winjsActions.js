import { NAV } from '../constants/winjsActionTypes.js';

export function nav(location, state) {
    return {
        type: NAV,
        location,
        state
    }
}