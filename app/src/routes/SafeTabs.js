// ============================================================
// SafeTabs: Bottom Tab da área protegida SAFE.
//
// Abas, cada uma com seu Stack interno:
//   * Início (InicioStack)
//   * Círculo (CirculoStack)
//   * Viagem (ViagemStack)
//   * Cofre (CofreStack)
//   * Ajustes (AjustesStack)
//
// Responsáveis: Felipe Trindade e Alana Caled
// ============================================================
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InicioStack from './InicioStack';
import CirculoStack from './CirculoStack';
import ViagemStack from './ViagemStack';
import CofreStack from './CofreStack';
import AjustesStack from './AjustesStack';
import { criarOpcoesTabs } from './OpcoesTabs';

const Tab = createBottomTabNavigator();

const icones = {
  Inicio:  { ativo: 'home',        inativo: 'home-outline' },
  Circulo: { ativo: 'people',      inativo: 'people-outline' },
  Viagem:  { ativo: 'location',    inativo: 'location-outline' },
  Cofre:   { ativo: 'lock-closed', inativo: 'lock-closed-outline' },
  Ajustes: { ativo: 'options',     inativo: 'options-outline' },
};

export default function SafeTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator screenOptions={criarOpcoesTabs(icones, insets)}>
      <Tab.Screen name="Inicio"  component={InicioStack}  options={{ title: 'Início' }} />
      <Tab.Screen name="Circulo" component={CirculoStack} options={{ title: 'Círculo' }} />
      <Tab.Screen name="Viagem"  component={ViagemStack} />
      <Tab.Screen name="Cofre"   component={CofreStack} />
      <Tab.Screen name="Ajustes" component={AjustesStack} />
    </Tab.Navigator>
  );
}