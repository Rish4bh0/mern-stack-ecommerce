import React, { useState } from 'react';
import profilePng from "../../images/Profile.png"
import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


const ReviewCard = ({review}) => {

    const [showFullComment, setShowFullComment] = useState(false);
    const commentToShow = showFullComment ? review.comment : review.comment.slice(0, 100) + "...";

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    }

    const handleShowMoreClick = () => {
        setShowFullComment(!showFullComment);
    }
    const CustomButton = styled(Button)({
        fontSize: '0.8rem',
        padding: '4px 8px',
      });

    return (
        <div className="reviewCard">
            <img src={profilePng} alt="user" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className='reviewCardComment'>{commentToShow}</span>
            {review.comment.length > 100 &&
               <CustomButton variant="contained" onClick={handleShowMoreClick}>
               {showFullComment ? "Show Less" : "Show More"}
             </CustomButton>
            }
        </div>
    )
}

export default ReviewCard;
