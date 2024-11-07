import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';

interface UBSCardProps {
  name: string;
  address: string;
  type: string;
  distance: number;
  onDetailsClick: () => void; 
}

const UBSCard: React.FC<UBSCardProps> = ({ name, address, distance, onDetailsClick}) => {
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
            <Button onClick={onDetailsClick}>Mais Detalhes</Button>
        </CardActions>
    
    </Card>
  );
};

export default UBSCard;
