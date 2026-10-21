// ============================================================
// TELA 01: Diário de hoje
//
// Componente: PratoHomeScreen
// Navegação: Tab (aba Diário), tela inicial do app
// Responsável: Alana Caled
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Data do dia e logotipo do prato (toque longo de 2s abre o SAFE)
//   * Campo de busca de alimento
//   * Anel de calorias: kcal restantes e consumidas em relação à meta
//   * Lista de refeições: café da manhã, almoço, lanche e jantar
//   * Contador de copos de água
// ============================================================

import { Text, View } from "react-native";
import BotaoPrimario from '../../components/BotaoPrimario';

export default function PratoHomeScreen({navigation}){
    return(
        <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 16 }}>
            <Text>PratoHomeScreen</Text>
            <BotaoPrimario
                titulo="Entrar no SAFE (teste)"
                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SafeTabs' }] })}
            />
        </View>
        
    )
}
