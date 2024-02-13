import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  SectionList,
  StyleSheet,
  TextInput,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useNavigation } from "@react-navigation/native";

export default function ContactsScreen() {
  const navigation = useNavigation();

  const [contactsData, setContactsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContactNumber, setSelectedContactNumber] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        const groupedContacts = data.reduce((acc, contact) => {
          const firstLetter = contact.name[0].toUpperCase();
          if (!acc[firstLetter]) {
            acc[firstLetter] = [];
          }
          acc[firstLetter].push(contact);
          return acc;
        }, {});

        const sections = Object.keys(groupedContacts).map((letter) => ({
          title: letter,
          data: groupedContacts[letter],
        }));

        setContactsData(sections);
      } else {
        Alert.alert(
          "Permission denied",
          "Please grant permission to access contacts"
        );
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contactsData.map((section) => ({
    title: section.title,
    data: section.data.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.phoneNumbers &&
          contact.phoneNumbers[0] &&
          contact.phoneNumbers[0].number
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
    ),
  }));

  const handleContactClick = (contactNumber) => {
    const sanitizedNumber = contactNumber
      .replace(/\s+/g, "")
      .replace(/-/g, "")
      .replace("+91", "")
      .slice(-10);
    setSelectedContactNumber(sanitizedNumber);
    navigation.navigate("Pulse Dialer", { contactNumber: sanitizedNumber });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {contactsData.length > 0 && (
        <SectionList
          sections={searchQuery ? filteredContacts : contactsData}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() =>
                handleContactClick(
                  item && item.phoneNumbers && item.phoneNumbers[0]
                    ? item.phoneNumbers[0].number
                    : ""
                )
              }
            >
              <Text style={styles.contactname}>{item.name}</Text>
              {item.phoneNumbers && item.phoneNumbers[0] && (
                <Text style={styles.contactnumber}>
                  {item.phoneNumbers[0].number}
                </Text>
              )}
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => {
            if (!searchQuery) {
              return <Text style={styles.sectionHeader}>{title}</Text>;
            }
            return null;
          }}
        />
      )}
      {contactsData.length === 0 && (
        <Text style={styles.noResults}>Loading contacts...</Text>
      )}
      {contactsData.length > 0 &&
        !filteredContacts.some((section) => section.data.length > 0) && (
          <Text style={styles.noResults}>No contacts found</Text>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
  },
  contactItem: {
    marginBottom: 20,
    marginLeft: 30,
  },
  contactname: {
    fontSize: 18,
    marginBottom: 2,
    marginTop: 5,
  },
  contactnumber: {
    fontSize: 13,
  },
  sectionHeader: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
