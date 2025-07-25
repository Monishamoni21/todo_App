import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{task.title}</Text>
        <Text>{task.description}</Text>
        <Text>Due: {task.dueDate}</Text>
        <Text>Status: {task.status}</Text>
        <Text>Priority: {task.priority}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="pencil" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', gap: 20 },
});

export default TaskItem;