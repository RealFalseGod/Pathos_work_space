import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Daily_log = () => {
  interface Log {
    mood: string;
    productivity: number;
    notes: string;
    date: string;
  }

  const [logs, setLogs] = useState<Log[]>([]);
  const [reloadKey, setReloadKey] = useState(0); // State to trigger re-renders
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for modal visibility
  const [selectedLog, setSelectedLog] = useState<Log | null>(null); // Log being edited
  const [editIndex, setEditIndex] = useState<number | null>(null); // Index of the log being edited

  // Map moods to emojis
  const moodEmojis: { [key: string]: string } = {
    Happy: "😊",
    Sad: "😢",
    Angry: "😡",
    Anxious: "😰",
    Calm: "😌",
  };

  // Fetch logs from AsyncStorage
  const fetchLogs = async () => {
    try {
      const data = await AsyncStorage.getItem("check_in_data");
      if (data) {
        setLogs(JSON.parse(data));
      } else {
        setLogs([]); // No logs found
      }
    } catch (error) {
      console.error("Failed to fetch logs", error);
      alert("Failed to load logs. Please try again.");
    }
  };

  // Delete a log
  const deleteLog = async (index: number) => {
    const updatedLogs = logs.filter((_, i) => i !== index); // Remove the selected log
    setLogs(updatedLogs); // Update the state
    await AsyncStorage.setItem("check_in_data", JSON.stringify(updatedLogs)); // Update AsyncStorage
    setReloadKey((prevKey) => prevKey + 1); // Trigger a re-render
  };

  // Show confirmation alert before deleting
  const confirmDelete = (index: number) => {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete this log?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteLog(index),
        },
      ],
      { cancelable: true }
    );
  };

  // Open the edit modal
  const openEditModal = (log: Log, index: number) => {
    setSelectedLog(log);
    setEditIndex(index);
    setIsEditModalVisible(true);
  };

  // Save the edited log
  const saveEditedLog = async () => {
    if (selectedLog && editIndex !== null) {
      const updatedLogs = [...logs];
      updatedLogs[editIndex] = selectedLog; // Update the log at the specified index
      setLogs(updatedLogs); // Update the state
      await AsyncStorage.setItem("check_in_data", JSON.stringify(updatedLogs)); // Update AsyncStorage
      setReloadKey((prevKey) => prevKey + 1); // Trigger a re-render
      setIsEditModalVisible(false); // Close the modal
    }
  };

  // Fetch logs when the component mounts or reloadKey changes
  useEffect(() => {
    fetchLogs();
  }, [reloadKey]); // Add reloadKey as a dependency

  return (
    <View className="flex-1 bg-[#E9F8D8] pb-24 pt-2 px-3">
      {logs.length === 0 ? (
        <Text className="text-center text-gray-500 text-lg">
          No logs found. Check in daily 😊
        </Text>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className="bg-[#FFFFFD] rounded-xl p-4 mb-4 flex-row items-center justify-between">
              <View>
                {/* Mood with Emoji */}
                <Text className="text-xl font-semibold text-[#3A7D44]">
                  Mood:{" "}
                  <Text className="font-normal">
                    {moodEmojis[item.mood] || "❓"} {item.mood}
                  </Text>
                </Text>

                {/* Productivity with Stars */}
                <Text className="text-lg font-medium text-[#4A90E2]">
                  Productivity:{" "}
                  <Text className="font-normal">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesome
                        key={i}
                        name={i < item.productivity ? "star" : "star-o"}
                        size={16}
                        color={i < item.productivity ? "#FFD700" : "#ccc"}
                      />
                    ))}
                  </Text>
                </Text>

                {/* Notes */}
                <Text className="text-base text-gray-700 italic">
                  Notes: {item.notes}
                </Text>

                {/* Date */}
                <Text className="text-sm text-gray-500 mt-2">
                  📅 {new Date(item.date).toDateString()}
                </Text>
              </View>

              {/* Edit and Delete Buttons */}
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => openEditModal(item, index)}
                  className="mr-4"
                >
                  <Ionicons name="pencil" size={24} color="#4A90E2" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => confirmDelete(index)}
                  className="ml-4"
                >
                  <Ionicons name="trash" size={24} color="#FF5A5F" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Edit Modal */}
      {isEditModalVisible && selectedLog && (
        <Modal
          visible={isEditModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsEditModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white rounded-xl p-6 w-[90%]">
              <Text className="text-xl font-bold text-[#57CC02] mb-4">
                Edit Log
              </Text>

              {/* Mood */}
              <TextInput
                placeholder="Mood"
                value={selectedLog.mood}
                onChangeText={(text) =>
                  setSelectedLog({ ...selectedLog, mood: text })
                }
                className="border border-gray-300 rounded-lg p-3 mb-4"
              />

              {/* Productivity */}
              <TextInput
                placeholder="Productivity (1-5)"
                value={selectedLog.productivity.toString()}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setSelectedLog({
                    ...selectedLog,
                    productivity: parseInt(text) || 1,
                  })
                }
                className="border border-gray-300 rounded-lg p-3 mb-4"
              />

              {/* Notes */}
              <TextInput
                placeholder="Notes"
                value={selectedLog.notes}
                onChangeText={(text) =>
                  setSelectedLog({ ...selectedLog, notes: text })
                }
                multiline
                className="border border-gray-300 rounded-lg p-3 mb-4"
              />

              {/* Save Button */}
              <TouchableOpacity
                onPress={saveEditedLog}
                className="bg-[#57CC02] py-3 rounded-lg"
              >
                <Text className="text-white text-center font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Daily_log;
