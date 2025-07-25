import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskItem from '../components/TaskItem';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  function addTask(newTask) {
    setTasks((prev) => [...prev, { ...newTask, id: Date.now().toString() }]);
  }

  function updateTask(updatedTask) {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  return (
    <LinearGradient colors={['#7d95c3ff', '#0e5787ff']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Tasks</Text>

        {tasks.length === 0 ? (
          <Text style={styles.noTasks}>No tasks available. Add some!</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.taskCard}>
                <TaskItem
                  task={item}
                  onDelete={deleteTask}
                  onEdit={() =>
                    navigation.navigate('EditTask', {
                      task: item,
                      updateTask: updateTask,
                    })
                  }
                />
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddTask', { addTask })}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginTop:60,
    marginBottom: 40,
    textAlign: 'center',
  },
  taskCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  fab: {
    backgroundColor: '#4a90e2',
    position: 'absolute',
    bottom:50,
    right:50,
    padding: 18,
    borderRadius: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  noTasks: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color:'white',
  },
});

export default HomeScreen;
