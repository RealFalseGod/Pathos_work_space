import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Daily_log = () => {
  interface Log {
    mood: string;
    productivity: string;
    notes: string;
    date: string;
  }
  
  const [logs, setLogs] = useState<Log[]>([]);

  // Fetch logs from AsyncStorage
  const fetchLogs = async () => {
    try {
      const data = await AsyncStorage.getItem('check_in_data');
      if (data) {
        setLogs(JSON.parse(data));
      } else {
        setLogs([]); // No logs found
      }
    } catch (error) {
      console.error('Failed to fetch logs', error);
      alert('Failed to load logs. Please try again.');
    }
  };

  // Fetch logs when the component mounts
  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <View style={styles.container}>
      {logs.length === 0 ? (
        <Text style={styles.noLogsText}>No logs found.</Text>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.logItem}>
              <Text style={styles.logTitle}>Mood: {item.mood}</Text>
              <Text>Productivity: {item.productivity}</Text>
              <Text>Notes: {item.notes}</Text>
              <Text>Date: {new Date(item.date).toDateString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  noLogsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  logItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  logTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Daily_log;