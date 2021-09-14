import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import {Text, View, StyleSheet, Button} from 'react-native';
import { plusOne, minusOne } from '../../store/actions/user';

export default IncrementButton = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

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