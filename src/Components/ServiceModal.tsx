import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  services: {
    [key: string]: string[];
  };
}

const ServiceModal: React.FC<ServiceModalProps> = ({ open, onClose, services }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Lista de Especialidades</DialogTitle>
      <DialogContent>
        <List>
          {Object.entries(services).map(([category, serviceList], index) => (
            <React.Fragment key={index}>
              <Typography variant="h6">{category}</Typography>
              {serviceList.map((service, i) => (
                <ListItem key={i}>
                  <ListItemText primary={service} />
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
