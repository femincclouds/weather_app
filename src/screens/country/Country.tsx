import { View, StyleSheet, Text, Button, Pressable, Image } from "react-native";
import React from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { WEATHER_API } from "@env";
import { appStateSelectors, useAppState } from "../../state/Data";

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
  const countryDetails = useAppState(appStateSelectors.countryDetails);
  const setWeatherDetails = useAppState(appStateSelectors.setWeatherDetails);
  const [data] = countryDetails.data;
  const { capital } = data;
  const { flags } = data;

  const handleCapitalWeather = async () => {
    await axios
      .get(
        `http://api.weatherstack.com/current?access_key=${WEATHER_API}&query=${capital[0]}`
      )
      .then((response) => {
        console.log(response);
        setWeatherDetails(response);
        navigation.navigate("Weather");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Country details</Text>
      {/* information */}
      <View style={styles.countryDetails}>
        <Text style={styles.keyStyle}>Capital: {capital[0]}</Text>
        <Text style={styles.keyStyle}>Population: {data.population}</Text>
        <Text style={styles.keyStyle}>
          Latlng:{data.latlng[0]}, {data.latlng[1]}
        </Text>
        <Image source={{ uri: flags.png }} style={styles.image} />
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
    margin: 30,
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
  image: {
    height: 150,
    width: 200,
    alignSelf: "center",
    marginTop: 20,
  },
});
