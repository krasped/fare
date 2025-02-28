import { Box, Button, Card, IconButton, Link, styled } from "@mui/material";
import {
  FacebookRounded,
  GitHub,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
// CUSTOM COMPONENTS
import { FlexBox } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { Link as RouterLink } from "@/components/link";

// STYLED COMPONENT
const StyledCard = styled(Card)(({ theme }) => ({
  gap: 16,
  padding: 24,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  "& .buttons": { textAlign: "right" },
  [theme.breakpoints.down(655)]: {
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Footer = () => {
  return (
    <StyledCard>
      <div>
        <Paragraph fontSize={20} fontWeight={600}>
          Essence Admin Template
        </Paragraph>

        <Paragraph color="text.secondary" mb={3}>
          Clean UI design & Well documentation
        </Paragraph>

        <Button>Buy Now</Button>
      </div>

      <div>
        <FlexBox alignItems="center" gap={2}>
          <Link component={RouterLink} href="#">
            About
          </Link>

          <Link component={RouterLink} href="#">
            Support
          </Link>

          <Link component={RouterLink} href="#">
            Terms & Conditions
          </Link>
        </FlexBox>

        <Box className="buttons" mt={1}>
          <IconButton>
            <Twitter />
          </IconButton>

          <IconButton>
            <LinkedIn />
          </IconButton>

          <IconButton>
            <FacebookRounded />
          </IconButton>

          <IconButton>
            <GitHub />
          </IconButton>
        </Box>
      </div>
    </StyledCard>
  );
};

export default Footer;
