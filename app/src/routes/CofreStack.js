// ============================================================
// CofreStack: Stack interno da aba Cofre do SafeTabs.
//
// Telas:
//   * IncidentesListScreen (raiz)
//   * IncidenteFormScreen (push pelo botão +)
//   * IncidenteDetalheScreen (push ao abrir um item)
//
// Responsável: João Pedro
// ============================================================

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IncidentesListScreen from '../pages/safe/cofre/IncidentesListScreen';
import IncidenteFormScreen from '../pages/safe/cofre/IncidenteFormScreen';
import IncidenteDetalheScreen from '../pages/safe/cofre/IncidenteDetalheScreen';
import { opcoesStack } from "./OpcoesStack";

const Stack = createNativeStackNavigator();

export default function CofreStack(){
    return(
        <Stack.Navigator
            screenOptions={opcoesStack}
        >

            <Stack.Screen
                name="IncidentesList"
                component={IncidentesListScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="IncidenteForm"
                component={IncidenteFormScreen}
                options={{title: 'Registro'}}
            />
            <Stack.Screen
                name="IncidenteDetalhe"
                component={IncidenteDetalheScreen}
                options={{title: 'Incidente'}}
            />

        </Stack.Navigator>
    )
}