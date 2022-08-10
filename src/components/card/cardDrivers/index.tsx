import React from "react";
import { createUseStyles } from "react-jss";

import { DotsThree, UserCircle } from "phosphor-react";

import { COLORS } from "config";

import { Drivers } from "store/slices/drivers";
import Image from "next/image";
import dayjs from "dayjs";
import { useMediaQuery } from "hooks";

type Props = {
  data: Drivers;
};

const useStyles = createUseStyles({
  cardDriver: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    display: "flex",
    flexFlow: "column",
    rowGap: 8,
    paddingBottom: "1rem",
    "& .heading": {
      borderBottom: "1px solid",
      borderColor: COLORS.grey,
      padding: "0.5rem 1rem",
      color: COLORS.grey,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      "& .icon": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      "& .text-red": {
        color: COLORS.red,
      },
    },
  },
  cardRowDetails: (sm: boolean) => ({
    display: sm ? "flex" : "",
  }),
  cardRowMore: (sm: boolean) => ({
    display: sm ? "none" : "block",
  }),
  cardRowThumbnail: (sm: boolean) => ({
    marginBottom: 16,
    "& .icon": {
      width: sm ? 120 : 44,
      height: sm ? 120 : 44,
    },
  }),
  cardRow: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    "& h6": {
      margin: "0 0 8px",
      fontSize: "1rem",
      wordBreak: "break-all",
    },
    "& span": {
      color: COLORS.grey,
      fontSize: "1rem",
    },
    "& .icon": {
      borderRadius: 80,
      display: "flex",
      overflow: "hidden",
      "& svg": {
        fill: COLORS.grey,
        margin: "0 -.5rem",
      },
    },
  },
});

function Sidebar({ data }: Props) {
  const sm = useMediaQuery("(max-width: 768px)");
  const classes = useStyles(sm);

  return (
    <div className={classes.cardDriver}>
      <div className="heading">
        <span className="">
          Driver ID <span className="text-red">{data.id.value || "-"}</span>
        </span>
        <span className="icon">
          <DotsThree size={24} />
        </span>
      </div>
      <div className={classes.cardRowDetails}>
        <div className={[classes.cardRow, classes.cardRowThumbnail].join(" ")}>
          <span className="icon">
            {data.picture.thumbnail ? (
              <Image
                src={sm ? data.picture.medium : data.picture.thumbnail}
                width={sm ? 120 : 44}
                height={sm ? 120 : 44}
                alt="profile"
              />
            ) : (
              <UserCircle size={sm ? 120 : 44} weight="fill" />
            )}
          </span>
        </div>

        <div className="">
          <div className={[classes.cardRow].join(" ")}>
            <span className="">Nama Driver</span>
            <h6 className="">
              {data.name.first}, {data.name.last}
            </h6>
          </div>
          <div className={[classes.cardRow].join(" ")}>
            <span className="">Telepon</span>
            <h6 className="">{data.phone}</h6>
          </div>
          <div className={[classes.cardRow, classes.cardRowMore].join(" ")}>
            <span className="">Email</span>
            <h6 className="">
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </h6>
          </div>
          <div className={[classes.cardRow, classes.cardRowMore].join(" ")}>
            <span className="">Tanggal Lahir</span>
            <h6 className="">{dayjs(data.dob.date).format("DD-MM-YYYY")}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
