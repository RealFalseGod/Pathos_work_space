import { View, Text, Button, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Taskbar = () => {
  const [tasks, setTasks] = useState<{ id: string; name: string; difficulty: string; frequency: string; dueDate: string; }[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [frequency, setFrequency] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [dueTime, setDueTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  const filteredTasks = filter
    ? tasks.filter((task) => task.difficulty === filter || task.frequency === filter)
    : tasks;

  const saveTasks = async (newTasks: any) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Failed to save tasks', error);
    }
  };

  const addTask = () => {
    if (!taskName.trim()) {
      alert("Task name is required.");
      return;
    }
    if (!difficulty) {
      alert("Please select a difficulty level.");
      return;
    }
    if (!frequency) {
      alert("Please select a frequency.");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      name: taskName.trim(),
      description: taskDescription.trim(),
      difficulty,
      frequency,
      dueDate: dueDate.toISOString(),
      dueTime: dueTime.toISOString(),
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    saveTasks(newTasks);

    setTaskName("");
    setTaskDescription("");
    setDifficulty("");
    setFrequency("");
    setDueDate(new Date());
    setDueTime(new Date());
    setModalVisible(false);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setDueDate(selectedDate);
    }
    setShow(false);
  };

  const handleTimeChange = (event: any, selectedTime: any) => {
    if (selectedTime) {
      setDueTime(selectedTime);
    }
    setShowTimePicker(false);
  };

  const renderTask = ({ item }: { item: { id: string; name: string; difficulty: string; frequency: string; dueDate: string; } }) => (
    <View className="p-2 border-b border-gray-200">
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text>Difficulty: {item.difficulty}</Text>
      <Text>Frequency: {item.frequency}</Text>
      <Text>Due Date: {new Date(item.dueDate).toDateString()}</Text>
    </View>
  );

  return (
    <View className="p-4">
      {/* Filter Button with Dropdown */}
      <View className="flex-row justify-between items-center mb-4 relative">
  <Text className="text-xl font-bold">Task List</Text>
  <View>
    <TouchableOpacity
      onPress={() => setShowFilterOptions(!showFilterOptions)}
      className="px-4 py-2 rounded-lg bg-blue-500"
    >
      <Text className="text-white">Filter</Text>
    </TouchableOpacity>
    {showFilterOptions && (
      <View className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-40">
        {["All", "Easy", "Intermediate", "Hard", "Daily", "Weekly"].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => {
              setFilter(option === "All" ? null : option);
              setShowFilterOptions(false); // Close dropdown after selection
            }}
            className={`px-4 py-2 ${
              filter === option ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            <Text className={filter === option ? "text-white" : "text-black"}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
</View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        className="mt-4"
      />

      {/* Add Task Modal */}
      <Modal isVisible={modalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View className="p-6 bg-white rounded-xl mx-6 mt-20">
          <Text className="text-xl font-bold">New Task</Text>
          <TextInput
            placeholder="Title"
            value={taskName}
            onChangeText={setTaskName}
            className="border p-2 my-2 rounded-lg"
          />
          <TextInput
            placeholder="Description"
            value={taskDescription}
            onChangeText={setTaskDescription}
            className="border p-2 my-2 rounded-lg"
          />
          <Text className="font-semibold mt-2">Select Difficulty:</Text>
          <View className="flex-row justify-center mt-3 space-x-4">
            {["Easy", "Intermediate", "Hard"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setDifficulty(option)}
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  difficulty === option ? "bg-blue-500 text-white" : "bg-gray-200"
                } border border-gray-300`}
              >
                <Text className={difficulty === option ? "text-white" : "text-black"}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text className="font-semibold mt-2">Frequency:</Text>
          <View className="flex-row justify-center mt-3 space-x-4">
            {["One-Time", "Daily", "Weekly", "Monthly", "Annually"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setFrequency(option)}
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  frequency === option ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <Text className={frequency === option ? "text-white" : "text-black"}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text>Due Date</Text>
          <Button title="Due Date" onPress={() => setShow(true)} />
          {show && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="date"
              onChange={handleDateChange}
            />
          )}
          <Text>Selected: {dueDate.toDateString()}</Text>
          <Text>Due Time</Text>
          <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
          {showTimePicker && (
            <DateTimePicker
              value={dueTime || new Date()}
              mode="time"
              onChange={handleTimeChange}
            />
          )}
          <Text>Selected Time: {dueTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          <Button title="Save Task" onPress={addTask} />
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text className="text-red-500 text-center mt-4">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Taskbar;