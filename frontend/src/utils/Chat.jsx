import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ dynamicValue }) {
  const [chatRoomInfo, setChatRoomInfo] = useState(null);

  useEffect(() => {
    const fetchChatRoomInfo = async () => {
      try {
        // dynamicValue가 undefined인 경우 함수를 종료
        if (dynamicValue === undefined) {
          console.error('dynamicValue is undefined.');
          return;
        }

        // 동적으로 받아온 값을 사용
        const response = await axios.get(`http://localhost:8000/chat/chatRoom/${dynamicValue}`, { withCredentials: true });
        if (response.data.success) {
          setChatRoomInfo(response.data.data);
        } else {
          console.error('채팅방 정보 조회 실패:', response.data.message);
        }
      } catch (error) {
        console.error('네트워크 오류 등의 실패:', error);
      }
    };

    // dynamicValue가 변경될 때만 fetchChatRoomInfo 함수 실행
    if (dynamicValue !== undefined) {
      fetchChatRoomInfo();
    }
  }, [dynamicValue]); 

  if (!chatRoomInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Chat Room Info</h1>
      {chatRoomInfo.initialRoom.map((room, index) => (
        <div key={index}>
          <p>Title: {room.title}</p>
          <p>Channel Description: {room.channel_description}</p>
          <p>User Nickname: {room.user_nickname}</p>
          <p>Chat Content: {room.chat_content}</p>
          <p>Chat Sender User ID: {room.chat_sender_user_id}</p>
          <p>Chat Sent Time: {room.chat_sent_time}</p>
        </div>
      ))}
      <p>Channel List: {chatRoomInfo.channelList.map(channel => channel.channel_description).join(', ')}</p>
      <p>Participant List: {chatRoomInfo.participantList.join(', ')}</p>
  </div>
  );
}

export default Chat;