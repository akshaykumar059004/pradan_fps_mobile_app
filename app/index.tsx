import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import Constants from "expo-constants";

const url = Constants.expoConfig.extra.API_URL;


export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user === "loggedIn") {
        router.replace("/dashboard");
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    //TO-DO :fetch username and password from the state
    //const storedPassword = await AsyncStorage.getItem("password");
    //const defaultPassword = "123"; // default if none is set

    //username.trim() === "123" && password.trim() === (storedPassword || defaultPassword)
    //console.log("Start of axios request");
    const response = await axios.post(`${url}/api/users/authUser`,{username, password}); //TO-DO: send an axios request to the server to check if the username and password are correct` 
    console.log(response.data); // Log the response data);
    //username.trim() === "123" && password.trim() === (storedPassword || defaultPassword)
    if (response.data === 1) { //TO-DO: send an axios request to the server to check if the username and password are correct
      try {
        await AsyncStorage.setItem("password", password); //if correct, save the user_id in AsyncStorage and navigate to dashboard
        await AsyncStorage.setItem("username", username); //if correct, save the user_id in AsyncStorage and navigate to dashboard
        router.replace("/dashboard");
      } catch (error) {
        Alert.alert("Error", "Failed to save login state."); 
      }
    } else {
      Alert.alert("Invalid Credentials", "Please enter valid ID and Password"); //if incorrect, show an alert
    }
  };
  
  return (
    <View style={styles.container}>
      <Image
  source={require("../assets/images/pradan_logo.png")} 
  style={styles.logo}
  resizeMode="contain"
/>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          <Text>Login to </Text>
          <Text style={{ fontWeight: "bold" }}>Pradan</Text>
        </Text>
      </View>
      <View style={{ margin: 18 }}></View>

      {/* Username Input */}
      <View style={styles.inputContainer}>
      <FontAwesome name="envelope" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="abc123@gmail.com"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
      <FontAwesome name="lock" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.showButtonText}>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "auto",
    maxWidth: 480,
    width: "100%",
    paddingHorizontal: 39,
    paddingVertical: 150,
    alignItems: "stretch",
    backgroundColor: "#f9f9f9",
  },
  logo: {
    width: 200,
    height: 70,
    alignSelf: "center",
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Roboto",
    fontSize: 32,
    color: "#000",
    lineHeight: 38,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 19,
    borderColor: "#038003",
    borderWidth: 1,
    minWidth: 240,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
    color:'#4a7744',
  },
  input: {
    flex: 1,
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#000",
    fontWeight: "100",
    letterSpacing: 0.2,
  },
  showButton: {
    marginLeft: 10,
  },
  showButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#038003",
  },
  button: {
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "#134e13",
    minHeight: 50,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },
});