import React, { useState } from "react";
import { askAi } from "../api/ai";
import { Input, Button, List, Typography } from "antd";

const { Text } = Typography;

export default function ChatInterface({ dataset }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    try {
      const reply = await askAi(input, JSON.stringify(dataset));
      const botMsg = { from: "bot", text: reply };
      setMessages((msgs) => [...msgs, botMsg]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, an error occurred." },
      ]);
    }
    setLoading(false);
    setInput("");
  };

  return (
    <>
      <List
        dataSource={messages}
        renderItem={(m, i) => (
          <List.Item style={{ textAlign: m.from === "user" ? "right" : "left" }}>
            <Text>{m.text}</Text>
          </List.Item>
        )}
        style={{ maxHeight: 300, overflowY: "auto", marginBottom: 8 }}
      />
      <Input.TextArea
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask your data question..."
        disabled={loading}
        onPressEnter={sendMessage}
      />
      <Button
        type="primary"
        onClick={sendMessage}
        loading={loading}
        disabled={!input.trim()}
        style={{ marginTop: 8 }}
      >
        Send
      </Button>
    </>
  );
}
