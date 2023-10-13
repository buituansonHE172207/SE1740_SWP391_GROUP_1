import { URL_CONFIG } from "../config/url.config";
import AuthorPage from "../pages/author";
import BookCategoryPage from "../pages/book/book-category";
import PublisherPage from "../pages/publisher";
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
    key: URL_CONFIG.BOOK,
    path: URL_CONFIG.BOOK,
    children: [
      {
        label: "Quản lý danh mục sách",
        element: <BookCategoryPage />,
        key: URL_CONFIG.BOOK_CATEGORY,
        path: URL_CONFIG.BOOK_CATEGORY,
        children: [],
      },
    ],
  },

  {
    label: "Quản lí slider",
    element: <SliderPage />,
    key: URL_CONFIG.SLIDER,
    path: URL_CONFIG.SLIDER,
    children: [],
  },

  {
    label: "Quản lí NXB",
    element: <PublisherPage />,
    key: URL_CONFIG.PUBLISHER,
    path: URL_CONFIG.PUBLISHER,
    children: [],
  },

  {
    label: "Quản lí tác giả",
    element: <AuthorPage />,
    key: URL_CONFIG.AUTHOR,
    path: URL_CONFIG.AUTHOR,
    children: [],
  },

  {
    label: "Quản lý Bài viết",
    element: null,
    key: "2",
    path: "post",
    children: [
      {
        path: "post",
        label: "Quản lý bài viết",
        element: null,
        key: "1-1",
        children: [],
      },
      {
        path: "post-category",
        label: "Quản lí danh mục bài viết",
        element: null,
        key: "1-1",
        children: [],
      },
    ],
  },
];

export default menu;
