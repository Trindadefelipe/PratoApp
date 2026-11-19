// ============================================================
// sessao: guarda no celular o id da usuária criada no primeiro acesso.
//   * lerIdUsuaria(): id guardado, ou null se ainda não fez o primeiro acesso
//   * guardarIdUsuaria(id): chamado depois do POST /usuarias (#87)
//   * apagarIdUsuaria(): chamado depois de "Apagar meus dados" (#67)
//   * idUsuariaAtual(): id guardado ou, sem primeiro acesso, a usuária de teste do seed
// Responsável: Alana Caled (issue #87)
// ============================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USUARIA_TESTE_ID } from './api';

const CHAVE = 'prato:usuariaId';

export function lerIdUsuaria()        { return AsyncStorage.getItem(CHAVE); }
export function guardarIdUsuaria(id)  { return AsyncStorage.setItem(CHAVE, id); }
export function apagarIdUsuaria()     { return AsyncStorage.removeItem(CHAVE); }

export async function idUsuariaAtual() {
    const id = await lerIdUsuaria().catch(() => null);
    return id || USUARIA_TESTE_ID;
}