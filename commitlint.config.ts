import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', [
      'feat',
      'fix',
      'bug',
      'docs',
      'test',
      'chore',
      'refactor',
      'style',
      'perf',
    ]],
    'type-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-case': [RuleConfigSeverity.Disabled], // 모든 케이스 허용
    'header-max-length': [RuleConfigSeverity.Error, 'always', 72], // Git 커밋 메시지의 전통적인 권장 사항
  },
};

export default Configuration;
