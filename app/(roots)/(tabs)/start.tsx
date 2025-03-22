import { StyleSheet, Text, View, TextInput,Button,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link,useRouter } from "expo-router";
const Start = () => {
    const router = useRouter();
    const [step,setStep] = useState(1);
    const [name, setName] = useState('');
    const [birthdate, setBirthDate] = useState(new Date());
    const [gender,setGender] = useState('');
    const [seek,setSeek] = useState('');
    const [mood,setMood] = useState('');
    const [show,setShow] = useState(false);
    const [struggle,setStruggle] = useState('');
    const [goal,setGoal] = useState('');
    const handleDateChange = (event: any , selectedDate : any) => {
        if(selectedDate){
            setBirthDate(selectedDate);
        }
        setShow(false);
    };

  return (
    <View>
    {step === 1 && (
    <View className='p-4 justify-center'>
      <Text>Who are you?</Text>
        <TextInput 
        className="border border-gray-400 p-2 w-full"
        placeholder="Enter your name" 
        value={name} 
        onChangeText ={setName}/>

        <Text>Birthdate</Text>
        <Button title="Select Birthdate" onPress={() => setShow(true)}/>
        {show && (<DateTimePicker
        value={birthdate || new Date() } 
        mode={'date'}
        onChange={handleDateChange}
        />)}
       <Text>Selected: {birthdate.toDateString()}</Text>
        <Text>
          Gender:
        </Text>
        {['Male','Female','Other'].map((item,index) => (
          <TouchableOpacity key={`${item}-${index}`} onPress={() => setGender(item)}>

          <Text className={`p-2 border border-gray-400 my-1 rounded-md 
              ${gender === item ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} >{item}</Text>
            </TouchableOpacity>
        ))}
        
    </View>
    )}
    {step === 2 && (
      <View>
        <Text>How are You?</Text>
        <Text>How do you feel on a general Basis?</Text>
        {['Happy','Sad','Angry','Anxious','Tired','Confused'].map((item,index) => (
          <TouchableOpacity key={`${item}-${index}`} onPress={() => setMood(item)}>
          <Text className={`p-2 border border-gray-400 my-1 rounded-md 
              ${mood === item ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} >{item}</Text>
            </TouchableOpacity>
        ))}
        <Text>What do you Seek?</Text>
        {['Greatness','Peace','Be Better than You','Be Better than others'].map((item,index) => (
          <TouchableOpacity key={`${item}-${index}`} onPress={() => setSeek(item)}>
          <Text className={`p-2 border border-gray-400 my-1 rounded-md 
              ${seek === item ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} >{item}</Text>
            </TouchableOpacity>
        ))}
        <Text>What do Struggle with Daily?</Text>
        {['Time Management','Stress & Anxiety','Physical Health','Discipline & Consistency','Procrastination','Emotional imbalance'].map((item,index) => (
          <TouchableOpacity key={`${item}-${index}`} onPress={() => setStruggle(item)}>
          <Text className={`p-2 border border-gray-400 my-1 rounded-md 
              ${struggle === item ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} >{item}</Text>
            </TouchableOpacity>
        ))}
      </View>
      
    )}
    {step ===3 && (
      <View>
        
      <Text>How the Pathos works</Text>
      <Text>Some boring rules and regulations blah blah</Text>
      </View>
    )}
    {step ===4 && (
      <View>
        
      <Text>Do you want your goals to be?</Text>
      {['Daily','Weekly','Monthly','Yearly'].map((item,index) => (
          <TouchableOpacity key={`${item}-${index}`} onPress={() => setGoal(item)}>
          <Text className={`p-2 border border-gray-400 my-1 rounded-md 
              ${goal === item ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} >{item}</Text>
            </TouchableOpacity>
        ))}
      </View>
    )}
     {/* Navigation Buttons */}
     <View className="flex-row justify-between mt-4">
        {step > 1 && (
          <TouchableOpacity className="p-2 bg-gray-300 rounded-md" onPress={() => setStep(step - 1)}>
            <Text>Back</Text>
          </TouchableOpacity>
        )}
        {step < 4 && (
          <TouchableOpacity className="p-2 bg-blue-500 rounded-md" onPress={() => setStep(step + 1)}>
            <Text className="text-white">Next</Text>
          </TouchableOpacity>
        ) }
        {step ===4  && (
          <TouchableOpacity className="p-2 bg-blue-500 rounded-md" onPress={() => router.push('./Home')}>
            <Text className="text-white">Finish</Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  )
}

export default Start

const styles = StyleSheet.create({})