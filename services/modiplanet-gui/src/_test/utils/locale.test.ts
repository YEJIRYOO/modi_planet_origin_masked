import { ELangType } from '@src/lib/constants/enums';
import { LocaleHandler } from '@src/lib/utils/locale';

describe('[유틸] 로케일', () => {
  afterEach(() => {
    window.history.pushState(null, '', '/');
  });

  test('지원하는 언어 코드를 서비스 로케일로 변환한다.', () => {
    expect(LocaleHandler.getLocale(ELangType.KO)).toBe('ko');
    expect(LocaleHandler.getLocale(ELangType.EN)).toBe('en');
    expect(LocaleHandler.getLocale(ELangType.ES)).toBe('es');
    expect(LocaleHandler.getLocale(ELangType.PL)).toBe('pl');
  });

  test('지원하지 않는 언어 코드는 영어 로케일로 fallback한다.', () => {
    expect(LocaleHandler.getLocale('de')).toBe('en');
  });

  test('전달받은 언어 코드에 맞춰 i18n 언어를 변경한다.', () => {
    // Given
    const i18n = { changeLanguage: vi.fn() };

    // When
    LocaleHandler.applyLocale(i18n as never, 'ko');
    LocaleHandler.applyLocale(i18n as never, 'EN');
    LocaleHandler.applyLocale(i18n as never, 'es');
    LocaleHandler.applyLocale(i18n as never, 'pl');

    // Then
    expect(i18n.changeLanguage).toHaveBeenNthCalledWith(1, ELangType.KO);
    expect(i18n.changeLanguage).toHaveBeenNthCalledWith(2, ELangType.EN);
    expect(i18n.changeLanguage).toHaveBeenNthCalledWith(3, ELangType.ES);
    expect(i18n.changeLanguage).toHaveBeenNthCalledWith(4, ELangType.PL);
  });

  test('언어 코드가 없거나 지원하지 않으면 한국어로 변경한다.', () => {
    // Given
    const i18n = { changeLanguage: vi.fn() };

    // When
    LocaleHandler.applyLocale(i18n as never, '');
    LocaleHandler.applyLocale(i18n as never, 'de');

    // Then
    expect(i18n.changeLanguage).toHaveBeenNthCalledWith(1, ELangType.KO);
    expect(i18n.changeLanguage).toHaveBeenNthCalledWith(2, ELangType.KO);
  });

  test('현재 URL에서 locale query만 제거한다.', () => {
    // Given
    window.history.pushState(
      null,
      '',
      '/learning-space?locale=en&tab=my-course',
    );

    // When
    LocaleHandler.cleanLocaleFromUrl();

    // Then
    expect(window.location.pathname).toBe('/learning-space');
    expect(window.location.search).toBe('?tab=my-course');
  });

  test('locale query가 없으면 기존 URL query를 유지한다.', () => {
    // Given
    window.history.pushState(
      null,
      '',
      '/learning-space?tab=my-course&page=2',
    );

    // When
    LocaleHandler.cleanLocaleFromUrl();

    // Then
    expect(window.location.pathname).toBe('/learning-space');
    expect(window.location.search).toBe('?tab=my-course&page=2');
  });
});
