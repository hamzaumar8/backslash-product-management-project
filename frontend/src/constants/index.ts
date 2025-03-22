import { IconDashboard, IconListDetails } from "@tabler/icons-react";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost";

export const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: IconListDetails,
  },
];
