// ============================================================
// PratoTabs: Bottom Tab da fachada Pratô.
// Abas: Diário (PratoHomeScreen), Metas (PratoMetasScreen), Receitas (ReceitasStack: lista e detalhe).
// Responsável: Alana Caled
// ============================================================

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PratoHomeScreen from '../pages/prato/PratoHomeScreen';
import PratoMetasScreen from '../pages/prato/PratoMetasScreen';
import ReceitasStack from './ReceitasStack';
import { criarOpcoesTabs } from './OpcoesTabs';

const Tab = createBottomTabNavigator();

const icones = {
  Diario:   { ativo: 'restaurant', inativo: 'restaurant-outline' },
  Metas:    { ativo: 'disc',       inativo: 'disc-outline' },
  Receitas: { ativo: 'book',       inativo: 'book-outline' },
};

export default function PratoTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator screenOptions={criarOpcoesTabs(icones, insets)}>
      <Tab.Screen name="Diario"   component={PratoHomeScreen} options={{ title: 'Diário' }} />
      <Tab.Screen name="Metas"    component={PratoMetasScreen} />
      <Tab.Screen name="Receitas" component={ReceitasStack} />
    </Tab.Navigator>
  );
}