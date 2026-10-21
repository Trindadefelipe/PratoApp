import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/routes/RootStack';
import { useAppFonts } from './src/theme/fonts';

export default function App() {
  const [fontesCarregadas] = useAppFonts();
  if (!fontesCarregadas) return null;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack/>
        <StatusBar style="dark"/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

