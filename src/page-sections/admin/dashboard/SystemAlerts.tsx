import { Alert, AlertColor, Card, Stack } from "@mui/material";
// CUSTOM COMPONENTS
// import { MoreButton } from "@/components/more-button";
import { Paragraph } from "@/components/typography";
import { FlexBetween } from "@/components/flexbox";
// CUSTOM UTILS METHOD
import { Error } from "@mui/icons-material";

interface Alert {
  id: string;
  type: AlertColor;
  message: string;
  timestamp: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "error",
    message: "System maintenance scheduled",
    timestamp: "Just now",
  },
];

interface SystemAlertsProps {
  onActivityClick?: (alert: Alert) => void;
}

const SystemAlerts = ({ onActivityClick }: SystemAlertsProps) => {
  const alerts: Alert[] = mockAlerts;
  return (
    <Card sx={{ p: 3, height: "100%" }}>
      <FlexBetween mb={4}>
          <Paragraph ellipsis lineHeight={1.3} fontSize={18} fontWeight={500}>
            System Alerts
          </Paragraph>
      </FlexBetween>

      <Stack spacing={3}>
        {alerts.map(({ id, type, message, timestamp }) => (
                // <Alert severity="info" onClose={() => {}} icon={<Info />}>
                //   message
                // </Alert>
          
                // <Alert severity="success" onClose={() => {}} icon={<CheckCircle />}>
                //   This is a success alert — check it out!
                // </Alert>
          
                // <Alert severity="warning" onClose={() => {}} icon={<Warning />}>
                //   This is a warning alert — check it out!
                // </Alert>
          
                // <Alert id={id} severity="error" icon={<Error />}>
                //   {message}
                // </Alert>
                <Alert id={id} severity={type} icon={<Error />}>
                  {message}
                </Alert>
        ))}
      </Stack>
    </Card>
  );
};

export default SystemAlerts;
