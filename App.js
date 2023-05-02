import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./components/navigations/MainNavigator";
import LoginProvider from "./app/context/LoginProvider";

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}
