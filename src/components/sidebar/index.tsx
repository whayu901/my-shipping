import React, { memo } from "react";
import { createUseStyles } from "react-jss";
import { useRouter } from "next/router";
import Link from "next/link";

import { CalendarBlank, House, User } from "phosphor-react";

import { COLORS } from "config";
import { useMediaQuery } from "hooks";
import { useAppSelector } from "store/hooks";

const useStyles = createUseStyles(
  {
    sidebar: ({ sm, isActive }: { sm: boolean; isActive: boolean }) => {
      return {
        display: sm ? (isActive ? "block" : "none") : "block",
        paddingTop: 80,
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        position: "fixed",
        zIndex: 9,
        top: 0,
        "& ul": {
          "& li": {},
        },
      };
    },
    sidebarUl: {
      display: "flex",
      flexFlow: "column",
      listStyle: "none",
      padding: 0,
      rowGap: 1,
    },
    sidebarLink: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      columnGap: 6,
      fontWeight: 500,
      padding: "0.5rem 2rem 0.5rem 1rem",
      "& span": {
        display: "none",
      },
    },
    sidebarLinkActive: {
      color: COLORS.red,
      "& span.accent": {
        display: "block",
        left: 0,
        width: 2,
        position: "absolute",
        height: "100%",
        backgroundColor: COLORS.red,
      },
    },
  },
  { name: "Sidebar" }
);

function Sidebar() {
  const { pathname } = useRouter();
  const { isActive } = useAppSelector((state) => state.components.sidebar);

  const sm = useMediaQuery("(max-width: 768px)");
  const classes = useStyles({ sm, isActive });

  return (
    <aside className={classes.sidebar} id="main-sidebar">
      <ul className={classes.sidebarUl}>
        <li className="">
          <Link href={`/`}>
            <a
              className={[
                classes.sidebarLink,
                pathname === "/" ? classes.sidebarLinkActive : "",
              ].join(" ")}
            >
              <span className="accent" />
              <House size={18} weight="fill" /> Beranda
            </a>
          </Link>
        </li>
        <li style={{ marginTop: 10, marginBottom: 10 }}>
          <Link href={`/drivers`}>
            <a
              className={[
                classes.sidebarLink,
                pathname === "/drivers" ? classes.sidebarLinkActive : "",
              ].join(" ")}
            >
              <span className="accent" />
              <User size={18} weight="fill" /> Driver Management
            </a>
          </Link>
        </li>
        <li className="">
          <Link href={`/pickups`}>
            <a
              className={[
                classes.sidebarLink,
                pathname === "/pickups" ? classes.sidebarLinkActive : "",
              ].join(" ")}
            >
              <span className="accent" />
              <CalendarBlank size={18} weight="fill" /> Pickup
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default memo(Sidebar);
