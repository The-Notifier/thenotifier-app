import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useT } from '@/utils/i18n';
import { openNotifierLink } from '@/utils/open-link';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const t = useT();

  // Get app version from Expo config
  const appVersion = Constants.expoConfig?.version || ' ';

  const handleTermsPress = async () => {
    await openNotifierLink('https://www.hapawillow.com/', t);
  };

  const handlePrivacyPress = async () => {
    await openNotifierLink('https://www.hapawillow.com/', t);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Center section with icon and text */}
      <ThemedView style={styles.centerSection}>
        <Image
          source={require('../../assets/images/app-icon-1024x1024.png')}
          style={styles.appIcon}
          contentFit="contain"
        />
        <ThemedText maxFontSizeMultiplier={1.6} style={[styles.appName, { color: colors.text }]}>
          The Notifier
        </ThemedText>
        <ThemedText maxFontSizeMultiplier={1.6} style={[styles.appVersion, { color: colors.text }]}>
          {appVersion}
        </ThemedText>
      </ThemedView>

      {/* Bottom section with buttons */}
      <ThemedView style={[styles.bottomSection, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity
          style={[styles.button, { borderColor: colors.tint }]}
          onPress={handleTermsPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={t('buttonText.termsAndConditions')}>
          <ThemedText maxFontSizeMultiplier={1.6} style={[styles.buttonText, { color: colors.tint }]}>
            {t('buttonText.termsAndConditions')}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { borderColor: colors.tint }]}
          onPress={handlePrivacyPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={t('buttonText.privacyPolicy')}>
          <ThemedText maxFontSizeMultiplier={1.6} style={[styles.buttonText, { color: colors.tint }]}>
            {t('buttonText.privacyPolicy')}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -30 }], // Position slightly above center
  },
  appIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

