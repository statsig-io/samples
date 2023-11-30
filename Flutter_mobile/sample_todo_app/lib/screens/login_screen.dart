import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:sample_todo_app/routing/go_router.dart';
import 'package:statsig/statsig.dart';

import '../api_key.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool isLoading = false;

  void updateStatsigUser(BuildContext context) async {
    setState(() {
      isLoading = true;
    });
    await Statsig.initialize(
        statsigApiKey, StatsigUser(userId: "flutter_dummy_user_id"));
    Future.delayed(const Duration(milliseconds: 3000), () {
      setState(() {
        isLoading = false;
      });
      context.pushNamed(AppRoute.homeScreen.name);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            const Padding(
              padding:
                  EdgeInsets.only(left: 30.0, right: 30.0, top: 220, bottom: 0),
              child: TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Username',
                ),
              ),
            ),
            const Padding(
              padding:
                  EdgeInsets.only(left: 30.0, right: 30.0, top: 15, bottom: 0),
              child: TextField(
                obscureText: true,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Password',
                ),
              ),
            ),
            SizedBox(
              height: 65,
              width: 355,
              child: Padding(
                padding: const EdgeInsets.only(top: 20.0),
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      primary: Colors.blue, // background
                      onPrimary: Colors.white, // foreground
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5),
                      )),
                  onPressed: () {
                    updateStatsigUser(context);
                  },
                  child: const Text(
                    'Log in ',
                    style: TextStyle(color: Colors.white, fontSize: 20),
                  ),
                ),
              ),
            ),
            Visibility(
                visible: isLoading,
                child: const Padding(
                    padding: EdgeInsets.only(top: 30),
                    child: SizedBox(
                      height: 50,
                      width: 50,
                      child: CircularProgressIndicator(),
                    )))
          ],
        ),
      ),
    );
  }
}
