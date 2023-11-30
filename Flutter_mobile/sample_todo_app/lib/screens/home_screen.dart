import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sample_todo_app/screens/tasks/tasks_screen.dart';
import 'package:statsig/statsig.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return const DetectLifecycle();
  }
}

class DetectLifecycle extends ConsumerStatefulWidget {
  const DetectLifecycle({Key? key}) : super(key: key);

  @override
  ConsumerState<ConsumerStatefulWidget> createState() {
    return _DetectLifecycleState();
  }
}

class _DetectLifecycleState extends ConsumerState<DetectLifecycle>
    with WidgetsBindingObserver {
  final appOpened = "CLIENT_TODO_APP_OPENED";
  final appBackgrounded = "CLIENT_TODO_APP_BACKGROUND";

  @override
  void initState() {
    WidgetsBinding.instance.addObserver(this);
    super.initState();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.resumed:
        Statsig.logEvent(appOpened);
        break;
      case AppLifecycleState.inactive:
        Statsig.logEvent(appBackgrounded);
        break;
      case AppLifecycleState.paused:
      case AppLifecycleState.detached:
      case AppLifecycleState.hidden:
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: [const TasksScreen()][0],
    );
  }
}
