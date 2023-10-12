import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";

const KeyboardAvoidingTextInput = (props) => {

 const addTaskOnPress = () => {
  props.addTask()
  };

  const textChangeListener = (text) => {
  props.changeText(text)
  };

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={props.placeHolderText}
          value={props.taskValue}
          onChangeText={(text) => textChangeListener(text)}
        />
        <TouchableOpacity onPress={addTaskOnPress}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
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
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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


export default KeyboardAvoidingTextInput;