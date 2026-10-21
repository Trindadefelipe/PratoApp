// ============================================================
// BotaoPrimario: botão principal pêssego (Salvar meta, Salvar contato, Salvar no cofre...).
// Usado por todo o grupo. Cores em theme/colors.js.
// ============================================================
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { fonts } from '../theme/fonts';
import { colors } from '../theme/colors';

export default function BotaoPrimario({titulo, onPress, variante = 'primario', desativado = false, style}){
    return(
        <Pressable
            onPress={onPress}
            disabled={desativado}
            style={({pressed}) => [ 
                styles.base,
                styles[variante],
                pressed && styles.pressionado,
                desativado && styles.desativado,
                style,
            ]
        }
        >
            <Text style={[styles.texto, variante === 'positivo' && styles.textoClaro]} >
                {titulo}
            </Text>
        </Pressable>
    )
}

const styles  = StyleSheet.create({
    base: {
        height: 52,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    primario: {
        backgroundColor: colors.pessegoPastel,
    },

    positivo: {
        backgroundColor: colors.verdeProfundo,
    },

    secundario: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
    },

    pressionado: {
        opacity: 0.8,
    },

    desativado: {
        opacity: 0.5,
    },

    texto: {
        fontFamily: fonts.semibold,
        fontSize: 15,
        color: colors.grafite,
    },
    
    textoClaro: {
        color: '#FFFFFF',
    },
})