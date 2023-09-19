import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Character } from "../../types/episodes";

type CardEpisodeProps = {
    id: number;
    name: string;
    air_date: Date;
    episode: string;
    characters: Character[];
};

const CardEpisode = ({
    id,
    name,
    air_date,
    episode,
    characters,
}: CardEpisodeProps) => {

    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 600 }}>
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="h4" component="div">
                    {air_date.toString()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {episode}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {characters.length}
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
                        navigate(`episode/${id}`);
                    }}
                >
                    Edit
                </Button>
                <Button fullWidth variant="outlined" size="small">Delete</Button>
            </CardActions>
        </Card>
    );
};

export default CardEpisode;
