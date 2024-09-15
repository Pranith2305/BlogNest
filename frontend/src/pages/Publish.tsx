import axios from "axios";
import AppBar from "../components/AppBar";
import { BackendURL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [alertVisible, setAlertVisible] = useState(false); // State for managing alert visibility
    const [alertMessage, setAlertMessage] = useState(''); // State for alert message
    const navigate = useNavigate();

    const handlePublish = async () => {
        // Check if title or description is empty
        if (!title.trim() || !description.trim()) {
            setAlertMessage('Title and description cannot be empty.');
            setAlertVisible(true);
            return;
        }

        try {
            const storedToken = JSON.parse(localStorage.getItem("token") || '{}');
            const response = await axios.post(`${BackendURL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: `${storedToken.jwt}`,
                },
            });

            // Navigate to the new blog page
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing blog:", error);
            setAlertMessage('Failed to publish blog. Please try again.');
            setAlertVisible(true);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="max-w-screen-lg w-full">
                <AppBar />
                {alertVisible && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-4" role="alert">
                        <span className="font-medium">Alert!</span> {alertMessage}
                    </div>
                )}
                <div className="mb-6 pt-4">
                    <input 
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        id="large-input"
                        placeholder="Write the title here..."
                        className="block w-full p-4 text-gray-600 focus:outline-none text-2xl focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div>
                        <textarea 
                            onChange={(e) => setDescription(e.target.value)}
                            id="message" 
                            rows={4} 
                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Write your thoughts here..."
                        ></textarea>
                    </div>
                    <button
                        type="button"
                        className="mt-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={handlePublish}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};
