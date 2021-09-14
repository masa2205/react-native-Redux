import {createStore, combineReducers} from 'redux' // 各reducerを呼び出して初期状態を取り出す。初期状態をまとめて初期状態ツリーを作る。reducerの処理をまとめたcombination関数を返す。
import userReducer from './reducers/user';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
