import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Task = (props) => {
  const deleteTaskPressed = (taskAt, text) => {
    props.deleteTodoItem(taskAt, text);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteTaskPressed(props.itemAt, props.text)}
      >
        <Image
          style={styles.imageBackground}
          source={require("../assets/delete.png")}
        />
      </TouchableOpacity>
      <View style={styles.circular}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
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
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
  imageBackground: {
    width: 15,
    height: 25,
  },
});

export default Task;
