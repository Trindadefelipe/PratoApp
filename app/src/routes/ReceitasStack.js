// ============================================================
// ReceitasStack: Stack interno da aba Receitas do PratoTabs.
//
// Telas:
//   * PratoReceitasScreen (raiz, lista)
//   * PratoReceitaDetalheScreen (push ao tocar numa receita)
//
// Responsável: Alana Caled
// ============================================================

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PratoReceitasScreen from '../pages/prato/PratoReceitasScreen';
import PratoReceitaDetalheScreen from '../pages/prato/PratoReceitaDetalheScreen';
import { opcoesStack } from './OpcoesStack';

const Stack = createNativeStackNavigator();

export default function ReceitasStack() {
    return (
        <Stack.Navigator screenOptions={{ ...opcoesStack, headerShown: false }}>
            <Stack.Screen name="ReceitasLista" component={PratoReceitasScreen} />
            <Stack.Screen name="ReceitaDetalhe" component={PratoReceitaDetalheScreen} />
        </Stack.Navigator>
    );
}
