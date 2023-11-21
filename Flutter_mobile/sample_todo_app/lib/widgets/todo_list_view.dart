import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sample_todo_app/repositories/todo_repository.dart';
import 'package:sample_todo_app/widgets/todo_list_tile.dart';

class TodoListView extends ConsumerStatefulWidget {
  const TodoListView({
    super.key,
  });

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _TodoListViewState();
}

class _TodoListViewState extends ConsumerState<TodoListView> {
  bool isUnfinishedVisible = true;
  bool isFinishedVisible = true;

  @override
  Widget build(BuildContext context) {
    final allTodos = ref.watch(allTodoProvider);

    return allTodos.isEmpty
        ? const Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Center(
                child: Text(
                  'Add some tasks',
                  style: TextStyle(fontSize: 18.0),
                ),
              ),
              SizedBox(
                height: 30,
              ),
            ],
          )
        : CustomScrollView(
            slivers: [
              SliverList(
                delegate: SliverChildBuilderDelegate(
                  childCount: allTodos.length,
                  (context, index) => TodoListTile(
                    isVisible: isUnfinishedVisible,
                    todos: allTodos,
                    index: index,
                    lineThrough: allTodos[index].completed,
                  ),
                ),
              ),
            ],
          );
  }
}
