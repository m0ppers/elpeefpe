import windowsPersistence from './windows.js';
import reactNativePersistence from './react-native.js';

export default function persistenceFactory() {
    return reactNativePersistence;
    if (typeof WinJSaaa !== undefined) {
        return windowsPersistence;    
    } else {
        
    }
}