import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AIChat() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {

    if (!message.trim()) return;

    const userMessage = {
        role: "user",
        text: message
    };

    setMessages(prev => [...prev, userMessage]);

    setLoading(true);

    try {

        const res = await axios.post(

            "http://localhost:5000/api/ai/chat",

            {
                message
            }

        );

        const aiMessage = {

            role: "assistant",

            text: res.data.reply

        };

        setMessages(prev => [

            ...prev,

            aiMessage

        ]);

    }

    catch(err){

        console.log(err);

    }

    setMessage("");

    setLoading(false);

};

    return (

        <div className="container mt-5">

            <Link
    to="/"
    className="btn btn-secondary mb-4"
>
    ← Home
</Link>
            <h2 className="fw-bold mb-4">
                🤖 AI Assistant
            </h2>

            <textarea

                className="form-control"

                rows="5"

                placeholder="Ask AI anything..."

                value={message}

                onChange={(e)=>setMessage(e.target.value)}

            />

            <button

                className="btn btn-primary mt-3"

                onClick={handleSend}

            >

                Ask AI

            </button>

           <div
    className="card shadow mt-4"
    style={{
        height: "500px",
        overflowY: "auto"
    }}
>
    <div className="card-body">

        {
            messages.map((msg, index) => (

                <div
                    key={index}
                    className={`d-flex mb-3 ${
                        msg.role === "user"
                            ? "justify-content-end"
                            : "justify-content-start"
                    }`}
                >

                    <div
                        className={`p-3 rounded ${
                            msg.role === "user"
                                ? "bg-primary text-white"
                                : "bg-light"
                        }`}
                        style={{
                            maxWidth: "75%"
                        }}
                    >

                        {msg.text}

                    </div>

                </div>

            ))
        }

        {
            loading &&

            <div className="text-muted">

                🤖 Thinking...

            </div>
        }

    </div>

</div>


        </div>

    );

}

export default AIChat;