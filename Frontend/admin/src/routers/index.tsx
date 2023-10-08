import BookCategoryPage from "../pages/book-category";

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
    key: "1",
    path: "book",
    children: [
      {
        path: "book-category",
        label: "Quản lý danh mục sách",
        element: <BookCategoryPage />,
        key: "1-1",
        children: [],
      },
    ],
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
