import 'package:dynamic_color/dynamic_color.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sample_todo_app/routing/go_router.dart';
import 'package:statsig/statsig.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Statsig.initialize('client-c16lWDpZfc4ce9lOwfdqHdgKdjw2927rgxFOJElWqrq', StatsigUser(userId: "flutter_dummy_user_id"));
  runApp(const ProviderScope(child: MainApp()));
}

class MainApp extends ConsumerWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
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
