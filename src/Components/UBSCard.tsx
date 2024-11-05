import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';

interface UBSCardProps {
  name: string;
  address: string;
  type: string;
  distance: number;
}

const UBSCard: React.FC<UBSCardProps> = ({ name, address, distance}) => {
  return (
    <Card sx={{width: '100%', boxShadow: 3, borderRadius: "12px"}}>
        <CardContent>
            <Typography sx={{fontWeight: "bold"}} variant="h5" component="div">
            {name}
            </Typography>
            <Typography sx={{ mt: 0.5 }} color="text.secondary">
            {address}
            </Typography>

            <Typography color="gray" >
              {distance.toFixed(2)} km
            </Typography>

        </CardContent>

        <CardActions>
            <Button>Mais Detalhes</Button>
        </CardActions>
    
    </Card>
  );
};

export default UBSCard;
