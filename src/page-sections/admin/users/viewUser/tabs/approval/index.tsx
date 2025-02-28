import { Card, Stack, Button, Box, Switch, styled } from "@mui/material";
import Add from "@mui/icons-material/Add";
// CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { H6, Paragraph, Small } from "@/components/typography";
// CUSTOM ICON COMPONENT
import DateRange from "@/icons/DateRange";
import { Check } from "@mui/icons-material";

const SwitchWrapper = styled(FlexBetween)({
  width: "100%",
  marginTop: 10,
});

const Approval = () => {
  return (
    <Card sx={{ padding: 3 }}>
      <Box maxWidth={250} marginBottom={1}>
        <H6 fontSize={18}>Approval Requirements</H6>
              <SwitchWrapper>
                <Paragraph display="block" fontWeight={500}>
                  Required Documents
                </Paragraph>

                <Switch defaultChecked />
              </SwitchWrapper>

              <SwitchWrapper>
                <Paragraph display="block" fontWeight={500}>
                  Subscription Payment
                </Paragraph>
                <Switch defaultChecked />
              </SwitchWrapper>
              <SwitchWrapper>
                <Paragraph display="block" fontWeight={500}>
                  Agency Association  
                </Paragraph>
                <Switch defaultChecked />
              </SwitchWrapper>
            </Box>
      <FlexBox>
        <Button color="success">
          <Check/>
          User Approved
        </Button>
      </FlexBox>
    </Card>
  );
};

export default Approval;

