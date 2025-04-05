import {configureStore} from '@reduxjs/toolkit';

import { getAllReducer } from './Reducers';

export const store = configureStore({
  reducer:{data:getAllReducer}
})


