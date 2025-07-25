import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';

const TaskForm = ({ navigation, route }) => {
  const editMode = !!route.params?.task;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [priority, setPriority] = useState('Low');

  useEffect(() => {
    if (editMode) {
      const { task } = route.params;
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, []);

  const onSave = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Title is required!');
      return;
    }

    const task = {
      id: editMode ? route.params.task.id : undefined,
      title,
      description,
      dueDate,
      status,
      priority,
    };

    if (editMode) route.params.updateTask(task);
    else route.params.addTask(task);

    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.heading}>{editMode ? 'Update Task' : 'Add Task'}</Text>

        <TextInput
          placeholder="Title*"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <TextInput
          placeholder="Due Date (YYYY-MM-DD)"
          value={dueDate}
          onChangeText={setDueDate}
          style={styles.input}
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.optionsRow}>
          {['Not Started', 'Ongoing', 'Completed'].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setStatus(item)}
              style={[
                styles.optionButton,
                status === item && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  status === item && styles.selectedOptionText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Priority</Text>
        <View style={styles.optionsRow}>
          {['Low', 'Medium', 'High'].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setPriority(item)}
              style={[
                styles.optionButton,
                priority === item && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  priority === item && styles.selectedOptionText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>
            {editMode ? 'Update Task' : 'Add Task'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#555',
    marginTop: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#eee',
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#4c7ef3',
    borderColor: '#4c7ef3',
  },
  optionText: {
    fontSize: 14,
    color: '#555',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 15,
    backgroundColor: '#4c7ef3',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
