import {createStore, combineReducers} from 'redux'
import userReducer from './reducers/user';
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistReducer, persistStore} from 'redux-persist' //++
import {AsyncStorage} from 'react-native' //++

const rootReducer = combineReducers({
  user: userReducer,
});

// persistの設定
const persistConfig = {
  key:'root',
  storage: AsyncStorage, //保存する場所
  whitelist:['user'] //保存したいデータ、ツリーを指定
}

//persistReducerの初期化
const persistedReducer = persistReducer(persistConfig, rootReducer)
//rootReducer → persistedReducerに変更
const store = createStore(persistedReducer, composeWithDevTools); 

export default store;
export const persistor = persistStore(store) //persistorをエクスポート