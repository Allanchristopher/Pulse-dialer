import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

export default function Login({ onLoginSuccess }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
  };

  const handleOtpChange = (text) => {
    setOtp(text);
  };

  const handleButtonPress = async () => {
    const response = await axios.get(
      `http://chatdesk.pulsework360.com:8080/api/123gudehouse/testingOne?PhoneNumber=${mobileNumber}&Otp=${otp}`
    );
    if (response.data.code === "Login" && response.data.status === "Success") {
      onLoginSuccess();
    } else {
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Mobile number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={handleMobileNumberChange}
      />
      <TextInput
        style={styles.input}
        placeholder="OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={handleOtpChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
