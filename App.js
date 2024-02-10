import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Login from "./Components/Login";
import Totalpage from "./Components/Totalpage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Totalpage handleLogoutSuccess={handleLogoutSuccess} />
      ) : (
        <View style={styles.container}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
