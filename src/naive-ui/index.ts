import type { App } from "vue";
import * as NaiveUI from "naive-ui";

const naive = NaiveUI.create({
  components: [
    NaiveUI.NInput,
    NaiveUI.NButton,
    NaiveUI.NDialogProvider,
    NaiveUI.NDialog,
    NaiveUI.NMessageProvider,
    NaiveUI.NFormItem,
    NaiveUI.NForm,
    NaiveUI.NRow,
    NaiveUI.NTabs,
    NaiveUI.NTabPane,
    NaiveUI.NCalendar,
    NaiveUI.NProgress,
    NaiveUI.NTag,
    NaiveUI.NLayoutHeader,
    NaiveUI.NH2,
    NaiveUI.NLayoutSider,
    NaiveUI.NLayout,
    NaiveUI.NLayoutFooter,
  ],
});

export function setupNaive(app: App<Element>) {
  app.use(naive);
}
