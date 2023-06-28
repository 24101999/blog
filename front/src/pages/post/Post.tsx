import React, { useEffect, useState } from "react";
import styles from "../post/Post.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "inspector";
type Props = {};

interface inf {
    id: number;
    titulo?: string;
    descricao?: string;
    autor?: string;
    img?: string;
}

const Post = (props: Props) => {
    const [post, setPost] = useState<inf>();
    const param = useParams();
    const id = param.id;
    const nav = useNavigate();
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/posts/${id}`).then((res) => {
            setPost(res.data);
        });
        console.log(post);
    }, []);

    return (
        <div
            className={styles.posts}
            style={{ backgroundImage: ` url(${post ? post.img : ""})` }}
        >
            <button className={styles.voltar} onClick={() => nav("/")}>
                Voltar
            </button>
            {post ? (
                <div className={styles.post}>
                    <img src={post.img} alt="" />
                    <h1>{post.titulo}</h1>
                    <p>
                        <strong>{post.autor}</strong>
                    </p>
                    <p>{post.descricao}</p>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Post;
