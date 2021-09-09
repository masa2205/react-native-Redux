// Stateの数字を+1させる
// Actionの枠組みはほとんど決まっている

// stateの数字を+1させるtype
export const plusOne = () => {
  return {
    type: 'PlUS_ONE', //Actionの種類を識別
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