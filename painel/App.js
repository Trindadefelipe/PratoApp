// ============================================================
// Painel da Delegacia (Entrega Final): app web em React Native (Expo + react-native-web).
// Projeto separado do app da usuária: a delegacia nunca instala o Pratô.
// Rodar: npm install e depois npm start (abre no navegador).
// ============================================================
import { StatusBar } from 'expo-status-bar';
import PainelScreen from './src/PainelScreen';
import { useAppFonts } from './src/theme/fonts';

export default function App() {
  const [fontesCarregadas] = useAppFonts();
  if (!fontesCarregadas) return null;
  return (
    <>
      <PainelScreen />
      <StatusBar style="dark" />
    </>
  );
}
