import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Teainit',
  description: 'RBAC Initialization Template',
  icon: '/teainit-icon.png',
  logo: {
    light: '/teainit-light-logo.png',
    dark: '/teainit-dark-logo.png',
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/tea-inn/teainit-doc' },
    ],
  },
});
