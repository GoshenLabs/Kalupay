import React from 'react';
import { Box, Button, Input, Flex, Text } from '@chakra-ui/react';

const LaunchListWidget: React.FC = () => {
  return (
    <Flex align="center" justify="center" height="200">
      <Box>
      <center>
        <Text fontSize='2xl' as='b'>
              Sign Up for the Waitlist <br /> and Get 100 $KALU
        </Text>
        </center>
        <br /> 
        
        {/* Form collecting both name and email */}
        <form className="launchlist-form" action="https://getlaunchlist.com/s/s2BeHk" method="post" target="_blank">
          {/* Email Input */}
          <Input type="email" name="email" placeholder="Enter your email" mb={3} />
          {/* Submit Button */}
          <center>
          <Button type="submit" bgColor="white">SIGN UP NOW!</Button>
          </center>
        </form>
      </Box>
    </Flex>
  );
};

export default LaunchListWidget;
