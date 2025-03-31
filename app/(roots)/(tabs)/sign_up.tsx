import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NavigationProp } from "@react-navigation/native";

const SignUp = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [birthdate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [seek, setSeek] = useState("");
  const [mood, setMood] = useState("");
  const [show, setShow] = useState(false);
  const [struggle, setStruggle] = useState("");
  const [goal, setGoal] = useState("");

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
    setShow(false);
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully!");
      Alert.alert("User registered successfully!");
      navigation.navigate("Start");
    } catch (error: any) {
      console.error("SignUp Error:", error.message);
      Alert.alert("SignUp Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Who are you?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Birthdate</Text>
          <Button title="Select Birthdate" onPress={() => setShow(true)} />
          {show && (
            <DateTimePicker
              value={birthdate || new Date()}
              mode="date"
              onChange={handleDateChange}
            />
          )}
          <Text>Selected: {birthdate.toDateString()}</Text>
          <Text style={styles.label}>Gender:</Text>
          {["Male", "Female", "Other"].map((item, index) => (
            <TouchableOpacity
              key={`${item}-${index}`}
              style={[
                styles.optionButton,
                gender === item ? styles.selectedOption : {},
              ]}
              onPress={() => setGender(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>How are You?</Text>
          <Text>How do you feel on a general basis?</Text>
          {["Happy", "Sad", "Angry", "Anxious", "Tired", "Confused"].map(
            (item, index) => (
              <TouchableOpacity
                key={`${item}-${index}`}
                style={[
                  styles.optionButton,
                  mood === item ? styles.selectedOption : {},
                ]}
                onPress={() => setMood(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )
          )}
          <Text>What do you Seek?</Text>
          {[
            "Greatness",
            "Peace",
            "Be Better than You",
            "Be Better than others",
          ].map((item, index) => (
            <TouchableOpacity
              key={`${item}-${index}`}
              style={[
                styles.optionButton,
                seek === item ? styles.selectedOption : {},
              ]}
              onPress={() => setSeek(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
          <Text>What do you struggle with daily?</Text>
          {[
            "Time Management",
            "Stress & Anxiety",
            "Physical Health",
            "Discipline & Consistency",
            "Procrastination",
            "Emotional imbalance",
          ].map((item, index) => (
            <TouchableOpacity
              key={`${item}-${index}`}
              style={[
                styles.optionButton,
                struggle === item ? styles.selectedOption : {},
              ]}
              onPress={() => setStruggle(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>How Pathos Works</Text>
          <Text>Some boring rules and regulations...</Text>
        </View>
      )}

      {step === 4 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Do you want your goals to be?</Text>
          {["Daily", "Weekly", "Monthly", "Yearly"].map((item, index) => (
            <TouchableOpacity
              key={`${item}-${index}`}
              style={[
                styles.optionButton,
                goal === item ? styles.selectedOption : {},
              ]}
              onPress={() => setGoal(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 5 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      )}

      <View style={styles.navigationButtons}>
        {step > 1 && (
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => setStep(step - 1)}
          >
            <Text>Back</Text>
          </TouchableOpacity>
        )}
        {step < 4 && (
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => setStep(step + 1)}
          >
            <Text style={styles.navigationButtonText}>Next</Text>
          </TouchableOpacity>
        )}
        {step === 4 && (
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => setStep(step + 1)}
          >
            <Text style={styles.navigationButtonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: "blue",
    color: "white",
  },
  optionText: {
    textAlign: "center",
    color: "black",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navigationButton: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
  },
  navigationButtonText: {
    color: "white",
  },
});
