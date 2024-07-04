export type SideNavItem = {
    title: string;
    paths: Array<string>;
    lightIcon?: JSX.Element;
    darkIcon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
  };