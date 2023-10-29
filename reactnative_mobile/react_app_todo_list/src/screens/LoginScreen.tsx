import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
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
      <CustomTextInput
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

      <CustomTextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <CustomButton mode="contained" onPress={_onLoginPressed}>
        Login
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    marginTop: 140,
  },
  label: {
    color: theme.colors.secondary,
  },
});

export default memo(LoginScreen);
