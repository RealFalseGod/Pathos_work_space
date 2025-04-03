import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Check_in = () => {
  const [mood, setMood] = useState<string | null>(null);
  const [productivity, setProductivity] = useState(1);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);
  const [enableOtherDay, setEnableOtherDay] = useState(false); // State to enable check-in for another day

  const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Angry", emoji: "😡" },
    { label: "Anxious", emoji: "😰" },
    { label: "Calm", emoji: "😌" },
  ];

  // Function to check if today's check-in already exists
  const checkTodayCheckIn = async () => {
    try {
      const existingData = await AsyncStorage.getItem("check_in_data");
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        const today = new Date().toISOString().split("T")[0];
        const hasTodayCheckIn = parsedData.some(
          (entry: { date: string }) => entry.date.split("T")[0] === today
        );
        setAlreadyCheckedIn(hasTodayCheckIn);
      }
    } catch (error) {
      console.error("Failed to check today's check-in", error);
    }
  };

  // Call checkTodayCheckIn when the component mounts
  useEffect(() => {
    checkTodayCheckIn();
  }, []);

  const saveData = async () => {
    const data = {
      mood,
      productivity,
      notes,
      date: date.toISOString(),
    };

    try {
      const existingData = await AsyncStorage.getItem("check_in_data");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const updatedData = [...parsedData, data];

      await AsyncStorage.setItem("check_in_data", JSON.stringify(updatedData));
      alert("Your check-in has been saved!");

      // Trigger the check immediately after saving
      await checkTodayCheckIn(); // Ensure this runs before proceeding

      // Optionally, you can add a small delay to ensure the UI updates smoothly
      setTimeout(() => {
        setAlreadyCheckedIn(true); // Update the state explicitly
      }, 100);
    } catch (error) {
      console.error("Failed to save data", error);
      alert("Failed to save your check-in. Please try again.");
    }
  };
  const isFormValid = mood && notes.trim(); // Check if all required fields are filled

  if (alreadyCheckedIn && !enableOtherDay) {
    return (
      <View className="flex-1 justify-center items-center bg-[#E9F8D8] pb-10">
        <Text className="text-2xl font-[Poppins-Bold] text-[#57CC02] text-center mb-4">
          You have already completed today's check-in!
        </Text>
        <TouchableOpacity
          onPress={() => setEnableOtherDay(true)} // Enable check-in for another day
          className="bg-[#57CC02] py-3 px-6 rounded-2xl active:scale-95 transition-all"
        >
          <Text className="text-white text-lg font-[Poppins-Bold] text-center">
            Check-in for Another Day
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-[#E9F8D8] pb-40">
      {/* Card Container */}
      <View className="w-[90%] bg-white p-6 rounded-2xl shadow-lg">
        {/* Date Picker */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-[Poppins-Bold] text-gray-700">
            {date.toDateString()}
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="p-2 rounded-full bg-[#57CC02] active:scale-95 transition-all"
          >
            <Ionicons name="calendar" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* Mood Section */}
        <View style={{ marginTop: 16 }}>
          <Text
            className="text-2xl font-[Poppins-Bold] text-[#57CC02]"
            style={{ textAlign: "center" }}
          >
            Mood
          </Text>
          <View className="flex-row justify-between mt-3">
            {moods.map((m, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setMood(m.label)}
                className="p-4 rounded-full"
              >
                <Text
                  className={`text-center ${
                    mood === m.label ? "text-4xl" : "text-3xl"
                  }`}
                  style={{
                    transform: [{ scale: mood === m.label ? 1.2 : 1 }],
                  }}
                >
                  {m.emoji}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            marginVertical: 16,
            width: "100%",
          }}
        />

        {/* Productivity Section */}
        <View style={{ marginTop: 16 }}>
          <Text
            className="text-2xl font-[Poppins-Bold] pb-3 text-[#57CC02]"
            style={{ textAlign: "center" }}
          >
            Productivity
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 8,
              width: "100%",
            }}
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <TouchableOpacity
                key={rating}
                onPress={() => setProductivity(rating)}
              >
                <FontAwesome
                  name={rating <= productivity ? "star" : "star-o"}
                  size={28}
                  color={rating <= productivity ? "#FFD700" : "#ccc"}
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            marginVertical: 16,
            width: "100%",
          }}
        />

        {/* Journal Notes Section */}
        <View style={{ marginTop: 16 }}>
          <Text
            className="text-2xl font-[Poppins-Bold] text-[#57CC02]"
            style={{ textAlign: "center" }}
          >
            Journal Notes
          </Text>
          <TextInput
            placeholder="Write your thoughts..."
            value={notes}
            onChangeText={setNotes}
            multiline
            className="border border-gray-300 rounded-2xl p-4 h-28 mt-3 bg-white"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={saveData}
          disabled={!isFormValid} // Disable button if form is invalid
          className={`py-3 rounded-2xl mt-6 active:scale-95 transition-all ${
            isFormValid ? "bg-[#57CC02]" : "bg-gray-400"
          }`}
        >
          <Text className="text-white text-lg font-[Poppins-Bold] text-center">
            Day Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Check_in;
