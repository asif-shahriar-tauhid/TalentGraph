import 'dart:core';

class AppConfig {
  AppConfig._();

  static String get apiBaseUrl {
    const base = String.fromEnvironment(
      'API_BASE_URL',
      defaultValue: 'http://10.0.2.2:5000/api/v1',
    );
    return base;
  }
}
