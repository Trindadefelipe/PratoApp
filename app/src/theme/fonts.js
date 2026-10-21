// ============================================================
// Tipografia: Poppins (títulos em semibold, textos em regular e medium).
// Pacotes: expo-font e @expo-google-fonts/poppins.
// ============================================================

import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold,} from '@expo-google-fonts/poppins';

export const fonts = {
  regular:  'Poppins_400Regular',
  medium:   'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold:     'Poppins_700Bold',
};

export function useAppFonts() {
  return useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
}
