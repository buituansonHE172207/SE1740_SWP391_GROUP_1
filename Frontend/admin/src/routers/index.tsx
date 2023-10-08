import { URL_CONFIG } from "../config/url.config";
import BookCategoryPage from "../pages/book-category";
import SliderPage from "../pages/slider";

export interface RouteMenu {
  label: React.ReactNode;
  element: React.ReactNode;
  key: React.Key;
  path: string;
  icon?: React.ReactNode;
  children: RouteMenu[];
  permissions?: Array<string>;
}

const menu: RouteMenu[] = [
  {
    label: "Quản lý sách",
    element: null,
    key: "book",
    path: URL_CONFIG.BOOK,
    children: [
      {
        label: "Quản lý danh mục sách",
        element: <BookCategoryPage />,
        key: "book-category",
        path: URL_CONFIG.BOOK_CATEGORY,
        children: [],
      },
    ],
  },
  {
    label: "Quản lí slider",
    element: <SliderPage />,
    key: "slider",
    path: URL_CONFIG.SLIDER,
    children: [],
  }
];

export default menu;
