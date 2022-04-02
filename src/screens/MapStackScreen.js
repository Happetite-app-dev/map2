import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "./MapScreen";
import MapSearchScreen from "./MapSearchScreen";

const MapStack = createNativeStackNavigator(); 

const MapStackScreen=()=>{
    return(
        <MapStack.Navigator initialRouteName="MapScreen" screenOptions={screenOptions}>
            <MapStack.Screen name="MapScreen" component={MapScreen}/>
            <MapStack.Screen name="MapSearchScreen" component={MapSearchScreen}/>
        </MapStack.Navigator>
    )
}


const screenOptions=({ route }) => ({
    headerShown:true,
  })

export default MapStackScreen;
