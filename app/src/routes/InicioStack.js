// ============================================================
// InicioStack: Stack interno da aba Início do SafeTabs.
//
// Telas:
//   * SafeHomeScreen (raiz)
//   * AlertasHistoricoScreen
//   * GuiaDireitosScreen
//   * AutoavaliacaoScreen
//   * ResultadoRiscoScreen (push ao concluir a autoavaliação)
// ============================================================

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SafeHomeScreen  from '../pages/safe/inicio/SafeHomeScreen';
import AlertasHistoricoScreen from '../pages/safe/inicio/AlertasHistoricoScreen';
import GuiaDireitosScreen from '../pages/safe/inicio/GuiaDireitosScreen';
import AutoavaliacaoScreen from '../pages/safe/inicio/AutoavaliacaoScreen';
import ResultadoRiscoScreen from '../pages/safe/inicio/ResultadoRiscoScreen';
import { opcoesStack } from './OpcoesStack';

const Stack = createNativeStackNavigator();

export default function InicioStack(){
    return(
        <Stack.Navigator 
            screenOptions={opcoesStack}
        >
            <Stack.Screen
                name="SafeHome"
                component={SafeHomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AlertasHistorico"
                component={AlertasHistoricoScreen}
                options={{ title: 'Histórico de alertas' }}
            />
            <Stack.Screen
                name="GuiaDireitos"
                component={GuiaDireitosScreen}
                options={{ title: 'Guia de direitos' }}
            />
            <Stack.Screen
                name="Autoavaliacao"
                component={AutoavaliacaoScreen}
                options={{ title: 'Autoavaliação' }}
            />
            <Stack.Screen
                name="ResultadoRisco"
                component={ResultadoRiscoScreen}
                options={{ title: 'Resultado' }}
            />
        </Stack.Navigator>
    )
}