import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type CardLocationProps = {
    name: string;
    id: number;
    dimension: string;
    type: string;
    url: string;
};

const CardLocation = ({
    name,
    dimension,
    id,
    type,
    url,
}: CardLocationProps) => {

    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 600 }}>
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="h4" component="div">
                    {dimension}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {type}
                </Typography>
                <Typography variant="body1">
                    Card content
                    <br />
                    {'"describes the content"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        navigate(`location/${id}`);
                    }}
                >
                    Edit
                </Button>
                <Button fullWidth variant="outlined" size="small">Delete</Button>
            </CardActions>
        </Card>
    );
};

export default CardLocation;
