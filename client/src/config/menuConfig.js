const menuList = [
  {
    id: 666,
    authName: "首页",
    path: "welcome",
    children: [
      {
        id: 667,
        authName: "Welcome",
        path: "welcome",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
  {
    id: 125,
    authName: "资金管理",
    path: "funds",
    children: [
      {
        id: 110,
        authName: "交易记录",
        path: "funds",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
  {
    id: 103,
    authName: "信息管理",
    path: "info",
    children: [
      {
        id: 110,
        authName: "信息记录",
        path: "info",
        children: [],
        order: null,
      },
    ],
    order: 1,
  },
];

export default menuList;
