export enum LanguageCode {
  En = 'en',
  Pl = 'pl',
}

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}

export const LANGUAGES: readonly Language[] = [
  { code: LanguageCode.En, name: 'English', flag: '🇬🇧' },
  { code: LanguageCode.Pl, name: 'Polski', flag: '🇵🇱' },
] as const;

export const DEFAULT_LANG: LanguageCode = LanguageCode.En;
