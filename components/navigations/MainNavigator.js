import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppForm from "../AppForm";
import UserProfile from "../UserProfile";
import DrawerNavigator from "../navigations/DrawerNavigation";
import { useLogin } from "../../app/context/LoginProvider";
import AppLoader from "../AppLoader";
import ImageUpload from "../ImageUplaod";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
      <Stack.Screen component={ImageUpload} name="ImageUpload" />
      <Stack.Screen component={UserProfile} name="UserProfile" />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn, loginPending } = useLogin();
  return isLoggedIn ? (
    <>
      <DrawerNavigator />
      {loginPending ? <AppLoader /> : null}
    </>
  ) : (
    <StackNavigator />
  );
};
export default MainNavigator;
