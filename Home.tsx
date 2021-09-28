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

const Item = memo((props: InputProps) => {
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
});

const ItemCallback = memo((props: InputProps) => {
  const {containerStyle, ...inputProps} = props;

  const onPressItem = () => {
    props.onPress();
  };

  return (
    <Pressable
      onPress={onPressItem}
      style={[styles.containerStyle, containerStyle]}></Pressable>
  );
});

const TEMP_ARRAY = Array(1000).fill(1);

export default function Home({navigation}) {
  const [isRended, setRended] = useState(false);

  const withNavigation = useRef([] as number[]).current;
  const withCallback = useRef([] as number[]).current;
  const result = useRef({hw: 0, fw: 0}).current;

  const onPressNavigation = useCallback(value => {
    navigation.navigate('Home', value);
  }, []);

  const renderItem = (item, index) => <Item key={index.toString()} />;

  const renderItemCallback = (item, index) => (
    <ItemCallback key={index.toString()} onPress={onPressNavigation} />
  );

  const List = () => {
    const start = performance.now();

    const itemList = TEMP_ARRAY.map(renderItem);

    const end = performance.now();

    withNavigation.push(end - start);

    return itemList;
  };

  const ListCallback = () => {
    const start = performance.now();

    const itemList = TEMP_ARRAY.map(renderItemCallback);

    const end = performance.now();

    withCallback.push(end - start);

    return itemList;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRended(!isRended);
    }, 5000);

    return () => clearInterval(timer);
  }, [isRended]);

  withNavigation.forEach((navValue, index) => {
    const funValue = withCallback[index];

    if (navValue < funValue) {
      result.hw = result.hw + 1;
    } else {
      result.fw = result.fw + 1;
    }
  });

  console.log(result);

  return (
    <View style={{flex: 1}}>
      <List />
      <ListCallback />
    </View>
  );
}
