import React, { useState } from "react";
import { Text, StyleSheet, TextInput, View, Button } from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { COUNTRY_API } from "@env";

const Landing: React.FC = ({ navigation }: any) => {
  const [country, setCountry] = useState("");
  const onFormSubmit = async (values: IFormValues) => {
    setCountry(values.country);
    console.log("inside");
    const res = await axios
      .get(`https://restcountries.eu/rest/v2/name/${country}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("data---->>", res);
    navigation.navigate("Country");
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.textStyle}>Enter Country</Text>

      <Formik initialValues={{ country: "" }} onSubmit={onFormSubmit}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter country"
              onChangeText={handleChange("country")}
              value={values.country}
            />
            {errors.country && touched.country && errors.country}

            <Button
              disabled={values.country === ""}
              title="Submit"
              onPress={onFormSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Landing;

interface IFormValues {
  country: string;
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#a2d2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 20,
    color: "#000",
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    margin: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: "#2a9d8f",
  },
});
