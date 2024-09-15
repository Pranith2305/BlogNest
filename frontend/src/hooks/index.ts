import axios from "axios";
import { useEffect, useState } from "react";
import { BackendURL } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
       name: string;
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem("token") || '{}');
        const token = storedToken.jwt;

        console.log("Fetching blog with ID:", id);
        console.log("Using token:", token);

        if (!token) {
            console.error("Token is missing!");
            setLoading(false);
            return;
        }

        axios.get(`${BackendURL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((res) => {
            console.log("Response from server:", res.data);
            setBlog(res.data.posts);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching the blog:", err);
            setLoading(false);
        });
    }, [id]);

    return {
        loading,
        blog,
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            const storedToken = JSON.parse(localStorage.getItem("token") || '{}');
            const token = storedToken.jwt;

            console.log("Fetching all blogs");
            console.log("Using token:", token);

            if (!token) {
                console.error("Token is missing!");
                setLoading(false);
                setError("Token missing");
                return;
            }

            try {
                const response = await axios.get(`${BackendURL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                console.log("Response from bulk fetch:", response.data);
                setBlogs(response.data.posts || []);
                setError(null); // Clear error on success
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Failed to fetch blogs.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return {
        loading,
        blogs,
        error,
    };
};
