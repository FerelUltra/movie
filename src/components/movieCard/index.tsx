import styles from "./movieCard.module.css";
import { Card, Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { genresList } from "../../data/genres";
import { descriptionCrop } from "../../data/descriptionCrop";
import { useState } from "react";
import { ICard } from "../../types/card";
// import {getMovies, movieUrl} from "../../services";
export const MovieCard = (props: ICard) => {
  const url = `https://image.tmdb.org/t/p/w500/${props.img ? props.img : props.img2}`;
  const color = props.vote > 7 ? "#66E900" : props.vote > 5 ?
    "#E9D100" : props.vote > 3 ? "#E97E00" : "#E90000";
  const onChange = (value: number) => {
    localStorage.setItem(String(props.id), JSON.stringify({ ...props, myRate: value }));
  };
  const rate = JSON.parse(localStorage.getItem(String(props.id))!)?.myRate;
  return (
    <div className={styles.movieCard}>
      <div style={{width: "181px", height: "272px"}}>
        <img src={url} alt="" width="181px" height="272px" />
      </div>
      <div className={styles.text}>
        <h2 className={styles.h2}>{props.title}</h2>
        <p className={styles.date}>{props.date}</p>
        <div className={styles.tags}>
          {props.genres.map((id: number | string) => {
            id = id.toString();

            // @ts-ignore
            return <span className={styles.tag}>{genresList[id]}</span>;
          })}
        </div>
        <p className={styles.description}>
          {descriptionCrop(props.overview)}
        </p>
        <Rate onChange={onChange} allowHalf defaultValue={props.myRate ? props.myRate : rate ? rate : 0} count={10} />
      </div>

      <div style={{ border: `${color} 2px solid`, borderRadius: "50%" }}
           className={styles.rate}>{props.vote}</div>
    </div>
  );
};
