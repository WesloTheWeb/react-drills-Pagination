import { React } from 'react';
import classes from './Box.module.css';

const { boxContainer } = classes;

const Box = ({ header, index, description }) => {

    return (
        <div className={boxContainer}>
            <section>
                <h2>
                    {index}
                </h2>
                <h2>
                    {header}
                </h2>
                <p>
                    {description}
                </p>
            </section>
        </div>
    );
};

export default Box;