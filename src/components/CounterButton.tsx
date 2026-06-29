import { Button } from 'react-native';
import useCounterStore from '../store/counterStore';

export default function CounterButton() {
  const increment = useCounterStore(
    (state) => state.increment
  );

  return (
    <Button
      title="Tambah"
      onPress={increment}
    />
  );
}