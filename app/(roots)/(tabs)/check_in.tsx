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
const Check_in = () => {
  const [mood, setMood] = useState<string | null>(null);
  const [productivity, setProductivity] = useState(5);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const moods = ["Happy", "Sad", "Angry", "Anxious", "Calm"];

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
    <ScrollView className="flex-1 bg-[#E9F8D8] p-4">
      <View className="pb-20">
        <Text className="text-2xl font-[Poppins-Bold] text-[#57CC02]">
          Selected Date
        </Text>
        <Text className="text-lg text-gray-700 mb-4">
          {date.toDateString()}
        </Text>

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="bg-[#57CC02] py-3 rounded-2xl  active:scale-95 transition-all"
        >
          <Text className="text-white text-lg font-[Poppins-Bold] text-center">
            Update Date
          </Text>
        </TouchableOpacity>

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

        {/* Mood Selection */}
        <Text className="text-2xl font-[Poppins-Bold] text-[#57CC02] mt-6">
          Mood
        </Text>
        <View className="flex-row justify-between mt-3">
          {moods.map((m, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setMood(m)}
              className={`p-4 rounded-full transition-all bg-white  ${
                mood === m ? "scale-110 bg-[#57CC02]" : "opacity-70"
              }`}
            >
              <Text
                className={`text-lg font-[Poppins-Bold] ${
                  mood === m ? "text-white" : "text-gray-700"
                }`}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Productivity Rating */}
        <Text className="text-2xl font-[Poppins-Bold] text-[#57CC02] mt-6">
          Productivity Rating
        </Text>
        <Text className="text-lg text-gray-700">{productivity}</Text>
        <Slider
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={productivity}
          onValueChange={setProductivity}
          className="w-full mt-2"
          minimumTrackTintColor="#57CC02"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#57CC02"
        />

        {/* Journal Notes */}
        <Text className="text-2xl font-[Poppins-Bold] text-[#57CC02] mt-6">
          Journal Notes
        </Text>
        <TextInput
          placeholder="Write your thoughts..."
          value={notes}
          onChangeText={setNotes}
          multiline
          className="border border-gray-300 rounded-2xl p-4 h-28 mt-3 bg-white"
        />

        {/* Save Button */}
        <TouchableOpacity
          onPress={saveData}
          className="bg-[#57CC02] py-3 rounded-2xl mt-6  active:scale-95 transition-all"
        >
          <Text className="text-white text-lg font-[Poppins-Bold] text-center">
            Day Done
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Check_in;
