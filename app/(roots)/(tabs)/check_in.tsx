import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity,Button } from "react-native";
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
    <View className="p-4">
      {/* Display Current Date */}
      <Text className="text-lg font-bold">Selected Date:</Text>
      <Text style={{ marginBottom: 10 }}>{date.toDateString()}</Text>

      {/* Button to Open Date Picker */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{  
          padding: 10,
          backgroundColor: "#3B82F6",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#FFFFFF", textAlign: "center", fontWeight: "bold" }}>
          Update Date
        </Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false); // Close the picker
            if (selectedDate) {
              setDate(selectedDate); // Update the date
            }
          }}
        />
      )}

      {/* Mood Selection */}
      <Text className="text-lg font-bold">Mood:</Text>
      <View className="flex-row flex-wrap mt-2">
        {moods.map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => setMood(m)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              margin: 4,
              backgroundColor: mood === m ? "#3B82F6" : "#E5E7EB",
            }}
          >
            <Text style={{ color: mood === m ? "#FFFFFF" : "#000000" }}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Productivity Rating */}
      <Text className="text-lg font-bold mt-4">Productivity Rating: {productivity}</Text>
      <Slider
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={productivity}
        onValueChange={setProductivity}
        style={{ width: "100%", marginTop: 8 }}
        minimumTrackTintColor="#3B82F6"
        maximumTrackTintColor="#E5E7EB"
        thumbTintColor="#3B82F6"
      />

      {/* Personal Notes */}
      <Text className="text-lg font-bold mt-4">Journal Notes:</Text>
      <TextInput
        placeholder="Write your thoughts..."
        value={notes}
        onChangeText={setNotes}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 8,
          padding: 8,
          height: 100,
          marginTop: 8,
        }}
      />
      <Button title='Day Done'  onPress={saveData}/>
    </View>
  );
};

export default Check_in;