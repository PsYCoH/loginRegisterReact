import errorReducer from './errorReducer';
import authReducer from './authReducer';

// Combine Reducers
export const initialState = {
    error: errorReducer,
    auth: authReducer
}