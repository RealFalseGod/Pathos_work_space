import { Text, View,Button } from "react-native";
import { Link } from "expo-router";
import { NavigationProp } from '@react-navigation/native';
export default function Index({ navigation }: { navigation: NavigationProp<any> }) {
  return (
    <View className='flex-1 justify-center items-center'>
      <View>
        <Text className="pt-10 text-8xl  font-Poppins-semiBold text-center text-[#58cc02] ">
        Pathos
      </Text>
      
       <Text className="text-xl  font-Poppins-semiBold text-center text-[#58cc02] ">
        Level Up Your Mental Health
        </Text>   
        </View>
        <View className='flex-2 justify-end items-center p-4'>
        <Button
  title="GET STARTED"
  onPress={() => navigation.navigate('sign_up')} // Correct screen name ('SignUp' in this case)
/>
<Button
  title="I ALREADY HAVE AN ACCOUNT"
  onPress={() => navigation.navigate('sign_in')} // Correct screen name ('SignUp' in this case)
/>

        
          
        </View>
        </View>
  );
}
