import {hot} from "react-hot-loader/root.js";
import React from "react";
import * as styles from "./App.treat";

const App: React.FC = () => {
    return (
        <div className={styles.root}>
            Hello World
        </div>
    );
};

export default hot(App);
