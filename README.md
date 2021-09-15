# react-native-Redux
- [react-native-Redux](#react-native-redux)
- [Reduxのインストール](#reduxのインストール)
- [ディレクトリ構成](#ディレクトリ構成)
- [Actionの実装](#actionの実装)
- [Reducerの実装](#reducerの実装)
- [Storeの実装](#storeの実装)
- [デバッガーのインストール](#デバッガーのインストール)
- [ActionのDispatch](#actionのdispatch)
- [Reduxを永続化して端末に保存する](#reduxを永続化して端末に保存する)

<br>

---
# Reduxのインストール

必要なパッケージ
- redux
- react-redux

```
$ npm install redux react-redux
```

<br>

---
# ディレクトリ構成
```
.
├── App.js
├── components
│     └── IncrementButton.js
└── store
      ├── index.js
      ├── actions
      │     └──user.js
      └── reducers
            └──user.js
```

<br>

---
# Actionの実装

今回追加するAction
- PlUS_ONE(Stateの数字を+1させる)
- MINUS_ONE(Stateの数字を-1させる)

Actionの枠組みはほとんど決まっているので、沿って実装

```js:actions/user.js
// Actionの枠組みはほとんど決まっている

// stateの数字を+1させるtype
export const plusOne = () => {
  return {
    type: 'PlUS_ONE', //Actionの種類を識別、文字列で定義
    //payload
  };
};

// Stateの数字を-1させるtype
export const minusOne = () => {
  return {
    type: 'MINUS_ONE',
    //payload
  };
};
```

Actionはこれで完成。このActionが後ほどReducerで使われる。

<br>

---
# Reducerの実装
前回のState(Old State)とActionを受け取って、新しいState(New State)をリターンする関数。

```js:reducers/user.js
// Actionの中身をさらに具体化
//reducerは純粋な関数なので枠組みはほとんど決まっている

const reducer = (state = 0, action) => { 
//reducerの引数はoldStateとaction、stateには初期値を代入する
// actionのtypeごとに処理を分けて書く
  switch (action.type) {
    case 'PlUS_ONE':
      return state + 1;  // stateの数字を+1させる
    case 'MINUS_ONE':
      return state - 1;  // Stateの数字を-1させる
    default:
      return state; // 上記以外のtypeが渡ってきた場合は既存のoldStateを返す
  }
}

export default reducer;
```

<br>

---
# Storeの実装
Stateを一元管理するファイル。すごく巨大なJSONツリーのようなイメージ。
<br>
今回作成するツリーのイメージ。

```
//storeの中にuserがあり、userの中にstateを保持している
store ──┬── user ──── state 
        │
        ├── ...
        │
        ├── ...
        │
        └── ...
// 今回は情報が少ないが、他のデータが入ってきた場合、ツリー形式で情報が並ぶ形
```

```js:index.js
// combineReducers → ツリー構造を作成する
// createStore → Storeを生成

import {createStore, combineReducers} from 'redux' 

// 各reducerを呼び出して初期状態を取り出す。初期状態をまとめて初期状態ツリーを作る。reducerの処理をまとめたcombination関数を返す。

import userReducer from './reducers/user';

// ツリー構造を定義
const rootReducer = combineReducers({
  user: userReducer, //ツリー構造の中に配置したい情報
});

// rootReducerを定義
const store = createStore(rootReducer);

export default store;

```

Storeの実装は終了。
<br>
App.jsを改修してstoreを使用できるようにする。

```js:Appjs
import React from 'react';
import { Provider } from 'react-redux'; //Storeを全てのコンポーネントから参照できるようにする仕組み
import store from './store/' 
import IncrementButton from './src/components/IncrementButton';

export default App = () => {

  return(
      //propsにstoreを渡す
      <Provider store={store}>  
        <IncrementButton />
      </Provider>
  )
}
```

<br>

---

# デバッガーのインストール
状態(State)がどのように変更されているかの確認。

```
$ brew update && brew cask install react-native-debugger
$ npm install redux-devtools-extension
```

デバッガーを使うためのコード改修

```js:index.js
import {createStore, combineReducers} from 'redux'
import userReducer from './reducers/user';
import {composeWithDevTools} from 'redux-devtools-extension' //++

const rootReducer = combineReducers({
  user: userReducer,
});

//createStoreの第二引数にcomposeWithDevToolsを指定
const store = createStore(rootReducer, composeWithDevTools);

export default store;
```

<br>

---
# ActionのDispatch
プラスボタンを押したら+1、マイナスボタンを押したら-1する処理を実装。
<br>
ComponentがActionのDispatchを使用できるようにし、ComponentとStoreをConnectする。

- Stateを参照するには、`useSelector()`を使用
- Stateを更新するためには、useDispatch()を使用

```js:IncrementButton.js
import React from 'react';
// new import
import {Text, View, StyleSheet, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; // new import
import { plusOne, minusOne } from '../../store/actions/user';


export default IncrementButton = () => {

  const user = useSelector(state => state.user)
  //stateの中のuserを読み込む
  const dispatch = useDispatch() //useDispatchを呼び出す

  //表示させたいデータuserを指定し、dispatcの中にActionを指定する
  return(
    <View style={styles.container}>
        <Text>カウンタ:{user}</Text> 
        <Button title="プラス" onPress={() => dispatch(plusOne())} /> 
        <Button title="マイナス" onPress={() => dispatch(minusOne())} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
```

<br>

---
# Reduxを永続化して端末に保存する

情報をメモリではなく、スマホのストレージに保存させる。
<br>
Reduxの情報をスマホのストレージに保存するライブラリー、`redux-persist`を使用。

```
$ npm i redux-persist
```

```js:index.js
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
```

```js:App.js
import React from 'react';
import { Provider } from 'react-redux'; 
import store, {persistor} from './store/' //++
import IncrementButton from './src/components/IncrementButton';
import {PersistGate} from 'redux-persist/integration/react' //++

export default App = () => {
  return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IncrementButton />
        </PersistGate>
      </Provider>
  )
}
```