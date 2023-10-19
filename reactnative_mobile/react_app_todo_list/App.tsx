import { StyleSheet, View, Keyboard, Text, TextInput } from "react-native";
import { StatsigProvider } from "statsig-react";
import { REACT_APP_CLIENT_KEY } from "@env";
import { useState } from "react";
import "react-native-get-random-values";
import KeyboardAvoidingTextInput from "./components/KeyboardAvoidingTextInput";
import TodoList from "./components/TodoList";

export default function App() {
  const [task, setTask] = useState<any>("");
  const [taskItems, setTaskItems] = useState<string[]>([]);
  const [user, setUser] = useState({ userID: "reactnative_dummy_user_id" });
  const API_KEY: string = REACT_APP_CLIENT_KEY || "";
  const [statsigInitialized, setStatsigInitialized] = useState(false);

  const handleAddTask = async (text: string) => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index: any) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const initCallback = (
    initDurationMs: number,
    success: boolean,
    message: string | null
  ) => {
    //Continue the app flow after the SDK is initialized.
    setStatsigInitialized(success);
  };

  return (
    <View style={styles.container}>
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
      {statsigInitialized ? (
        <View style={styles.childContainer}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>

          <KeyboardAvoidingTextInput
            placeHolderText={"Write a task here"}
            changeText={(text: String) => setTask(text)}
            taskValue={task}
            addTask={(text: string) => handleAddTask(text)}
          />

          <TodoList
            dataList={taskItems}
            deleteTodoFromList={(index: any, item: any) => completeTask(index)}
          />
        </View>
      ) : (
        <View style={styles.childContainer}>
          <Text style={styles.errorSectionTitle}>
            Statsig SDK not initialized. Please try reopening the application.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  childContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  errorSectionTitle: {
    fontSize: 20,
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
