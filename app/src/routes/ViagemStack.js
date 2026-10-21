// ============================================================
// ViagemStack: Stack interno da aba Viagem do SafeTabs.
//
// Telas:
//   * ViagemNovaScreen (raiz)
//   * ViagemEmAndamentoScreen (replace ao iniciar)
//
// Responsável: Higor Bueno
// ============================================================

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViagemNovaScreen from '../pages/safe/viagem/ViagemNovaScreen';
import ViagemEmAndamentoScreen from '../pages/safe/viagem/ViagemEmAndamentoScreen';
import { opcoesStack } from "./OpcoesStack";

const Stack = createNativeStackNavigator();

export default function ViagemStack(){
    return(
        <Stack.Navigator
            screenOptions={opcoesStack}
        >

            <Stack.Screen
                name="ViagemNova"
                component={ViagemNovaScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ViagemEmAndamento"
                component={ViagemEmAndamentoScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}
