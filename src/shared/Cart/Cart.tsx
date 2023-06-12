import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import React from "react";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import { useAppSelector } from "../../redux/hooks";

interface CartProps {
  open: boolean;
  handleStateViewDrawer: () => void;
}

export const Cart: React.FC<CartProps> = ({ open, handleStateViewDrawer }) => {
  const items = useAppSelector((state) => state.cartReducer);

  return (
    <Drawer anchor={"right"} open={open}>
      <Box sx={{ width: "25em", p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Cart</Typography>
          <IconButton
            color="primary"
            onClick={() => {
              handleStateViewDrawer();
            }}
          >
            <CloseRounded />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        {items.length > 0 ? (
          items.map(({ id, image, name, info }) => (
            <HorizontalCard
              id={id}
              key={id}
              image={image}
              name={name}
              info={info}
            ></HorizontalCard>
          ))
        ) : (
          <div>
            <Typography variant="h3">Nothing here</Typography>
          </div>
        )}
      </Box>
    </Drawer>
  );
};
