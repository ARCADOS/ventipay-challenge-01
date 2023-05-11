import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SimpleCard = ({ text, total }) => {
  return (
    <>
  <Card>
    <CardContent>
      <Typography variant="h5" component="div">
        {text}
      </Typography>
      <Typography variant="h4" component="div">
        {total}
      </Typography>
    </CardContent>
  </Card>
</>
  )
}

export default SimpleCard;
