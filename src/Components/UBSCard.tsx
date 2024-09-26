import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

interface UBSCardProps {
  name: string;
  address: string;
}

const UBSCard: React.FC<UBSCardProps> = ({ name, address}) => {
  return (
    <Card sx={{width: '100%', boxShadow: 3, borderRadius: "12px"}}>
        <CardContent>
            <Typography sx={{fontWeight: "bold"}} variant="h5" component="div">
            {name}
            </Typography>
            <Typography sx={{ mt: 0.5 }} color="text.secondary">
            {address}
            </Typography>
        </CardContent>

        <CardActions>
            <Button>Mais Detalhes</Button>
        </CardActions>
    
    </Card>
  );
};

export default UBSCard;
