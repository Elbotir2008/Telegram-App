/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
const Home = () => {
  const getInfFromLocalge = JSON.parse(localStorage.getItem("fullName")!);
  const [inputValue, setInputvalue] = useState("");
  const [chatData, setChatData] = useState([]);

  const date = new Date();
  const showTime = date.getHours() + ":" + date.getMinutes();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      try {
        const res = await axios.post(
          "https://65733ccd192318b7db41caca.mockapi.io/api/v1/Messages",
          { getInfFromLocalge, inputValue, showTime }
        );
        const data = res.data;
        console.log(data);
        setInputvalue("");
        fetchChatApi();
      } catch (err) {
        console.log("Error sending message:", err);
      }
    } else {
      alert("You have to write something!");
    }
  };

  const fetchChatApi = async () => {
    try {
      const res = await axios.get(
        "https://65733ccd192318b7db41caca.mockapi.io/api/v1/Messages"
      );
      const data = res.data;
      setChatData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChatApi();
  }, []);

  // document.addEventListener("keypress", async (e: any) => {
  //   if (e.keyCode == 13) {
  //     handleSubmit(e);
  //   }
  // });

  console.log(chatData);

  return (
    <div>
      <header>
        <h2>{getInfFromLocalge}</h2>
      </header>
      <main className="flex-class">
        <div className="messages">
          <div className="chat">
            {chatData.length > 0
              ? chatData.map((item: any, index: number) => (
                  <div key={index} className="chatCard">
                    <div className="chat-info-name">
                      {item.getInfFromLocalge}
                      <div className="message-info-time">{item.showTime}</div>
                    </div>
                    <div className="chat-info">
                      <div className="message-text">{item.inputValue}</div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <form
            className="flex-class"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              placeholder="Write message"
              value={inputValue}
              onChange={(e) => {
                setInputvalue(e.target.value);
              }}
            />
            <button>
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Send</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
