import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function DialerScreen() {
  const route = useRoute();
  const { contactNumber } = route.params || "";
  useEffect(() => {
    if (route.params && route.params.contactNumber) {
      setNumber(route.params.contactNumber);
    }
  }, [route.params]);

  const [number, setNumber] = useState(contactNumber || "");

  const handleNumber = (pressedNumber) => {
    setNumber((prevNumber) => prevNumber + pressedNumber);
  };

  const handleCall = () => {
    if (number.length > 0) {
      axios
        .post("http://10.0.0.219:4001/insertnumber", { number: number })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          Alert.alert(
            "Error",
            "Failed to make the call. Please try again later."
          );
        });
    } else {
      Alert.alert("Error", "Please enter a valid phone number");
    }
  };

  const handleClear = () => {
    setNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const handleClearAll = () => {
    setNumber("");
  };

  let longPressTimer = useRef(null);

  const handleClearLongPress = () => {
    longPressTimer.current = setInterval(() => {
      handleClearAll();
    }, 100);
  };

  const handleClearLongPressRelease = () => {
    clearInterval(longPressTimer.current);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dailerfirstbtn}>
        <TextInput
          style={styles.input}
          onChangeText={setNumber}
          value={number}
        />
        <TouchableOpacity
          onPress={handleClear}
          onLongPress={handleClearLongPress}
          onPressOut={handleClearLongPressRelease}
          style={styles.clearbtn}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.dailercontainer}>
        {[1, 2, 3].map((number) => (
          <TouchableOpacity
            key={number}
            onPress={() => handleNumber(number.toString())}
            style={[styles.numberButton]}
          >
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dailercontainer}>
        {[4, 5, 6].map((number) => (
          <TouchableOpacity
            key={number}
            onPress={() => handleNumber(number.toString())}
            style={[styles.numberButton]}
          >
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dailercontainer}>
        {[7, 8, 9].map((number) => (
          <TouchableOpacity
            key={number}
            onPress={() => handleNumber(number.toString())}
            style={[styles.numberButton]}
          >
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dailercontainer}>
        {["*", "0", "+"].map((symbol) => (
          <TouchableOpacity
            key={symbol}
            onPress={() => handleNumber(symbol)}
            style={[styles.numberButton]}
          >
            <Text style={styles.numberText}>{symbol}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleCall} style={styles.callbtn}>
        <Ionicons name="call" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  input: {
    width: "78%",
    height: 60,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    fontSize: 35,
    textAlign: "center",
  },
  callbtn: {
    backgroundColor: "#86c06a",
    padding: 20,
    borderRadius: 50,
    marginTop: 10,
  },
  clearbtn: {
    backgroundColor: "#e8e8e8",
    padding: 7,
    borderRadius: 50,
  },
  dailercontainer: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  numberButton: {
    width: 80,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8e8e8",
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  numberText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  dailerfirstbtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
});
