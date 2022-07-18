import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { appStateSelectors, useAppState } from "../../state/Data";

const Weather: React.FC = () => {
  const weatherDetails = useAppState(appStateSelectors.weatherDetails);
  const { current } = weatherDetails.data;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Capital Weather</Text>
      <View style={styles.container}>
        <Text style={styles.desc}>Wind Speed: {current.wind_speed}</Text>
        <Text style={styles.desc}>Precip: {current.precip}</Text>
        <Text style={styles.desc}>
          Temperature: {current.temperature} degrees
        </Text>
        <Image
          source={{ uri: current.weather_icons[0] }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#4a4e69",
  },
  title: {
    alignSelf: "center",
    margin: 30,
    fontSize: 30,
    color: "white",
  },
  container: {
    alignItems: "center",
    margin: 30,
  },
  desc: {
    color: "white",
    fontSize: 22,
    margin: 10,
  },
  image: {
    height: 50,
    width: 50,
    alignSelf: "center",
    marginTop: 10,
  },
});
