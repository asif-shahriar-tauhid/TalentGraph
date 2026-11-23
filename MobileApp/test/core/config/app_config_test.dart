import 'package:flutter_test/flutter_test.dart';
import 'package:talentgraph/core/config/app_config.dart';

void main() {
  group('AppConfig', () {
    test('default API_BASE_URL is emulator address', () {
      expect(AppConfig.apiBaseUrl, 'http://10.0.2.2:5000/api/v1');
    });

    test('API_BASE_URL is a non-empty string', () {
      expect(AppConfig.apiBaseUrl, isNotEmpty);
      expect(AppConfig.apiBaseUrl, startsWith('http'));
    });
  });
}
