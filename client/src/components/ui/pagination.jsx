import React from "react";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";

const PaginationHOC = ({ count, onChange, page }) => {
    const theme = createTheme({
        palette: {
            neutral: {
                main: "#fff",
                contrastText: "#fff"
            }
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <Pagination
                count={count}
                onChange={onChange}
                page={page}
                shape="rounded"
                variant="outlined"
                hidePrevButton
                hideNextButton
                size="large"
                color="neutral"
            />
        </ThemeProvider>
    );
};

PaginationHOC.propTypes = {
    count: PropTypes.number,
    onChange: PropTypes.func,
    page: PropTypes.number
};

export default PaginationHOC;
