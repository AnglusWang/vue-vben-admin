import '@vben/styles';

import { preferences } from '@vben-core/preferences';

import { setupStore } from '@/store';
import { setupI18n } from '@vben/locales';
import { createApp } from 'vue';

import App from './app.vue';
import { router } from './router';

async function bootstrap(namespace: string) {
  const app = createApp(App);

  // 国际化 i18n 配置
  await setupI18n(app, { defaultLocale: preferences.app.locale });

  // 配置 pinia-store
  await setupStore(app, { namespace });

  // 配置路由及路由守卫
  app.use(router);

  app.mount('#app');

  // production mock server
  if (import.meta.env.PROD) {
    import('./mock-prod-server').then(({ setupProdMockServer }) => {
      setupProdMockServer();
    });
  }
}

export { bootstrap };