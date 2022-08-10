import React, { useState } from "react";
import { createUseStyles } from "react-jss";

import Image from "next/image";

import { List, User } from "phosphor-react";

import { COLORS } from "config";
import { useMediaQuery } from "hooks";
import { useAppDispatch } from "store/hooks";
import { toggleSidebar } from "store/slices/components";

type Props = {};

const useStyles = createUseStyles({
  header: (sm: boolean) => ({
    position: "relative",
    zIndex: 10,
    padding: sm ? "1rem .5rem" : "1rem 2rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: COLORS.white,
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.10)",
  }),
  headerProfile: {
    marginLeft: "auto",
    appearance: "none",
    background: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
  },
  headerProfileName: (sm: boolean) => ({
    color: COLORS.red,
    marginLeft: 3,
    display: sm ? "none" : "block",
  }),
  headerGrettings: (sm: boolean) => ({
    display: sm ? "none" : "block",
  }),
  headerProfileIcon: {
    marginLeft: "1rem",
    backgroundColor: COLORS.grey,
    borderRadius: 100,
    display: "inline-flex",
    padding: 3,
  },
  headerProfileSvg: {
    borderRadius: 100,
    overflow: "hidden",
    width: 26,
    height: 26,
    // "& svg": {
    //   padding: 2,
    //   fill: COLORS.white,
    //   transform: "translateY(2px)",
    // },
  },
  buttonMenuToggle: (sm: boolean) => ({
    display: sm ? "block" : "none",
    marginLeft: 3,
    flex: "none",
    marginRight: 12,
    appearance: "none",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  }),
});

function Header({}: Props) {
  const sm = useMediaQuery("(max-width: 768px)");
  const dispatch = useAppDispatch();

  const classes = useStyles(sm);

  return (
    <header className={classes.header}>
      <button
        className={classes.buttonMenuToggle}
        onClick={() => dispatch(toggleSidebar())}
      >
        <List size={24} />
      </button>

      <Image
        src="/images/shipper-logo-min.png"
        objectFit="contain"
        width={120}
        height={30}
        alt="logoPT"
      />

      <button className={classes.headerProfile}>
        <span className={classes.headerGrettings}>Hello,</span>
        <span className={classes.headerProfileName}> Shipper User</span>
        <span className={classes.headerProfileIcon}>
          <span className={classes.headerProfileSvg}>
            <User size={24} weight="fill" />
          </span>
        </span>
      </button>
    </header>
  );
}

export default Header;
