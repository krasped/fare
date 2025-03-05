import { Card, Stack, Button, Box } from "@mui/material";
import Add from "@mui/icons-material/Add";
// CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { H6, Paragraph, Small } from "@/components/typography";
// CUSTOM ICON COMPONENT
import DateRange from "@/icons/DateRange";

const Post = () => {
  return (
    <Card sx={{ padding: 3 }}>
      <Stack spacing={3} mt={2}>
        <SinglePost
          name="Sarah Wilson"
          date="Nov 21, 2021"
          description="Status changed from Open to In Progress"
        />

        <SinglePost
          name="Sarah Wilson"
          date="Aug 21, 2021"
          description="Investigating the dashboard access issue. Please provide your browser version."
        />

       
      </Stack>
    </Card>
  );
};

export default Post;

// =======================================================================================
type PostProps = {
  date?: string;
  name: string;
  description: string;
};
// =======================================================================================

function SinglePost({ date, name, description }: PostProps) {
  return (
    <FlexBetween>
      <Stack spacing={0.5}>
        <H6 fontSize={14}>{name}</H6>
        <Paragraph color="grey.500">{description}</Paragraph>

        {/* <FlexBox gap={0.5} alignItems="center" color="text.secondary">
          <DateRange sx={{ fontSize: 20 }} />
          <Small lineHeight={1}>Publish on {date}</Small>
        </FlexBox> */}
      </Stack>
    </FlexBetween>
  );
}
