// ============================================================
// CirculoStack: Stack interno da aba Círculo do SafeTabs.
//
// Telas:
//   * ContatosListScreen (raiz)
//   * ContatoFormScreen (push para criar ou editar)
//
// Responsável: Felipe Trindade
// ============================================================

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContatosListScreen from '../pages/safe/circulo/ContatosListScreen';
import ContatoFormScreen from '../pages/safe/circulo/ContatoFormScreen';
import { opcoesStack } from "./OpcoesStack";

const Stack = createNativeStackNavigator();

export default function CirculoStack(){
    return(
        <Stack.Navigator 
            screenOptions={opcoesStack}
        >

            <Stack.Screen 
                name="ContatosList"
                component={ContatosListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="ContatoForm"
                component={ContatoFormScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}
