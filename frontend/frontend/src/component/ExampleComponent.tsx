// src/components/ExampleComponent.tsx
import { useAtom } from 'jotai';
import { counterAtom } from '../atoms/atoms'; // Import the atom

const ExampleComponent = () => {
  const [counter, setCounter] = useAtom(counterAtom); // Use the atom for state management

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
    </div>
  );
};

export default ExampleComponent;
