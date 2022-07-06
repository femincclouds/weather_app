import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Button,
  Pressable,
} from "react-native";
import axios from "axios";
import { appStateSelectors, useAppState } from "../../state/Data";

type State = {
  country: string;
};

const Landing: React.FC = ({ navigation }: any) => {
  const [data, setData] = useState<State>({ country: "" });
  const setCountryData = useAppState(appStateSelectors.setCountryDetails);
  const handleChange = (key: keyof State) => {
    return (text: string) => {
      setData({ ...data, [key]: text });
    };
  };

  const handleSubmit = async () => {
    await axios
      .get(`https://restcountries.com/v3.1/name/${data.country}`)
      .then((response) => {
        setCountryData(response);
        setData({ country: "" });
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.navigate("Country");
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.textStyle}>Enter Country</Text>
      <TextInput
        value={data.country}
        onChangeText={handleChange("country")}
        style={styles.textInput}
        placeholder="Name"
        placeholderTextColor="#2980b9"
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#a2d2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 30,
    color: "#000",
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    margin: 35,
    width: 300,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
