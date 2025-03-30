import { View, Text, Button, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';
const Taskbar = () => {
  const [tasks, setTasks] = useState<{ id: string; name: string; difficulty: string; frequency: string; dueDate: string; status: string; }[]>([]);
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
  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Save the updated tasks to AsyncStorage
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
  const updateTaskStatus = (id: string, newStatus: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Save the updated tasks to AsyncStorage
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
      status: "Pending",
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

 const renderTask = ({ item }: { item: { id: string; name: string; difficulty: string; frequency: string; dueDate: string; status: string; } }) => (
  <View className="p-2 border-b border-gray-200 flex-row justify-between items-center">
    <View>
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text>Difficulty: {item.difficulty}</Text>
      <Text>Frequency: {item.frequency}</Text>
      <Text>Due Date: {new Date(item.dueDate).toDateString()}</Text>
      <Text>Status: {item.status}</Text>
    </View>
    <View className="flex-row space-x-2">
      {item.status !== "Completed" && (
        <TouchableOpacity
          onPress={() => updateTaskStatus(item.id, "Completed")}
          className="bg-green-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white">Done</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        className="bg-red-500 px-4 py-2 rounded-lg"
      >
        <Text className="text-white">Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

  return (
    <SafeAreaView className="flex-1 bg-white">
    <View className="p-4">
      {/* Filter Button with Dropdown */}
      <View className="flex-row justify-between items-center mb-4 relative">
  <Text className="text-xl font-bold">Task List</Text>
  <View className="flex-row justify-between items-center bg-gray-100 p-2 rounded-lg">
  {["All","One-Time", "Daily", "Weekly", "Monthly", "Annually"].map((option) => (
    <TouchableOpacity
      key={option}
      onPress={() => setFilter(option === "All" ? null : option)}
      className={`px-4 py-2 rounded-lg ${
        filter === option ? "bg-blue-500" : "bg-gray-200"
      }`}
    >
      <Text className={`text-sm font-semibold ${filter === option ? "text-white" : "text-black"}`}>
        {option}
      </Text>
    </TouchableOpacity>
  ))}
</View>

</View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        className="mt-4"
      />
      <TouchableOpacity
  onPress={() => setModalVisible(true)}
  className="absolute bottom-8 right-8 bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg"
>
<Text className="text-white text-3xl font-bold">+</Text>
</TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default Taskbar;