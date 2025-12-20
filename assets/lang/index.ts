// Language pack registry
// Maps language codes and versions to their JSON files
// Note: Metro bundler requires static require() calls, so we can't dynamically construct filenames

type LanguagePack = {
  [key: string]: any;
};

// Static map of available language packs
const languagePacks: Record<string, LanguagePack> = {
  'en.1.0.0': require('./en.1.0.0.json'),
};

/**
 * Get a language pack for the specified language and version
 * @param lang Language code (e.g., 'en')
 * @param version App version (e.g., '1.0.0')
 * @returns The language pack object, or falls back to en.1.0.0 if not found
 */
export function getLanguagePack(lang: string, version: string): LanguagePack {
  const key = `${lang}.${version}`;
  const pack = languagePacks[key];

  if (pack) {
    return pack;
  }

  // Fallback to English version
  const fallbackKey = `en.${version}`;
  const fallbackPack = languagePacks[fallbackKey];

  if (fallbackPack) {
    return fallbackPack;
  }

  // Ultimate fallback to en.1.0.0
  return languagePacks['en.1.0.0'] || {};
}

