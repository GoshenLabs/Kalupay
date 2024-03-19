// components/Announcement.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';

interface AnnouncementProps {
  text: string;
}

const Announcement: React.FC<AnnouncementProps> = ({ text }) => {
  return (
    <Box
      bgGradient="linear(to-bl, rgba(86, 171, 47, 0.8), rgba(168, 224, 99, 0.8))"
      color="white"
      p={4}
      textAlign="center"
      fontWeight="bold"
      height="50px" // Adjust height as needed
    >
      {text}
    </Box>
  );
};

export default Announcement;
