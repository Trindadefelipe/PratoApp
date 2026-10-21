// ============================================================
// PratoTabs: Bottom Tab da fachada Pratô.
// Abas: Diário (PratoHomeScreen), Metas (PratoMetasScreen), Receitas (PratoReceitasScreen).
// Responsável: Alana Caled
// ============================================================

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PratoHomeScreen from '../pages/prato/PratoHomeScreen';
import PratoMetasScreen from '../pages/prato/PratoMetasScreen';
import PratoReceitasScreen from '../pages/prato/PratoReceitasScreen';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const icones = {
  Diario:   { ativo: 'restaurant',   inativo: 'restaurant-outline' },
  Metas:    { ativo: 'disc',         inativo: 'disc-outline' },
  Receitas: { ativo: 'book',         inativo: 'book-outline' },
};

export default function PratoTabs(){
    const insets = useSafeAreaInsets();
    return(
        <Tab.Navigator
            screenOptions={({route})=> ({
                headerShown: false,
                tabBarActiveTintColor: colors.verdeProfundo,
                tabBarInactiveTintColor: colors.cinza,
                tabBarStyle: {
                    height: 68 + insets.bottom,
                    paddingTop: 8,
                    paddingBottom: 8 + insets.bottom,
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: colors.pessegoClaro,
                },
                
                // tabBarLabelStyle: {fontFamily: fonts.medium, fontSize: 12},
                tabBarIcon: ({focused, color}) => (
                    <View style={[styles.pilula, focused && styles.pilulaAtiva]}>
                        <Ionicons name={focused ? icones[route.name].ativo : icones[route.name].inativo }
                        size={20}
                        color={color}/>
                    </View>
                ),
                tabBarLabel: ({ focused, color, children }) => (
                    <Text style={[styles.texto, { color }, focused && styles.textoAtivo]}>
                        {children}
                    </Text>
                ),
            })}
        >

            <Tab.Screen name='Diario'   component={PratoHomeScreen} options={{title: 'Diário'}}/>
            <Tab.Screen name='Metas'    component={PratoMetasScreen}/>
            <Tab.Screen name='Receitas' component={PratoReceitasScreen}/>

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
  pilula: {
    width: 44,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pilulaAtiva: {
    backgroundColor: colors.pessegoClaro,
  },
  texto: {
    fontFamily: fonts.medium,
    fontSize: 11,
    marginTop: 2,
  },
  textoAtivo: {
    fontFamily: fonts.semibold,
  },
});