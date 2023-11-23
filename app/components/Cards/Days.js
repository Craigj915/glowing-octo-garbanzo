import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const Days = () => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const city = search.city;
  const [groupedData, setGroupedData] = useState({});
  const APIKEY = process.env.REACT_APP_API_KEY;

  const getData = async () => {
    try {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric`
      );
      const weatherList = data.data.list;

      const mappedData = weatherList.map((item) => ({
        temp: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        wind: item.wind.speed,
        date: new Date(item.dt * 1000).toLocaleDateString(),
        day: new Date(item.dt * 1000).toLocaleDateString("en-GB", {
          weekday: "long",
        }),
        humidity: item.main.humidity,
      }));

      console.log("MAPPEPED DATA!!!", weatherList);

      const groupedData = mappedData.reduce((groups, item) => {
        const key = item.date;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(item);
        return groups;
      }, {});

      setGroupedData(groupedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="py-24  flex-col">
      <form
        className="flex justify-center"
        onSubmit={(event) => {
          event.preventDefault();
          setSearch({ city: "" });
          setTitle(search.city);
          if (city !== "") {
            getData();
          } else {
            console.error("NO CITY DUMB FUCK");
          }
        }}
      >
        <input
          type="text"
          placeholder="&#x1F50E;&#xFE0E; City Name"
          className="p-2 rounded-full text-center drop-shadow-md outline-none focus:border-2 border-violet-600"
          onChange={(event) => {
            // console.log(search)
            setSearch({
              ...search,
              city: event.target.value,
            });
          }}
          value={search.city}
        ></input>
      </form>
      <div className="text-white text-xl p-8 textShadow">
        <div className="text-5xl">
          <div className="text-center">
            <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
            <div className="flex-wrap">
              <h2 className="text-sm">
                <div id="SHOW WEATHER DATA HERE">
                  {Object.keys(groupedData).map((date) => {
                    const group = groupedData[date];

                    const minTemp = Math.min(...group.map((item) => item.temp));
                    const maxTemp = Math.max(...group.map((item) => item.temp));

                    const sumWind = group.reduce(
                      (acc, item) => acc + item.wind,
                      0
                    );
                    const avgWindSpeed = (sumWind / group.length).toFixed(2);

                    return (
                      <div className="flex justify-center m-4" key={date}>
                        <div className="bg-gray-600 w-5/6 p-8  rounded-xl bg-opacity-80">
                          <ul className="flex justify-center items-center text-center space-x-8 gap-">
                            <li>
                              <p className="text-2xl">
                                {date} {group[0].day}
                              </p>
                            </li>
                            <li>
                              <p className="text-2xl">
                                {group[0].description.charAt(0).toUpperCase() +
                                  group[0].description.slice(1)}
                              </p>
                            </li>
                            <li>
                              <img
                                className="dropShadow"
                                src={`https://openweathermap.org/img/wn/${group[0].icon}@2x.png`}
                              />
                            </li>
                            <li>
                              <p>Min Temp: {minTemp}°C</p>
                            </li>
                            <li>
                              <p>Max Temp: {maxTemp}°C</p>
                            </li>
                            <li>
                              <p>Humidity: {group[0].humidity}%</p>
                            </li>
                            <li>
                              <p>Wind: {avgWindSpeed}m/s</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Days;
