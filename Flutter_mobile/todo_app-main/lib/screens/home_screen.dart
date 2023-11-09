import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_app/providers/drawer_index_provider.dart';
import 'package:todo_app/screens/tasks/tasks_screen.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(drawerIndexProvider);
    return Scaffold(
      body: [const TasksScreen()][index],
    );
  }
}
