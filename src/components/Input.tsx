import { useState } from "react";
import { TextInput } from "react-native";

const Input = () => {
  const [value, setValue] = useState("");
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      onSubmitEditing={() => console.log(value)}
      className="text-white bg-2 rounded outline-none p-2 m-2"
    />
  );
};

export default Input;
