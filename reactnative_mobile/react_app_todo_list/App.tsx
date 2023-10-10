import React, { useState } from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import KeyboardAvoidingTextInput from "./components/KeyboardAvoidingTextInput";
import TodoList from "./components/TodoList";

export default function App() {
  const [task, setTask] = useState<any>();
  const [taskItems, setTaskItems] = useState<any[]>([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index: any, item: any) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const addTodoTask = () => {
    handleAddTask();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's tasks</Text>

      <TodoList
        dataList={taskItems}
        todoTaskDone={(index: any, item: any) => completeTask(index, item)}
      />

      <KeyboardAvoidingTextInput
        placeHolderText={"Write a task"}
        changeText={(text: String) => setTask(text)}
        taskValue={task}
        addTask={handleAddTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
});
