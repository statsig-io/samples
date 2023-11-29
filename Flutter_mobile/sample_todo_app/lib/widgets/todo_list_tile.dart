import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sample_todo_app/routing/go_router.dart';
import 'package:statsig/statsig.dart';

import '../controllers/todo_controller.dart';
import '../models/todo.dart';

class TodoListTile extends ConsumerWidget {
  const TodoListTile({
    Key? key,
    required this.isVisible,
    required this.todos,
    required this.index,
    required this.lineThrough,
  }) : super(key: key);

  final bool isVisible;
  final List<Todo> todos;
  final int index;
  final bool lineThrough;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    const todoDeleted = "CLIENT_TODO_DELETED";
    const todoCompleted = "CLIENT_TODO_COMPLETED";
    return Visibility(
      visible: isVisible,
      child: Dismissible(
        key: Key(todos[index].id.toString()),
        background: Container(
          padding: const EdgeInsets.only(right: 16.0),
          color: Colors.redAccent.shade700,
          child: const Align(
            alignment: Alignment.centerRight,
            child: Icon(
              Icons.delete,
              color: Colors.white,
            ),
          ),
        ),
        direction: DismissDirection.endToStart,
        onDismissed: (_) {
          ref
              .read(todoControllerProvider)
              .removeTodo(todos[index].id.toString());
        },
        child: ListTile(
          onTap: () {
            context.pushNamed(AppRoute.addTodoScreen.name, extra: todos[index]);
          },
          leading: Checkbox(
            value: todos[index].completed,
            onChanged: (_) {
              final todoData = todos[index];
              todoData.completed = !todos[index].completed;
              ref.read(todoControllerProvider).toggleTodo(todoData);
              if (todos[index].completed) {
                Statsig.logEvent(todoCompleted);
              }
            },
          ),
          title: Text(
            todos[index].task,
            style: lineThrough
                ? const TextStyle(decoration: TextDecoration.lineThrough)
                : null,
          ),
          trailing: Statsig.checkGate("enable_delete_todo")
              ? IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () {
                    ref
                        .read(todoControllerProvider)
                        .removeTodo(todos[index].id.toString());
                    Statsig.logEvent(todoDeleted);
                  },
                )
              : null,
        ),
      ),
    );
  }
}
