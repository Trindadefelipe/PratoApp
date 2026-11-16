// ============================================================
// sessao: guarda no celular o id da usuária criada no primeiro acesso.
//   * lerIdUsuaria(): id guardado, ou null se ainda não fez o primeiro acesso
//   * guardarIdUsuaria(id): chamado depois do POST /usuarias (#87)
//   * apagarIdUsuaria(): chamado depois de "Apagar meus dados" (#67)
// Responsável: Alana Caled (issue #87)
// ============================================================

import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = 'prato:usuariaId';

export function lerIdUsuaria()        { return AsyncStorage.getItem(CHAVE); }
export function guardarIdUsuaria(id)  { return AsyncStorage.setItem(CHAVE, id); }
export function apagarIdUsuaria()     { return AsyncStorage.removeItem(CHAVE); }