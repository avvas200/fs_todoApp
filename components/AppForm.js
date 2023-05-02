import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
import FormHeader from "../components/FormHeader";
import FormSelectorBtn from "../components/FormSelectorBtn";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useEffect, useRef } from "react";
import axios from "axios";
import AppLoader from "./AppLoader";
import { useLogin } from "../app/context/LoginProvider";

const { width } = Dimensions.get("window");

export default function AppForm({ navigation }) {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();
  const { loginPending } = useLogin();

  const fetchApi = async () => {
    try {
      const res = await axios.get("http://192.168.1.52:8000/");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40],
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,1)", "rgba(27,27,51,0.4)"],
  });
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,0.4)", "rgba(27,27,51,1)"],
  });
  return (
    <>
      <View style={{ flex: 1, paddingTop: 120 }}>
        <View style={{ height: 100 }}>
          <FormHeader
            leftHeading="Welcome"
            rightHeading=" Back"
            subHeading="Mangaing Task"
            rightHeaderOpacity={rightHeaderOpacity}
            leftHeaderTranslateX={leftHeaderTranslateX}
            rightHeaderTranslateY={rightHeaderTranslateY}
          />
        </View>
        <View style={{ flexDirection: "row", padding: 20 }}>
          <FormSelectorBtn
            style={styles.borderLeft}
            title="Login"
            backgroundColor={loginColorInterpolate}
            onPress={() => scrollView.current.scrollTo({ x: 0 })}
          />
          <FormSelectorBtn
            style={styles.borderRight}
            title="Sign up"
            backgroundColor={signupColorInterpolate}
            onPress={() => scrollView.current.scrollTo({ x: width })}
          />
        </View>
        <ScrollView
          ref={scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: animation } } }],
            { useNativeDriver: false }
          )}
        >
          <LoginForm navigation={navigation} />

          <ScrollView>
            <SignupForm navigation={navigation} />
          </ScrollView>
        </ScrollView>
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
