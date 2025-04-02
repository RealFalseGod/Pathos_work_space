import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
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
  const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Angry", emoji: "😡" },
    { label: "Anxious", emoji: "😰" },
    { label: "Calm", emoji: "😌" },
  ];

  const saveData = async () => {
    if (!mood || !notes.trim()) {
      alert("Please select a mood and write some notes.");
      return;
    }

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
    } catch (error) {
      console.error("Failed to save data", error);
      alert("Failed to save your check-in. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-[#E9F8D8] p-4 ">
      <View className="flex-1 items-center justify-center mb-40">
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
          {/* Line below the date */}
          <View
            style={{
              height: 1,
              backgroundColor: "#E5E7EB",
              marginBottom: 16,
              width: "100%",
            }}
          />
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
            className="bg-[#57CC02] py-3 rounded-2xl mt-6 active:scale-95 transition-all"
          >
            <Text className="text-white text-lg font-[Poppins-Bold] text-center">
              Day Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Check_in;
