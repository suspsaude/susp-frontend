import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface InfoCardProps {
  icon: React.ReactNode;  // Icon component
  title: string;          // Title of the card (e.g., "Contact")
  details: string;        // Information displayed (e.g., phone number)
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, details }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', paddingX: 2, paddingTop: 1, boxShadow: 1, mb: 2, borderRadius: "10px"}}>
      <Box sx={{ mr: 2 }}>
        {icon} {/* Icon on the left */}
      </Box>
      <CardContent sx={{ padding: '8px 0px' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
