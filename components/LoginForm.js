import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitBtn from "./FormSubmitBtn";
import { isValidEmail, isValidObject, updateError } from "../utils/methods";
import client from "../app/api/client";
import { useLogin } from "../app/context/LoginProvider";
import { signIn } from "../app/api/user";

function LoginForm() {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { setLoginPending } = useLogin();

  const [error, setError] = useState("");

  const { email, password } = userInfo;

  const handleOnchangeText = (value, filedName) => {
    setUserInfo({ ...userInfo, [filedName]: value });
  };

  const isValidForm = () => {
    if (!isValidObject(userInfo))
      return updateError("All fields required", setError);
    if (!isValidEmail(email)) return updateError("Invalid Email", setError);
    if (!password.trim() || password.length < 8)
      return updateError("Password is too short", setError);
    return true;
  };

  const submitForm = async () => {
    setLoginPending(true);
    if (isValidForm()) {
      try {
        const result = await signIn(userInfo.email, userInfo.password);
        // const result = await client.post("/sign-in", { ...userInfo });
        if (result.data.success) {
          setUserInfo({ email: "", password: "" });
          setProfile(result.data.user);
          setIsLoggedIn(true);
        }
        console.log(result.data);
      } catch (error) {
        console.log(error.message);
      }
      // console.log(userInfo);
    }
    setLoginPending(false);
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={(value) => handleOnchangeText(value, "email")}
        label="Email"
        placeholder="example@email.com"
        autoCapitalize="none"
      />
      <FormInput
        value={password}
        onChangeText={(value) => handleOnchangeText(value, "password")}
        label="Password"
        placeholder="********"
        autoCapitalize="none"
        secureEntry
      />
      <FormSubmitBtn title="Login" onPress={submitForm} />
    </FormContainer>
  );
}

export default LoginForm;
