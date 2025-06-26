import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { DEFAULT_LANG, Language, LanguageCode, LANGUAGES } from './translate-langs';

@Component({
  standalone: true,
  selector: 'lib-translate-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  imports: [CommonModule, TranslateModule, MatSelectModule],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  readonly languages = LANGUAGES;
  currentLang: LanguageCode = DEFAULT_LANG;

  ngOnInit(): void {
    const savedLang = localStorage.getItem('app_language');
    const browserLang = this.translate.getBrowserLang() ?? null;

    const lang: LanguageCode = this.isSupportedLang(savedLang)
      ? savedLang
      : this.isSupportedLang(browserLang)
        ? browserLang
        : DEFAULT_LANG;

    this.translate.addLangs(this.languages.map((l) => l.code));
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.translate.use(lang);
    this.currentLang = lang;
  }

  switchLanguage(lang: LanguageCode): void {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('app_language', lang);
  }

  getLangMeta(code: LanguageCode): Language {
    const lang = this.languages.find((lang) => lang.code === code);
    if (!lang) {
      throw new Error(`Language not found: ${code}`);
    }

    return lang;
  }

  private isSupportedLang(code: string | null): code is LanguageCode {
    return this.languages.some((lang) => lang.code === code);
  }
}
