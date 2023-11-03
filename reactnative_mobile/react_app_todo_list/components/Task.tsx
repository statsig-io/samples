import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Statsig } from "statsig-react-native-expo";

type TaskProps = {
  text: string;
  itemAt: number;
  deleteTodoItem(itemAt: number, itemValue: string): void;
};

const Task = (props: TaskProps) => {
  const [visibility, setVisibility] = useState(
    Statsig.checkGate("enable_delete_todo")
  );

  const deleteTaskPressed = (taskAt: number, text: string) => {
    props.deleteTodoItem(taskAt, text);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square} />
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View>
        {visibility ? (
          <TouchableOpacity
            onPress={() => deleteTaskPressed(props.itemAt, props.text)}
          >
            <Image
              style={styles.imageBackground}
              source={require("../assets/delete_icon.png")}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.circular} />
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
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
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
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
    flex: 0.02,
  },
});

export default Task;