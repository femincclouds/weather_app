import { View, StyleSheet, Text, Button, Pressable } from "react-native";
import React from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { WEATHER_API } from "@env";

// type CountryScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Country'
// >;

// type RootStackParamList = {
//   Home: undefined;
//   Profile: { userId: string };
//   Feed: { sort: 'latest' | 'top' } | undefined;
// };

const Country: React.FC = ({ navigation }: any) => {
  const handleCapitalWeather = async () => {
    const res = await axios
      .get(
        `http://api.weatherstack.com/current?
          access_key=${WEATHER_API}&query=$delhi`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("weather----->>", res);
  };
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Country details</Text>
      {/* information */}
      <View style={styles.countryDetails}>
        <Text style={styles.keyStyle}>Capital:</Text>
        <Text style={styles.keyStyle}>Population:</Text>
        <Text style={styles.keyStyle}>Latlng:</Text>
        <Text style={styles.keyStyle}>Flag:</Text>
        <View></View>
      </View>
      <Pressable style={styles.button} onPress={handleCapitalWeather}>
        <Text style={styles.text}>Capital Weather</Text>
      </Pressable>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Country;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#a2d2ff",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 30,
    margin: 10,
  },

  keyStyle: {
    fontSize: 30,
    margin: 10,
    color: "blue",
  },
  countryDetails: {
    marginBottom: 30,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
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
