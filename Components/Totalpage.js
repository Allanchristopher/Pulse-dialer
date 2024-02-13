import React from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DialerScreen from "./DailerScreen";
import ContactsScreen from "./ContactsScreen";

const Tab = createBottomTabNavigator();

const LogoutScreen = ({ handleLogoutSuccess }) => {
  React.useEffect(() => {
    handleLogoutSuccess();
  }, []);

  return null;
};

export default function Totalpage({ handleLogoutSuccess }) {
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
        <Tab.Screen
          name="Logout"
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="logout" size={24} color="red" />
            ),
          }}
        >
          {() => <LogoutScreen handleLogoutSuccess={handleLogoutSuccess} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
