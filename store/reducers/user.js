// Actionの中身をさらに具体化
//reducerは純粋な関数なので枠組みはほとんど決まっている


const reducer = (state = 0, action) => { //reducerの引数はoldStateとaction  stateには初期値を設定する
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