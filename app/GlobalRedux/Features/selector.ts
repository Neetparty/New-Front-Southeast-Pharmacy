import { createSelector } from 'reselect';
import { BannerRedux, CategoryRedux, OrderRedux, UserRedux } from './Feature';

interface State {
  category:CategoryRedux;
  user: UserRedux;
  banner: BannerRedux;
  order: OrderRedux;
  lang: {
    lang: "th" | "en" | "cn" | string;
  }
}

const selectCategory = (state:State) => state.category;

export const selectCategoryData = createSelector(
  [selectCategory],
  (category) => category
);

const selectUser = (state:State) => state.user;
export const selectUserData = createSelector(
  [selectUser],
  (user) => user
);

const selectBanner = (state:State) => state.banner;
export const selectBannerData = createSelector(
  [selectBanner],
  (banner) => banner
);

const selectOrder = (state:State) => state.order;
export const selectOrderData = createSelector(
  [selectOrder],
  (order) => order
);

const selectLang = (state:State) => state.lang;
export const selectLangData = createSelector(
  [selectLang],
  (lnag) => lnag
);

