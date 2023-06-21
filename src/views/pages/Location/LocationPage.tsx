import { useState } from "react";
import { useParams } from "react-router-dom";
import { TypeLocation } from "../../../types/location";
import { useEffect } from "react";
import { locations } from "../../../api/locations";
import {
    Box,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

const LocationPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState<TypeLocation | null>(null);

    useEffect(() => {
        setLoading(true);
        locations
            .fetchLocation({ id })
            .then((r) => {
                setLocation(r.data);
                setTimeout(() => setLoading(false), 1000);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <Container maxWidth="xl">
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid sx={{ mt: 2 }} container columnSpacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h1">{location!.name}</Typography>
                            <Divider />
                            <Typography variant="h6">{location!.dimension}</Typography>
                            <Box sx={{ mt: 2 }}>
                                <Chip
                                    color="primary"
                                    variant="outlined"
                                    label={location!.type}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <img
                                alt="character"
                                src={location!.url}
                                style={{ width: "100%", borderRadius: "0.5em" }}
                            />
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default LocationPage;
