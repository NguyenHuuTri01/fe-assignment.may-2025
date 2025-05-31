import React from "react";
import { useLocation } from "react-router-dom";

const ProjectSubDetail = () => {

    const location = useLocation();
    const stateValue = location.state

    return (

        <div>
            {
                location.pathname == stateValue?.path &&
                <div>
                    hello world!!!
                </div>
            }
        </div>
    );
};

export default ProjectSubDetail;