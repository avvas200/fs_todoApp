import { View } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const UserProfile = ({ navigation }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row", alignContent: "flex-end" }}>
      <Text>User Profile</Text>
      <TouchableOpacity
        style={{
          margin: 30,
          padding: 30,
        }}
        onPress={() => {
          //navigation.navigate("ImageUpload");
        }}
      >
        <Text>Set Profile Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
