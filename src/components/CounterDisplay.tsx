import { Text } from 'react-native';
import useCounterStore from '../store/counterStore';

export default function CounterDisplay() {
  const count = useCounterStore((state) => state.count);

  return (
    <Text style={{ fontSize: 40 }}>
      {count}
    </Text>
  );
}