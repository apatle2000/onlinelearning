import React from "react";
import CardContent from '@mui/material/CardContent';
import { useContext } from "react";
import { AppStates } from "../Contents/States";
import { useNavigate } from "react-router-dom";

const ContentCard = (params) =>{

    //context variables
    const {Token,LoggedAs} = useContext(AppStates);

    //to navigate 
    const navigate = useNavigate();
    return (
    <div className="ContentCard">
        <CardContent>
        <h6>{params.data}</h6>
      </CardContent>
    </div>
    );
};

export default ContentCard;