import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Task from "./Task";
import { Statsig } from "statsig-react";

type TodoListProps = {
  dataList: TodoModel[];
  deleteTodoFromList(itemValue: TodoModel): void;
  completeTodoFromList(itemValue: TodoModel): void;
};

const TodoList = (props: TodoListProps) => {
  const TODO_LIST_VIEWED = "CLIENT_TODO_LIST_VIEWED";
  const TODO_DELETED = "CLIENT_TODO_DELETED";
  const TODO_COMPLETED = "CLIENT_TODO_COMPLETED";
  const [itemValue, setItemValue] = useState<TodoModel>();

  useEffect(() => {
    if (itemValue != null) {
      props.deleteTodoFromList(itemValue);
    }
  }, []);

  const deleteSingleTodo = (item: TodoModel) => {
    setItemValue(item);
    Statsig.logEvent(TODO_DELETED);
    props.deleteTodoFromList(item);
  };

  const completeSingleTodo = (item: TodoModel) => {
    setItemValue(item);
    Statsig.logEvent(TODO_COMPLETED);
    props.completeTodoFromList(item);
  };

  const listItemAddedComponent = () => {
    if (props.dataList != null && props.dataList.length == 1) {
      Statsig.logEvent(TODO_LIST_VIEWED);
    }
    return <View />;
  };

  return (
    <FlatList
      data={props.dataList}
      renderItem={({ item, index }) => (
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <Task
              taskData={item}
              itemAt={index}
              deleteTodoItem={(todoObj: TodoModel) => deleteSingleTodo(todoObj)}
              completeTodoItem={(todoObj: TodoModel) =>
                completeSingleTodo(todoObj)
              }
            />
          </View>
        </View>
      )}
      ListFooterComponent={listItemAddedComponent}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
    />
  );
};

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
