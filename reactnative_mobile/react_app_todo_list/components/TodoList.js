import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";
import {useEffect} from 'react';
import Task from "./Task";

const TodoList = (props) => {

useEffect((taskAt, item) => {
  props.todoTaskDone(taskAt, item)
}, []);

const deleteTodo = (taskAt, item) => {
  props.todoTaskDone(taskAt, item)
}

return(
    <FlatList
        data={props.dataList}
        renderItem={({ item, index }) => (
          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              <TouchableOpacity key={index} onPress={() => deleteTodo(index, item)}>
                <Task text={item} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      />
)
}

const styles = StyleSheet.create({
  tasksWrapper: {
    paddingTop: 1,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 1,
  },
});

export default TodoList;