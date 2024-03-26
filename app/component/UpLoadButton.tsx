import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { AiFillFileAdd } from "react-icons/ai";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
    borderRadius: "50%",
});

export default function InputFileUpload() {
    return (
        <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<AiFillFileAdd size={45} />}
            sx={{ textAlign:"center" }}
        >
            Subir Archivo
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}
