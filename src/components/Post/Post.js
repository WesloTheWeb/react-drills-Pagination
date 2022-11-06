import { React } from 'react';
import classes from './Post.module.css';

const { boxContainer } = classes;

const Post = ({ title, id, body }) => {

    return (
        <div className={boxContainer}>
            <section>
                <small>{id}</small>
                <h2>
                    {title}
                </h2>
                <p>
                    {body}
                </p>
            </section>
        </div>
    );
};

export default Post;