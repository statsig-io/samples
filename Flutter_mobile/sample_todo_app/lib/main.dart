import 'package:dynamic_color/dynamic_color.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sample_todo_app/api_key.dart';
import 'package:sample_todo_app/routing/go_router.dart';
import 'package:statsig/statsig.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Statsig.initialize(statsigApiKey, null);
  runApp(const ProviderScope(child: MainApp()));
}

class MainApp extends ConsumerWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return const MaterialApp(
      home: DetectLifecycle(),
    );
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
    final goRouter = ref.watch(goRouterProvider);
    return DynamicColorBuilder(
      builder: (lightColorScheme, darkColorScheme) => MaterialApp.router(
        debugShowCheckedModeBanner: false,
        routerConfig: goRouter,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: lightColorScheme,
          fontFamily: GoogleFonts.rubik().fontFamily,
        ),
        darkTheme: ThemeData(
          useMaterial3: true,
          brightness: Brightness.dark,
          colorScheme: darkColorScheme,
          fontFamily: GoogleFonts.rubik().fontFamily,
        ),
        themeMode: ThemeMode.system,
      ),
    );
  }
}
