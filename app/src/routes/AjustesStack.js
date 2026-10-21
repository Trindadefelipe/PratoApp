// ============================================================
// AjustesStack: Stack interno da aba Ajustes do SafeTabs.
//
// Telas:
//   * PerfilConfigScreen (raiz)
//   * ConfigCamuflagemScreen (push)
//
// Responsável: Alana Caled
// ============================================================

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerfilConfigScreen from '../pages/safe/ajustes/PerfilConfigScreen';
import ConfigCamuflagemScreen from '../pages/safe/ajustes/ConfigCamuflagemScreen';
import { opcoesStack } from "./OpcoesStack";

const Stack = createNativeStackNavigator();

export default function AjustesStack(){
    return(
        <Stack.Navigator
            screenOptions={opcoesStack}
        >

            <Stack.Screen
                name="PerfilConfig"
                component={PerfilConfigScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ConfigCamuflagem"
                component={ConfigCamuflagemScreen}
                options={{title: 'Camuflagem'}}
            />

        </Stack.Navigator>
    )
}
