import { Box } from "@mui/material";
import { forwardRef } from "react";

export const Item = forwardRef(({children, ...props}, ref) =>{
    return (
        <Box {...props} ref={ref}>{children}</Box>
    )
});