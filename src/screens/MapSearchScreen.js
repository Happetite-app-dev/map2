// import React from 'react';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const MapSearchScreen = () => {
//   return (
//     <GooglePlacesAutocomplete
//       placeholder='Search'
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//       }}
//       query={{
//         key: 'AIzaSyA2FBudItIm0cVgwNOsuc8D9BKk0HUeUTs',
//         language: 'en',
//       }}
//     />
//   );
// };

// export default MapSearchScreen;




// import React, { Component } from 'react';
// import { Text, View, TextInput } from 'react-native';
// import { Icon } from 'native-base';
// const MY_API_KEY = 'AIzaSyA2FBudItIm0cVgwNOsuc8D9BKk0HUeUTs';
// import Placesearch from 'react-native-placesearch';

// export default class GooglePlaceSearch extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {}
//     this.child = React.createRef();
//   } 


//   KeyUp = () => {
//     this.child.current.searchAddress();
//   };

//   chngText = (data) => {
//     this.child.current.setAddress(data);
//   };


//   render() {
//     return (
//            <Placesearch 
//             apikey={MY_API_KEY} // required *
//             SelectedAddress={(data)=>console.log(data)} // required *
//             country ="IN" //optional
//             ref={this.child}
//             Changeheader={true}
//             CustomHeader={
//             <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
//               <Icon name="search1" type="AntDesign" style={{marginLeft:20,fontSize:20}}/> 
//               <TextInput 
//                 placeholder="Search for Places"
//                 underlineColorAndroid='transparent'
//                 autoFocus={true}
//                 onKeyPress={this.KeyUp}
//                 onChangeText={(value) => this.chngText(value)}
//               />
//             </View>
//              }
//             />
//     );
//   }
// }


// import React, { useState } from 'react'
// import {
//   SafeAreaView,
//   StyleSheet,
//   StatusBar,
//   View
// } from 'react-native'
// import SearchBarWithAutocomplete from '../components/SearchBarWithAutocomplete'
// const MapSearchScreen = () => {
//   const [search, setSearch] = useState({ term: '' })
// const { container, body } = styles
// return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView style={container}>
//         <View style={body}>
//           <SearchBarWithAutocomplete
//             value={search.term}
//             onChangeText={(text) => setSearch({ term: text })}
//           />
//         </View>
//       </SafeAreaView>
//     </>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   body: {
//     paddingHorizontal: 20
//   }
// })
// export default MapSearchScreen


import React, { useState } from 'react'
import {
  ...
} from 'react-native'
// ==== Change No.1 ====
import axios from 'axios'
import SearchBarWithAutocomplete from './components/SearchBarWithAutocomplete'
// ==== Change No.2 ====
const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'
// ==== Change No.3 ====
/**
 * Prediction's type returned from Google Places Autocomplete API
 * https://developers.google.com/places/web-service/autocomplete#place_autocomplete_results
*/
export type PredictionType = {
  description: string
  place_id: string
  reference: string
  matched_substrings: any[]
  tructured_formatting: Object
  terms: Object[]
  types: string[]
}
const MapSearchScreen = () => {
  // === Change No.4 ====
  const [search, setSearch] = useState({ term: '', fetchPredictions: false })
  // ==== Change No.5 ====
  const [predictions, setPredictions] = useState<PredictionType[]>([])
  const { container, body } = styles
  // ==== Change No.6 ====
  /**
   * Grab predictions on entering text
   *    by sending reqyest to Google Places API.
   * API details: https://developers.google.com/maps/documentation/places/web-service/autocomplete
  */
  const onChangeText = async () => {
    if (search.term.trim() === '') return
    if (!search.fetchPredictions) return
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${env.GOOGLE_API_KEY}&input=${search.term}`
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl
      })
      if (result) {
        const { data: { predictions } } = result
        setPredictions(predictions)
      }
    } catch (e) {
      console.log(e)
    }
  }
  // ==== Change No. 7====
  /**
   * Grab lattitude and longitude on prediction tapped
   *    by sending another reqyest using the place id.
   * You can check what kind of information you can get at:
   *    https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsRequests
  */
  const onPredictionTapped = async (placeId: string, description: string) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${env.GOOGLE_API_KEY}&place_id=${placeId}`
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl
      })
      if (result) {
        const { data: { result: { geometry: { location } } } } = result
        const { lat, lng } = location
        setShowPredictions(false)
        setSearch({ term: description })
      }
    } catch (e) {
      console.log(e)
    }
  }
return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={container}>
        <View style={body}>
          <SearchBarWithAutocomplete
            value={search.term}
            // ==== Change No. 8 ====
            onChangeText={(text) => {
              setSearch({ term: text, fetchPredictions: true })
              onChangeText()
            }}
            showPredictions={showPredictions}
            predictions={predictions}
            onPredictionTapped={onPredictionTapped}
          />
        </View>
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    paddingHorizontal: 20
  }
})
export default MapSearchScreen