// ============================================================
// RootStack: Stack Navigator raiz, sem cabeçalho (Entrega 1, seção 5).
//
// Contém PrimeiroAcesso, PratoTabs (fachada) e SafeTabs (área protegida).
//   * Sem id de usuária guardado no celular: abre PrimeiroAcesso (#87)
//   * Com id guardado: abre direto PratoTabs
//   * PIN correto em Metas ou toque longo no logotipo: navigation.reset para SafeTabs
//   * Saída rápida (Entrega 3): navigation.reset para PratoTabs
//
// Responsável: Alana Caled (cartão "Setup do Expo e React Navigation")
// ============================================================

import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PratoTabs from './PratoTabs';
import SafeTabs from './SafeTabs';
import PratoPrimeiroAcessoScreen from '../pages/prato/PratoPrimeiroAcessoScreen';
import { lerIdUsuaria } from '../services/sessao';

const Stack = createNativeStackNavigator();

export default function RootStack(){
    const [rotaInicial, setRotaInicial] = useState(null);

    useEffect(() => {
        lerIdUsuaria()
            .then((id) => setRotaInicial(id ? 'PratoTabs' : 'PrimeiroAcesso'))
            .catch(() => setRotaInicial('PrimeiroAcesso'));
    }, []);

    if (!rotaInicial) return null;

    return(
        <Stack.Navigator
            initialRouteName={rotaInicial}
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='PrimeiroAcesso' component={PratoPrimeiroAcessoScreen}/>
            <Stack.Screen name='PratoTabs' component={PratoTabs}/>
            <Stack.Screen name='SafeTabs' component={SafeTabs}/>
        </Stack.Navigator>
    )
}