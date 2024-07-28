// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Sidebar Data
export const SidebarData = [
  
  {
    icon: UilEstate,
    heading: "Dashboard",
    route: "/dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Ordenes",
    route: "/ordenes",
  },
  {
    icon: UilUsersAlt,
    heading: "Usuarios",
  },
  {
    icon: UilPackage,
    heading: 'Productos',
    route: "/productos",
  },
  {
    icon: UilChart,
    heading: 'Reportes'
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Stock",
    color: {
      backGround: "linear-gradient(180deg, #12372A 0%, #12372A 100%)",
      //boxShadow: "0px 10px 20px 0px #12372A",
    },
    barValue: 70,
    value: "25,970",
    png: UilClipboardAlt,
    series: [
      {
        name: "Stock",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Entradas",
    color: {
      backGround: "linear-gradient(180deg, #436850 0%, #436850 100%)",
      //boxShadow: "0px 10px 20px 0px #436850",
    },
    barValue: 80,
    value: "14,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Entradas",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Salidas",
    color: {
      backGround:
        "#508D69",
      //boxShadow: "0px 10px 20px 0px #508D69",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Salidas",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];
