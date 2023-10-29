import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input, DefaultTheme } from "react-native-paper";

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const CustomTextInput = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={"#600EE6"}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: DefaultTheme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: "#f13a59",
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(CustomTextInput);
