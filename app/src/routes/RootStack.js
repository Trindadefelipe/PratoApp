// ============================================================
// RootStack: Stack Navigator raiz, sem cabeçalho (Entrega 1, seção 5).
//
// Contém PratoTabs (fachada, tela inicial) e SafeTabs (área protegida).
//   * PIN correto em Metas ou toque longo no logotipo: navigation.reset para SafeTabs
//   * Saída rápida (Entrega 3): navigation.reset para PratoTabs
//
// Responsáveis: Felipe Trindade e Alana Caled (cartão "Setup do Expo e React Navigation")
// ============================================================

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PratoTabs from './PratoTabs';
import SafeTabs from './SafeTabs';

const Stack = createNativeStackNavigator();

export default function RootStack(){
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >

            <Stack.Screen name='PratoTabs' component={PratoTabs}/>
            <Stack.Screen name='SafeTabs' component={SafeTabs}/>

        </Stack.Navigator>
    )
}