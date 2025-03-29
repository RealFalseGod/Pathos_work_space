import { View, Text, Button, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, firestore } from "../../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Taskbar = () => {
  const [tasks, setTasks] = useState<{ id: string; name: string; difficulty: string; frequency: string; dueDate: string; }[]>([]);
  const [taskName, setTaskName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [frequency, setFrequency] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);

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

  const saveTasks = async (newTasks: any) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Failed to save tasks', error);
    }
  };

  const uploadTasksToFirebase = async (newTask: any) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(firestore, 'users', user.uid, 'tasks'), {
          ...newTask,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        console.error('No user is logged in');
      }
    } catch (error) {
      console.error('Failed to upload task to Firebase', error);
    }
  };

  const addTask = () => {
    if (!taskName.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      name: taskName.trim(),
      difficulty,
      frequency,
      dueDate: dueDate.toISOString(),
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    saveTasks(newTasks);
    uploadTasksToFirebase(newTask);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setDueDate(selectedDate);
    }
    setShow(false);
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
      <Button title="Add Task" onPress={() => setModalVisible(true)} />
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        className="mt-4"
      />
      <Modal isVisible={modalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View className="p-6 bg-white rounded-xl mx-6 mt-20">
          <Text className="text-xl font-bold">New Task</Text>
          <TextInput
            placeholder="Task Name"
            value={taskName}
            onChangeText={setTaskName}
            className="border p-2 my-2 rounded-lg"
          />
          <Text className="font-semibold mt-2">Select Difficulty:</Text>
          {["Easy", "Intermediate", "Hard"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setDifficulty(option)}
              className={`p-2 my-1 rounded-lg border ${difficulty === option ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              <Text className={difficulty === option ? "text-white" : "text-black"}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Text className="font-semibold mt-2">Frequency:</Text>
          {["Daily", "Weekly", "Monthly", "Annually"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setFrequency(option)}
              className={`p-2 my-1 rounded-lg border ${frequency === option ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              <Text className={frequency === option ? "text-white" : "text-black"}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Text>Start Date</Text>
          <Button title="Select Birthdate" onPress={() => setShow(true)} />
          {show && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="date"
              onChange={handleDateChange}
            />
          )}
          <Text>Selected: {dueDate.toDateString()}</Text>
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