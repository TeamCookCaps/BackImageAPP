import Chat from "../models/chat.js";
import { ChatService } from "../services/chat.js";

export default function socket(wss){
const chatServiceInstance = new ChatService({ Chat });

wss.on("connection", (socket) => {
    console.log("WebSocket connected");
    socket.on("message", async (message) => {
      const { uid1, uid2, chatMessage } = JSON.parse(message);
      console.log(chatMessage);
      if (chatMessage === "openModal") {
        try {
          const chatMessages = await chatServiceInstance.getChatMessages(uid1, uid2);
          if (chatMessages) {
            socket.send(JSON.stringify(chatMessages));
            console.log('두 유저의 대화내용을 클라이언트에 전송: ', JSON.stringify(chatMessages));
          } else {
            console.log("Chat messages not found");
          }
        } catch (error) {
          console.error(`DB error: ${error}`);
        }
      } else {
        try {
            const result = await chatServiceInstance.saveChatMessages(uid1, uid2, chatMessage);
            console.log(result);
        } catch (error) {
          console.error(`DB error: ${error}`);
        }
      }
    });
  
    // 웹소켓 연결 해제
    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });
  });
}