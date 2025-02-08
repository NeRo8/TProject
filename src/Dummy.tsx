import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function DummyComponent() {
  useEffect(() => {
    console.log('Dummy component mounted');
  }, [d]);

  return (
    <View>
      <Text>Dummy text</Text>
      <Text d>Random text</Text>
      <Text>Random text 2</Text>

      <Button title="Click me" onPress={() => console.log('Button clicked')} />
    </View>
  );
}
