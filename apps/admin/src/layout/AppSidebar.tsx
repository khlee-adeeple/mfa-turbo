"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChatIcon,
  ChevronDownIcon,
  DocsIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  MailIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  TaskIcon,
  UserCircleIcon,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "통계분석",
    subItems: [
      { name: "일별 매출 종합 리포트", path: "/" },
      { name: "캠페인 일별 매출 현황", path: "/ag-grid" },
      { name: "일별 마케터 실적 현황", path: "/ag-grid-test" },
      { name: "매체 광고비 등록", path: "" },
      { name: "광고주별 종합 리포트", path: "" },
      { name: "캠페인별 상세 리포트", path: "" },
      { name: "마케터별 캠페인 리포트", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "광고주 관리",
    subItems: [
      { name: "광고주 현황", path: "" },
      { name: "코멘트 관리", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "광고비 관리",
    subItems: [
      { name: "광고비 입금 등록", path: "" },
      { name: "광고비 입금 신청 관리", path: "" },
      { name: "광고비 현황", path: "" },
      { name: "캠페인 예산 현황", path: "" },
      { name: "후불 광고비 정산 관리", path: "" },
      { name: "광고비 수동 요청 등록", path: "" },
      { name: "광고비 수동 요청 승인 관리", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "캠페인 관리",
    subItems: [
      { name: "캠페인 현황", path: "" },
      { name: "캠페인 수정 요청 현황", path: "" },
      { name: "캠페인 등록", path: "" },
      { name: "브랜드 관리", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "캠페인 참여 관리",
    subItems: [
      { name: "광고URL 발급 현황", path: "" },
      { name: "캠페인 참여 현황", path: "" },
      { name: "CPC, CPC5 유효클릭 현황", path: "" },
      { name: "CPC, CPC6 유효클릭 현황", path: "" },
      { name: "CPC, CPC7 유효클릭 현황", path: "" },
      { name: "CPC, CPC8 유효클릭 현황", path: "" },
      { name: "CPE, CPEA 설치 현황", path: "" },
      { name: "CPA, CPAAD 참여 현황", path: "" },
      { name: "CPAAD 외부입력폼 수집 현황", path: "" },
      { name: "광고주별 캠페인 참여 현황", path: "" },
      { name: "승인율 제외 무효요청 관리", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "마케터 관리",
    subItems: [
      { name: "마케터 현황", path: "" },
      { name: "코멘트 관리", path: "" },
      { name: "마케터 스페셜 기능 관리", path: "" },
      { name: "마케터 스페셜 단가 관리", path: "" },
      { name: "차단 및 블랙회원 관리", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "마케터 수익금 관리",
    subItems: [
      { name: "수익금 현황", path: "" },
      { name: "수익금 출금신청 관리", path: "" },
      { name: "수익금 수동 요청 등록", path: "" },
      { name: "수익금 수동 요청 승인 관리", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "고객센터 관리",
    subItems: [
      { name: "광고주 문의 관리", path: "" },
      { name: "광고주 공지 관리", path: "" },
      { name: "광고주 FAQ 관리", path: "" },
      { name: "마케터 문의 관리", path: "" },
      { name: "마케터 공지 관리", path: "" },
      { name: "마케터 FAQ 관리", path: "" },
      { name: "마케터 용어사전 관리", path: "" },
      { name: "마케터 홍보불가 채널 관리", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "알림센터 관리",
    subItems: [{ name: "알림발송 현황", path: "" }],
  },
  {
    icon: <GridIcon />,
    name: "카테고리 관리",
    subItems: [
      { name: "카테고리 설정", path: "" },
      { name: "광고 단가 기준 설정", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "도메인 관리",
    subItems: [{ name: "도메인 현황", path: "" }],
  },
  {
    icon: <GridIcon />,
    name: "시스템 관리",
    subItems: [
      { name: "코드 관리", path: "" },
      { name: "팀즈 알림 발송 내역", path: "" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "권한 관리",
    subItems: [
      { name: "메뉴 관리", path: "" },
      { name: "역할 관리", path: "" },
      { name: "사용자 권한 관리", path: "" },
      { name: "인하우스 그룹 관리", path: "" },
      { name: "사용자 등록", path: "" },
    ],
  },
  // {
  //   icon: <GridIcon />,
  //   name: "Dashboard",
  //   subItems: [
  //     { name: "Ecommerce", path: "/", pro: false },
  //     { name: "Analytics", path: "/analytics", pro: true },
  //     { name: "Marketing", path: "/marketing", pro: true },
  //     { name: "CRM", path: "/crm", pro: true },
  //     { name: "Stocks", path: "/stocks", new: true, pro: true },
  //     { name: "SaaS", path: "/saas", new: true, pro: true },
  //   ],
  // },
  // {
  //   icon: <CalenderIcon />,
  //   name: "Calendar",
  //   path: "/calendar",
  // },
  // {
  //   icon: <UserCircleIcon />,
  //   name: "User Profile",
  //   path: "/profile",
  // },
  // {
  //   name: "Task",
  //   icon: <TaskIcon />,
  //   subItems: [
  //     { name: "List", path: "/task-list", pro: true },
  //     { name: "Kanban", path: "/task-kanban", pro: true },
  //   ],
  // },
  // {
  //   name: "Forms",
  //   icon: <ListIcon />,
  //   subItems: [
  //     { name: "Form Elements", path: "/form-elements", pro: false },
  //     { name: "Form Layout", path: "/form-layout", pro: true },
  //   ],
  // },
  // {
  //   name: "Tables",
  //   icon: <TableIcon />,
  //   subItems: [
  //     { name: "Basic Tables", path: "/basic-tables", pro: false },
  //     { name: "Data Tables", path: "/data-tables", pro: true },
  //     { name: "AG Grid", path: "/ag-grid", pro: true },
  //   ],
  // },
  // {
  //   name: "Pages",
  //   icon: <PageIcon />,
  //   subItems: [
  //     { name: "File Manager", path: "/file-manager", pro: true },
  //     { name: "Pricing Tables", path: "/pricing-tables", pro: true },
  //     { name: "Faqs", path: "/faq", pro: true },
  //     { name: "Blank Page", path: "/blank", pro: true },
  //     { name: "404 Error", path: "/error-404", pro: true },
  //     { name: "500 Error", path: "/error-500", pro: true },
  //     { name: "503 Error", path: "/error-503", pro: true },
  //     { name: "Coming Soon", path: "/coming-soon", pro: true },
  //     { name: "Maintenance", path: "/maintenance", pro: true },
  //     { name: "Success", path: "/success", pro: true },
  //   ],
  // },
];

// const othersItems: NavItem[] = [
//   {
//     icon: <PieChartIcon />,
//     name: "Charts",
//     subItems: [
//       { name: "Line Chart", path: "/line-chart", pro: true },
//       { name: "Bar Chart", path: "/bar-chart", pro: true },
//       { name: "Pie Chart", path: "/pie-chart", pro: true },
//     ],
//   },
//   {
//     icon: <BoxCubeIcon />,
//     name: "UI Elements",
//     subItems: [
//       { name: "Alerts", path: "/alerts", pro: true },
//       { name: "Avatar", path: "/avatars", pro: true },
//       { name: "Badge", path: "/badge", pro: true },
//       { name: "Breadcrumb", path: "/breadcrumb", pro: true },
//       { name: "Buttons", path: "/buttons", pro: true },
//       { name: "Buttons Group", path: "/buttons-group", pro: true },
//       { name: "Cards", path: "/cards", pro: true },
//       { name: "Carousel", path: "/carousel", pro: true },
//       { name: "Dropdowns", path: "/dropdowns", pro: true },
//       { name: "Images", path: "/images", pro: true },
//       { name: "Links", path: "/links", pro: true },
//       { name: "List", path: "/list", pro: true },
//       { name: "Modals", path: "/modals", pro: true },
//       { name: "Notification", path: "/notifications", pro: true },
//       { name: "Pagination", path: "/pagination", pro: true },
//       { name: "Popovers", path: "/popovers", pro: true },
//       { name: "Progressbar", path: "/progress-bar", pro: true },
//       { name: "Ribbons", path: "/ribbons", pro: true },
//       { name: "Spinners", path: "/spinners", pro: true },
//       { name: "Tabs", path: "/tabs", pro: true },
//       { name: "Tooltips", path: "/tooltips", pro: true },
//       { name: "Videos", path: "/videos", pro: true },
//     ],
//   },
//   {
//     icon: <PlugInIcon />,
//     name: "Authentication",
//     subItems: [
//       { name: "Sign In", path: "/signin", pro: false },
//       { name: "Sign Up", path: "/signup", pro: false },
//       { name: "Reset Password", path: "/reset-password", pro: true },
//       {
//         name: "Two Step Verification",
//         path: "/two-step-verification",
//         pro: true,
//       },
//     ],
//   },
// ];

// const supportItems: NavItem[] = [
//   {
//     icon: <ChatIcon />,
//     name: "Chat",
//     path: "/chat",
//   },
//   {
//     icon: <MailIcon />,
//     name: "Email",
//     subItems: [
//       { name: "Inbox", path: "/inbox" },
//       { name: "Details", path: "/inbox-details" },
//     ],
//   },
//   {
//     icon: <DocsIcon />,
//     name: "Invoice",
//     path: "/invoice",
//   },
// ];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "support" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "support" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  // useEffect(() => {
  //   // Check if the current path matches any submenu item
  //   let submenuMatched = false;
  //   ["main", "support", "others"].forEach((menuType) => {
  //     const items =
  //       menuType === "main"
  //         ? navItems
  //         : menuType === "support"
  //           ? supportItems
  //           : othersItems;
  //     items.forEach((nav, index) => {
  //       if (nav.subItems) {
  //         nav.subItems.forEach((subItem) => {
  //           if (isActive(subItem.path)) {
  //             setOpenSubmenu({
  //               type: menuType as "main" | "support" | "others",
  //               index,
  //             });
  //             submenuMatched = true;
  //           }
  //         });
  //       }
  //     });
  //   });

  //   // If no submenu item matches, close the open submenu
  //   if (!submenuMatched) {
  //     setOpenSubmenu(null);
  //   }
  // }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "support" | "others"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto  duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              {/* <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2> */}
              {renderMenuItems(navItems, "main")}
            </div>
            {/* <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Support"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(supportItems, "support")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div> */}
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
