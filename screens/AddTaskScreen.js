import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddTaskScreen = ({ navigation, route }) => {
  const { addTask } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = () => {
    if (title.trim() === '') {
      Alert.alert('Validation Error', 'Title is required.');
      return;
    }

    addTask({ title, description, dueDate, status, priority });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Add New Task</Text>

        <Text style={styles.label}>Title*</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description"
          multiline
        />

        <Text style={styles.label}>Due Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="2025-07-31"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={status}
            onValueChange={setStatus}
            style={styles.picker}
          >
            <Picker.Item label="Not Started" value="Not Started" />
            <Picker.Item label="Ongoing" value="Ongoing" />
            <Picker.Item label="Completed" value="Completed" />
          </Picker>
        </View>

        <Text style={styles.label}>Priority</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={priority}
            onValueChange={setPriority}
            style={styles.picker}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Add Task" onPress={handleSubmit} color="#2196F3" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop:40,
    shadowColor: '#000',
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 6,
    borderRadius: 8,
    fontSize: 16,
  },
  textarea: {
    height: 80,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 45,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddTaskScreen;
