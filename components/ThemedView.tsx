import { SafeAreaView, ScrollView, StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
//import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { StatusBar } from 'expo-status-bar';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
 // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <>
    <StatusBar style="dark" />

    <ScrollView showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:10,paddingTop:70,paddingHorizontal:15}} >
<View style={[ style]} {...otherProps} />
    </ScrollView>
    </>

  )
  ;
}

const styles = StyleSheet.create({
  container: {
     color: '#808080',
     padding: 5,
     //position: 'static',
    
   },
 
 });