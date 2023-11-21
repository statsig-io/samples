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

class _AddTodoScreenState extends ConsumerState<AddTodoScreen>
    with WidgetsBindingObserver {
  final todoCreated = "CLIENT_TODO_CREATED";
  final todoEdited = "CLIENT_TODO_EDITED";
  final appOpened = "CLIENT_TODO_APP_OPENED";
  final appBackgrounded = "CLIENT_TODO_APP_BACKGROUND";
  late TextEditingController controller;
  bool isSubmitVisible = true;

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.resumed:
        print("app in resumed");
        Statsig.logEvent(appOpened);
        break;
      case AppLifecycleState.inactive:
        print("app in inactive");
        Statsig.logEvent(appBackgrounded);
        break;
      case AppLifecycleState.paused:
        print("app in paused");
        break;
      case AppLifecycleState.detached:
      case AppLifecycleState.hidden:
        break;
    }
  }

  @override
  void initState() {
    super.initState();
    controller = TextEditingController(text: widget.todo?.title ?? '');
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
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
