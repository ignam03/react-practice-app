import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../redux/hooks";
import { removeToCart } from "../../redux/slices/cart.slice";

type CardHorizontalProps = {
  id: string | number;
  image: string;
  name: string;
  info: string;
};

const HorizontalCard: React.FC<CardHorizontalProps> = ({
  id,
  image,
  name,
  info,
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveToCart = () => {
    dispatch(
      removeToCart({
        id,
      })
    );
  };
  return (
    <Card sx={{ display: "flex", my: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        width={151}
        image={image}
        alt="Rick and Mort"
      />
        <Grid container sx={{ mx: 1 }}>
          <Grid item xs={9}>
            <CardContent>
              <Typography variant="h4">{name}</Typography>
              <Divider />
              <Typography variant="h4">{info}</Typography>
            </CardContent>
          </Grid>
          <Grid item xs={9}>
            <CardActions>
              <IconButton onClick={handleRemoveToCart}>
                <CloseIcon />
              </IconButton>
            </CardActions>
          </Grid>
        </Grid>
    </Card>
  );
};

export default HorizontalCard;
