import {useNavigation} from '@react-navigation/core';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import {
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Button,
  Text,
  Pressable,
} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    height: 100,
    borderWidth: 2,
    borderColor: 'silver',
  },
});

interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (itemId: number) => void;
}

const Item = (props: InputProps) => {
  const {containerStyle, ...inputProps} = props;

  const navigation = useNavigation();

  const onPressItem = () => {
    navigation.navigate('Home', value);
  };

  return (
    <Pressable
      onPress={onPressItem}
      style={[styles.containerStyle, containerStyle]}></Pressable>
  );
};

const ItemCallback = (props: InputProps) => {
  const {containerStyle, ...inputProps} = props;

  const onPressItem = () => {
    props.onPress(props.value);
  };

  return (
    <Pressable
      onPress={onPressItem}
      style={[styles.containerStyle, containerStyle]}></Pressable>
  );
};

const TEMP_ARRAY = Array(1000).fill(1);

export default function Home({navigation}) {
  const [isRended, setRended] = useState(false);

  //Array rended result for hook
  const withNavigation = useRef([] as number[]).current;
  //Array rended result for useCallback
  const withCallback = useRef([] as number[]).current;
  //Results
  const result = useRef({hookWin: 0, functionWin: 0}).current;

  const onPressNavigation = useCallback(value => {
    navigation.navigate('Home', value);
  }, []);

  const List = () => {
    const start = performance.now();

    const itemList = TEMP_ARRAY.map((item, index) => (
      <Item key={index.toString()} />
    ));

    const end = performance.now();

    withNavigation.push(end - start);

    return itemList;
  };

  const ListCallback = () => {
    const start = performance.now();

    const itemList = TEMP_ARRAY.map((item, index) => (
      <ItemCallback key={index.toString()} onPress={onPressNavigation} />
    ));

    const end = performance.now();

    withCallback.push(end - start);

    return itemList;
  };

  withNavigation.forEach((navValue, index) => {
    const funValue = withCallback[index];

    if (navValue < funValue) {
      result.hookWin = result.hookWin + 1;
    } else {
      result.functionWin = result.functionWin + 1;
    }
  });

  console.log(result);

  result.hookWin = 0;
  result.functionWin = 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setRended(!isRended);
    }, 3000);

    return () => clearInterval(timer);
  }, [isRended]);

  return (
    <View style={{flex: 1}}>
      <List />
      <ListCallback />
    </View>
  );
}
