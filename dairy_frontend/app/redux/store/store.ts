'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from '../slice/user.slice';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';
import contactReducer from '../slice/contact.slice'
import tagReducer from '../slice/tags.slice'
import userSearchReducer from '../slice/author.slice'
import myFeedbackReducer from '../slice/my.feedback.slice'
import loginReducer from '../slice/auth.slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','login'], 
};

const rootReducer = combineReducers({
  user: userReducer,
  contact:contactReducer,
  tags:tagReducer,
  author:userSearchReducer,
  myfeedback: myFeedbackReducer,
  login:loginReducer
});

  export type RootState = ReturnType<typeof rootReducer>;

  

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const makeStore = () => {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    const persistor = persistStore(store);

    return { store, persistor };
  };

  export type AppStore = ReturnType<typeof makeStore>['store'];
  export type AppDispatch = AppStore['dispatch'];