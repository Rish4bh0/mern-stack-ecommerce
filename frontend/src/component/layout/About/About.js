import React from 'react';
import styled from 'styled-components';

const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`;

const Heading = styled.h1`
   font-size: 3rem;
   margin-bottom: 20px;
`;

const SubHeading = styled.h2`
   font-size: 2rem;
   margin-top: 40px;
   margin-bottom: 20px;
`;

const Text = styled.p`
   font-size: 1.5rem;
   line-height: 1.8;
   max-width: 800px;
   text-align: center;
`;

const ListContainer = styled.ul`
   list-style: none;
   margin: 0;
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: space-around;
   width: 100%;
   max-width: 800px;
   margin-top: 40px;

   li {
      text-align: center;
      font-size: 1.2rem;
      line-height: 1.4;
      color: #777;
      margin-right: 20px;
      &:last-child {
         margin-right: 0;
      }
   }
`;

const AboutUs = () => {
   return (
      <AboutUsContainer>
         <Heading>About Us</Heading>
         <Text>Sam Fitness is dedicated to providing our customers with the best gym products and equipment on the market. We believe that fitness should be accessible to everyone, regardless of their level of experience or budget.</Text>
         <Text>Our team is made up of passionate fitness enthusiasts who are committed to helping you achieve your goals. Whether you're a seasoned athlete or just starting out, we have the expertise and resources to help you succeed.</Text>
         <SubHeading>Our Mission</SubHeading>
         <Text>At Sam Fitness, our mission is to empower people to live healthier, happier lives through fitness. We believe that fitness is more than just a hobby – it's a lifestyle. That's why we offer a wide range of high-quality fitness products and equipment at affordable prices.</Text>
         <SubHeading>Our Values</SubHeading>
         <ListContainer>
            <li>Integrity – We are committed to honesty and transparency in all of our business dealings.</li>
            <li>Quality – We strive to provide our customers with the highest quality products and services.</li>
            <li>Innovation – We are always looking for new and innovative ways to improve our products and services.</li>
            <li>Customer Service – We value our customers and are dedicated to providing exceptional customer service.</li>
         </ListContainer>
      </AboutUsContainer>
   );
}

export default AboutUs;