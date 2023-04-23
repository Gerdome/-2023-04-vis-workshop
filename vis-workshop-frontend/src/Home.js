import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import {Box} from "@mui/material";

export function Home() {
    const navigate = useNavigate();
    return (
        <Box>
            <Button style={{'margin' : "2px"}} variant="contained" onClick={() => navigate("/issue")}>
                Issue ID
            </Button>
            <Button style={{'margin' : "2px"}} variant="contained" onClick={() => navigate("/verify")}>
                Verify ID
            </Button>
        </Box>
    )
}