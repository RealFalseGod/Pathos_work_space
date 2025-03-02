import { Text, View } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text className="font-bold text-lg my-10">Welcome to my App</Text>
    <Link href='/sign_in'> Sign in</Link>
    </View>
  );
}
