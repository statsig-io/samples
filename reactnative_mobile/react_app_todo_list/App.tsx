import React, { useState } from "react";
import { REACT_APP_CLIENT_KEY } from "@env";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import KeyboardAvoidingTextInput from "./components/KeyboardAvoidingTextInput";
import TodoList from "./components/TodoList";
import {
  StatsigProvider,
  useGate,
  useExperiment,
  useConfig,
  Statsig,
} from "statsig-react-native-expo";

export default function App() {
  const [task, setTask] = useState<any>();
  const [taskItems, setTaskItems] = useState<any[]>([]);
  const [user, setUser] = useState({ userID: "reactnative_dummy_user_id" });
  const API_KEY: string = REACT_APP_CLIENT_KEY || "";

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

  const { value, isLoading } = useGate("enable_delete_todo");

  const initCallback = (
    initDurationMs: number,
    success: boolean,
    message: string | null
  ) => {
    //Continue the app flow after the SDK is initialized.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's tasks</Text>

      <StatsigProvider
        sdkKey={API_KEY}
        user={user}
        waitForInitialization={true}
        options={{
          initCompletionCallback: initCallback,
        }}
      >
        <View />
      </StatsigProvider>

      <TodoList
        dataList={taskItems}
        deleteTodoFromList={(index: any, item: any) =>
          completeTask(index, item)
        }
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
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
