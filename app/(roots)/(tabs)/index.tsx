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
    <Text className="font-bold text-lg my-10">Welcome to my Pathos</Text>
    <Link href='/startHome'> Home </Link>
    <Link href='./home'> After Login Home Page  </Link>
    <Link href='./home'> Profile Page  </Link>
    <Link href='./start'> start  </Link>
    </View>
  );
}
