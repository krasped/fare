import { Box, Container, TextField, styled } from "@mui/material";
import { Search } from "@mui/icons-material";
// CUSTOM COMPONENT
import { H1 } from "@/components/typography";

// STYLED COMPONENTS
const SearchWrapper = styled("div")({
  paddingBlock: "3rem",
  backgroundImage:
    "linear-gradient(270.02deg, #0E1421 55.41%, #270B63 100.36%)",
});

const StyledTextField = styled(TextField)({
  ".MuiOutlinedInput-root": { backgroundColor: "white", borderRadius: 8 },
  maxWidth: 450,
  width: "100%",
});

const ContentWrapper = styled("div")(({ theme }) => ({
  gap: 16,
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "1fr 1fr",
  [theme.breakpoints.down("md")]: {
    gap: 32,
    gridTemplateColumns: "1fr",
    "& .content": { textAlign: "center" },
  },
}));

const Section1 = () => {
  return (
    <SearchWrapper>
      <Container maxWidth="lg">
        <ContentWrapper>
          <Box className="content">
            <H1 mb={3} color="white" fontSize={{ sm: 52, xs: 36 }}>
              How can we help you?
            </H1>

            <StyledTextField
              placeholder="Search Questions"
              InputProps={{ startAdornment: <Search /> }}
            />
          </Box>

          <Box textAlign="center">
            <img src="/static/pages/faq.svg" alt="faq" />
          </Box>
        </ContentWrapper>
      </Container>
    </SearchWrapper>
  );
};

export default Section1;
