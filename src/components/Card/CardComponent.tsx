import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { addToCart } from "../../redux/slices/cart.slice";
import { useState } from "react";
import { useEffect } from "react";

type CardProps = {
  image: string;
  name: string;
  gender: string;
  status: string;
  species: string;
  id: number;
};

export const CardComponent: React.FC<CardProps> = ({
  image,
  name,
  gender,
  status,
  species,
  id,
}) => {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const itemExist = useAppSelector((state) => state.cartReducer);

  useEffect(() => {
    setDisabledBtn(itemExist.some((item) => item.id === id));
  }, [itemExist, id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        image,
        info: status,
      })
    );
  };

  return (
    <Card sx={{ mt: 5 }}>
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          {name}
        </Typography>
        <Divider />
        <Typography sx={{ mt: 1.5 }}>Species: {species}</Typography>
        <Typography sx={{ mt: 1.5 }}>Status: {status} </Typography>
        <Typography sx={{ mt: 1.5 }}>Gender: {gender} </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          size="small"
          onClick={() => {
            navigate(`character/${id}`);
          }}
        >
          More info
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          disabled={disabledBtn}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
