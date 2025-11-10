import { expect, test } from '@playwright/test';

const stories = [
  {
    id: 'foundation-button--primary',
    name: 'button-primary',
  },
  {
    id: 'foundation-textinput--with-affixes',
    name: 'textinput-affixes',
  },
  {
    id: 'foundation-select--playground',
    name: 'select-default',
  },
  {
    id: 'foundation-customcheckbox--with-custom-indicator',
    name: 'checkbox-custom-indicator',
  },
];

stories.forEach(({ id, name }) => {
  test(`storybook visual: ${name}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}`);
    await page.evaluate(() => {
      document.body.style.padding = '24px';
      document.body.style.background = '#f8fafc';
    });
    const root = page.locator('#storybook-root');
    await expect(root).toHaveScreenshot(`${name}.png`, {
      animations: 'disabled',
      scale: 'css',
    });
  });
});

