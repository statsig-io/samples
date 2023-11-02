import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Statsig } from "statsig-react-native-expo";
import { theme } from "../core/themes";

type TaskProps = {
  taskData: TodoModel;
  itemAt: number;
  deleteTodoItem(itemValue: TodoModel): void;
  completeTodoItem(itemValue: TodoModel): void;
};

const Task = (props: TaskProps) => {
  const [isTaskCompleted, setIsTaskCompleted] = useState(
    props.taskData.completed
  );
  const [visibility, setVisibility] = useState(
    Statsig.checkGate("enable_delete_todo")
  );

  useEffect(() => {
    setIsTaskCompleted(props.taskData.completed);
  }, []);

  const deleteTaskPressed = (taskData: TodoModel) => {
    props.deleteTodoItem(taskData);
  };

  const completeTaskPressed = (taskData: TodoModel) => {
    if (!isTaskCompleted) {
      taskData.completed = !isTaskCompleted;
      props.completeTodoItem(taskData);
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square} />
        <Text
          style={
            isTaskCompleted ? styles.itemTextStrike : styles.itemTextNormal
          }
        >
          {props.taskData.task}
        </Text>
      </View>
      <View>
        {visibility ? (
          <TouchableOpacity onPress={() => deleteTaskPressed(props.taskData)}>
            <Image
              style={styles.imageBackground}
              source={require("../assets/delete_icon.png")}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity onPress={() => completeTaskPressed(props.taskData)}>
        <View style={styles.circular} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 380,
    flex: 1,
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemLeft: {
    flex: 0.8,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: theme.colors.primary,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemTextNormal: {
    maxWidth: "80%",
  },
  itemTextStrike: {
    maxWidth: "80%",
    textDecorationLine: "line-through",
  },
  imageBackground: {
    width: 10,
    height: 20,
    padding: 11,
    flex: 0.18,
    marginEnd: -20,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    flex: 0.02,
    marginEnd: 10,
  },
});

export default Task;
