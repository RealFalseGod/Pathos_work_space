import { Text, View } from "react-native";
import { Link } from "expo-router";
import Start from "./start";
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
    <Link href='./StartHome'> Home </Link>
    <Link href='./Home'> After Login Home Page  </Link>
    <Link href='./Profile_page'> Profile Page  </Link>
    <Link href='./(tabs)/Start'> start  </Link>
    </View>
  );
}
