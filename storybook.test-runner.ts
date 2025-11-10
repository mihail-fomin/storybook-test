import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from '@axe-core/playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Пропускаем документы, оставляем только реальные истории
    if (context.storyId?.toLowerCase().includes('docs-')) {
      return;
    }

    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  },
};

export default config;

