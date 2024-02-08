import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, AntDesign } from "@expo/vector-icons";
import DialerScreen from "./Components/DailerScreen";
import ContactsScreen from "./Components/ContactsScreen";

// Assuming you have defined a function for logout
// const logout = () => {
//   // Implement logout functionality here
// };

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Pulse Dialer"
          component={DialerScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="back-in-time" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="contacts" size={24} color={color} />
            ),
          }}
        />
        {/* Add the logout tab */}
        {/* <Tab.Screen
          name="Logout"
          component={logout}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="logout" size={24} color="red" />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
