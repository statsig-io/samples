import React, { memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import TodoButton from "../components/TodoButton";
import TodoTextInput from "../components/TodoTextInput";
import { emailValidator, passwordValidator } from "../core/validations";
import { Navigation } from "../Navigation";
import { theme } from "../core/themes";

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.parentContainer}>
      <TodoTextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TodoTextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TodoButton mode="contained" onPress={_onLoginPressed}>
        Login
      </TodoButton>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    marginTop: 220,
    marginStart: 30,
    marginEnd: 30,
  },
  label: {
    color: theme.colors.secondary,
  },
});

export default memo(LoginScreen);
