import { useState } from "react";
import styles from "../styles/Home.module.scss";
import style from "../styles/Form.module.scss";
import Head from 'next/head';

export default function Home() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  const requestData = async () => {
    const request = await fetch("https://restcountries.com/v3.1/all");
    const data = await request.json();
    setList(data);
  };
  requestData();

  const searchCountry = list.filter((country) => {
    return country.name.common.toLowerCase().includes(value.toLowerCase());
  });
  return (
    <>
    <Head>
    <title>Countries</title>
    </Head>
      <div className={styles.parent}>
        <div className={style.form}>
          <input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Поиск стран"
          />
        </div>
        {list.length >= 1 ? (
          searchCountry.map((item, idx) => {
            return (
              <div className={styles.container} key={idx}>
                <p align="center">
                  <img src={item.flags.png}></img>
                </p>
                <h3>{item.name.common}</h3>
                <h4>Continent - {item.continents}</h4>
              </div>
            );
          })
        ) : (
          <h5 className={styles.loading}>Loading ...</h5>
        )}
      </div>
    </>
  );
}
