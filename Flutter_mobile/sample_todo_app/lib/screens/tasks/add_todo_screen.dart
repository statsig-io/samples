import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sample_todo_app/controllers/todo_controller.dart';
import 'package:statsig/statsig.dart';

import '../../models/todo.dart';

class AddTodoScreen extends ConsumerStatefulWidget {
  const AddTodoScreen({
    Key? key,
    this.todo,
  }) : super(key: key);
  final Todo? todo;

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _AddTodoScreenState();
}

class _AddTodoScreenState extends ConsumerState<AddTodoScreen> {
  final todoCreated = "CLIENT_TODO_CREATED";
  final todoEdited = "CLIENT_TODO_EDITED";
  late TextEditingController controller;
  bool isSubmitVisible = true;

  @override
  void initState() {
    super.initState();
    controller = TextEditingController(text: widget.todo?.title ?? '');
  }

  void canSubmit() {
    setState(() {
      isSubmitVisible = controller.text.isNotEmpty;
    });
  }

  @override
  Widget build(BuildContext context) {
    void saveTodo() {
      if (widget.todo == null) {
        ref.read(todoControllerProvider).addTodo(controller.text.trim());
        Statsig.logEvent(todoCreated);
      } else {
        ref
            .read(todoControllerProvider)
            .editTodo(widget.todo!.id, controller.text.trim());

        Statsig.logEvent(todoEdited);
      }
      context.pop();
    }

    return Scaffold(
      appBar: AppBar(
        title: controller.text.isEmpty
            ? const Text('Add a task')
            : const Text('Edit task'),
        actions: [
          IconButton(
            icon: const Icon(Icons.check),
            onPressed: isSubmitVisible ? saveTodo : null,
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
        child: Column(
          children: [
            TextField(
              controller: controller,
              autofocus: true,
              onSubmitted: (_) {
                saveTodo();
              },
              onChanged: (_) => canSubmit(),
              decoration: InputDecoration(
                hintText: 'Task',
                label: const Text('Your task'),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12.0),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
