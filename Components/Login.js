import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

export default function Login() {
  const [mobileNumber, setMobileNumber] = useState(""); // State to hold the mobile number
  const [otp, setOtp] = useState(""); // State to hold the OTP value

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text); // Update the mobile number when the user types
  };

  const handleOtpChange = (text) => {
    setOtp(text); // Update the OTP value when the user types
  };

  const handleButtonPress = () => {
    // Handle button press (e.g., verify OTP)
    alert(`Entered Mobile Number: ${mobileNumber}\nEntered OTP: ${otp}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={handleMobileNumberChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={handleOtpChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Verify OTP</Text>
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
