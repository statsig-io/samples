import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Task from "./Task";

type TodoListProps = {
  dataList: any[];
  deleteTodoFromList(itemAt: number, itemValue: any): void;
};

const TodoList = (props: TodoListProps) => {
  useEffect(() => {
    props.deleteTodoFromList(itemAt, itemValue);
  }, []);

  const [itemAt, setItemAt] = useState<number>(0);
  const [itemValue, setItemValue] = useState<any>();

  const deleteSingleTodo = (taskAt: number, item: any) => {
    setItemAt(taskAt);
    setItemValue(item);
    props.deleteTodoFromList(taskAt, item);
  };

  return (
    <FlatList
      data={props.dataList}
      renderItem={({ item, index }) => (
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <Task
              text={item}
              itemAt={index}
              deleteTodoItem={(taskAt: number, text: string) =>
                deleteSingleTodo(taskAt, text)
              }
            />
          </View>
        </View>
      )}
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
