import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { createUseStyles } from "react-jss";

import Container from "components/container";
import Header from "components/header";
import Sidebar from "components/sidebar";
import MainContent from "components/content";
import { CardDrivers } from "components/card";

import { COLORS } from "config";
import { CaretLeft, CaretRight, MagnifyingGlass, Plus } from "phosphor-react";
import React, { useCallback, useEffect, useRef } from "react";

import { useMediaQuery } from "hooks";

import { serialize } from "cookie";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setList, prevPage, nextPage, search } from "store/slices/drivers";
import { Drivers } from "store/slices/drivers";

const useStyles = createUseStyles({
  header: (sm: boolean) => ({
    backgroundColor: COLORS.white,
    padding: "1rem 2rem",
    display: "flex",
    gap: 12,
    flexFlow: sm ? "column" : "row",
    justifyContent: "space-between",
    "& h6": {
      margin: 0,
      color: COLORS.red,
      fontSize: "1.5rem",
      textTransform: "uppercase",
    },
  }),
  toolbar: (sm: boolean) => ({
    display: "flex",
    gap: 12,
    flexFlow: sm ? "column" : "row",
    alignItems: sm ? "stretch" : "center",
  }),
  search: {
    position: "relative",
    "& input": {
      padding: "9px 2rem 9px 2.2rem",
      border: "1px solid",
      borderColor: COLORS.grey,
      appearance: "none",
      width: "100%",
    },
    "& span": {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 6px",
      "& svg": {
        color: COLORS.red,
      },
    },
  },
  primary: {
    backgroundColor: COLORS.red,
    appearance: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: COLORS.white,
    border: "none",
    padding: "6px 1rem",
  },
  gridDriver: (sm: boolean) => {
    let col = 5;
    if (sm) {
      col = 1;
    }
    return {
      margin: "1rem 0",
      gap: "1rem",
      display: "grid",
      gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
    };
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 12,
    "& button": {
      cursor: "pointer",
      appearance: "none",
      border: "none",
      background: "none",
      display: "flex",
      alignItems: "center",
      "&:disabled": {
        cursor: "not-allowed",
      },
    },
  },
});

interface Props {
  results?: Drivers[];
}

const Drivers: NextPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const drivers = useAppSelector((state) => state.drivers);
  const sm = useMediaQuery("(max-width: 768px)");

  const classes = useStyles(sm);

  const refSearch = useRef<ReturnType<typeof setTimeout> | number>(0);

  useEffect(() => {
    if (props.results) {
      dispatch(setList(props.results));
    }
  }, [props.results, dispatch]);

  const onSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      clearTimeout(refSearch.current);
      refSearch.current = setTimeout(() => {
        dispatch(search(target.value));
      }, 500);
    },
    [dispatch]
  );

  const clickBack = useCallback(() => {
    dispatch(prevPage());
  }, [dispatch]);

  const clickNext = useCallback(() => {
    dispatch(nextPage());
  }, [dispatch]);

  const renderDrivers = [...drivers.data]?.filter((item) =>
    item.name.first.toLowerCase().includes(drivers.term.toLowerCase())
  );

  return (
    <div>
      <Head>
        <title>Driver Management</title>
      </Head>

      <Header />

      <Container>
        <Sidebar />
        <MainContent>
          <header className={classes.header}>
            <div className="">
              <h6 className="">Driver Management</h6>
              <span className="">Data driver yang bekerja dengan Anda.</span>
            </div>
            <div className={classes.toolbar}>
              <div className={classes.search}>
                <span className="">
                  <MagnifyingGlass size={24} />
                </span>
                <input
                  defaultValue={drivers.term}
                  type="text"
                  placeholder="Cari Driver"
                  onChange={onSearch}
                />
              </div>
              <button className={classes.primary}>
                Tambah Driver
                <Plus size={24} style={{ marginLeft: 20 }} />
              </button>
            </div>
          </header>
          <div className={classes.gridDriver}>
            {renderDrivers
              ?.splice(drivers.page - 1, drivers.maxShown)
              ?.map((item, i) => {
                return <CardDrivers key={item.id.value || i} data={item} />;
              })}
          </div>
          <div className={classes.pagination}>
            <button
              className=""
              disabled={drivers.page === 1}
              onClick={clickBack}
            >
              <CaretLeft size={24} />
              Previous Page
            </button>
            <button
              className=""
              disabled={drivers.page === drivers.latestPage}
              onClick={clickNext}
            >
              Next Page <CaretRight size={24} />
            </button>
          </div>
        </MainContent>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookieName = "mjd-cookies";

    if (!context.req.cookies[cookieName]) {
      const res = await fetch(`https://randomuser.me/api/?results=30`);
      const json = await res.json();

      const expired = 60 * 60 * 5;

      const serialised = serialize(cookieName, "true", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: expired,
        path: "/",
      });

      context.res.setHeader("Set-Cookie", serialised);

      return {
        props: json,
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.log(error);

    return {
      props: {},
    };
  }
};

export default Drivers;
