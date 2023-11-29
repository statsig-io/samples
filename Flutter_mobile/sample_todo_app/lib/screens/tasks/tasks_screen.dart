import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:sample_todo_app/routing/go_router.dart';
import 'package:statsig/statsig.dart';

import '../../widgets/todo_list_view.dart';

class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> {
  Color fromHex(String? hexString) {
    if (hexString == null) {
      return Colors.transparent;
    }
    final buffer = StringBuffer();
    if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
    buffer.write(hexString.replaceFirst('#', ''));
    return Color(int.parse(buffer.toString(), radix: 16));
  }

  @override
  Widget build(BuildContext context) {
    final bannerConfig = Statsig.getConfig("warning_banner");
    final bannerMsg = bannerConfig.get("message", "NA");
    final bannerBkgColor = fromHex(bannerConfig.get("backgroundColor", null));
    final bannerTxtColor = fromHex(bannerConfig.get("textColor", null));

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Tasks'),
      ),
      body: Column(mainAxisSize: MainAxisSize.max, children: [
        (bannerMsg != "NA")
            ? Center(
                child: Text(
                bannerMsg ?? "",
                style: TextStyle(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                    backgroundColor: bannerBkgColor,
                    color: bannerTxtColor),
              ))
            : const Text(''),
        const Expanded(child: TodoListView())
      ]),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.pushNamed(AppRoute.addTodoScreen.name);
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
