import { View, Text, Button, StyleSheet } from 'react-native';
import useCounterStore from './store/counterStore';

export default function App() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Global State Management
      </Text>

      <Text style={styles.counter}>
        {count}
      </Text>

      <Button
        title="Tambah"
        onPress={increment}
      />

      <Button
        title="Kurang"
        onPress={decrement}
      />

      <Button
        title="Reset"
        onPress={reset}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },

  counter: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
});