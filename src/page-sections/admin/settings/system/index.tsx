import { Fragment, useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  styled,
  Switch,
  TextField,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import { Backup, CameraAlt, KeyboardArrowDown, MoreHoriz } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
// CUSTOM ICON COMPONENTS
import DateRange from "@/icons/DateRange";
import Bratislava from "@/icons/Bratislava";
import MapMarkerIcon from "@/icons/MapMarkerIcon";
// CUSTOM COMPONENTS
// import { AvatarBadge } from "@/components/avatar-badge";
import { AvatarLoading } from "@/components/avatar-loading";
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { H6, Paragraph, Small } from "@/components/typography";
import { DropZone } from "@/components/dropzone";
import { useSnackbar } from "@/contexts/snackbarContext";

const NOTIFICATION_SETTINGS = [
  {
    id: 1,
    title: "Email Notifications",
    body: "Receive system alerts via email",
  },
  {
    id: 2,
    title: "SMS Notifications",
    body: "Receive urgent alerts via SMS",
  },
];

const SystemSettings = () => {
  const showSnackbar = useSnackbar();

  const theme = useTheme();
  const initialValues = {
    firstName: "Pixy",
    lastName: "Krovasky",
    email: "uilib@gmail.com",
    phone: "+443322221111",
    organization: "UiLib",
    department: "Develop",
    country: "usa",
    state: "New York",
    address: "Corverview, Michigan",
    zipCode: 4336,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Must be greater then 3 characters")
      .required("First Name is Required!"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required!"),
    phone: Yup.string().min(9).required("Phone Number is required!"),

  });

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => showSnackbar("System Settings Updated","Your system settings have been updated successfully."),
    });

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ pb: 2 }}>
        <Box padding={3}>
          <H6 fontSize={14}>Notification Settings</H6>
          {/* <Small color="text.secondary">
            Two-factor authentication adds to log in, in you'll need to provide a
            4 digit amazing code.
          </Small> */}
        </Box>

        <Divider />

        {NOTIFICATION_SETTINGS.map(({ id, title, body }) => (
          <FlexBetween
            key={id}
            sx={{
              borderBottom: 1,
              padding: "1rem 1.5rem",
              borderColor: "divider",
              "&:last-of-type": { borderBottom: 0 },
            }}
          >
            <FlexBox alignItems="center" gap={2}>
              <div>
                <Paragraph fontWeight={500} fontSize={14}>
                  {title}
                </Paragraph>

                <Small color="text.secondary" mt={0.3}>
                  {body}
                </Small>
              </div>
            </FlexBox>

            <Switch defaultChecked />
          </FlexBetween>
        ))}
      </Card>
      <Card sx={{ mt: 3 }}>

        <H6 fontSize={14} px={3} py={2}>
          Security Settings
        </H6>

        <Divider />

        <Box margin={3}>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
              <TextField
                select
                fullWidth
                name="sessionTimeout"
                label="Session Timeout"
                variant="outlined"
                placeholder="Session Timeout"
                SelectProps={{
                  native: true,
                  IconComponent: KeyboardArrowDown,
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                helperText={touched.country && errors.country}
                error={Boolean(touched.country && errors.country)}
              >
                <option value="1">15 minutes</option>
                <option value="2">30 minutes</option>
                <option value="3">60 minutes</option>
              </TextField>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                select
                fullWidth
                name="passLength"
                label="Minimum Password Length"
                variant="outlined"
                placeholder="Minimum Password Length"
                SelectProps={{
                  native: true,
                  IconComponent: KeyboardArrowDown,
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                helperText={touched.country && errors.country}
                error={Boolean(touched.country && errors.country)}
              >
                <option value="1">8 characters</option>
                <option value="2">10 characters</option>
                <option value="3">12 characters</option>
              </TextField>
            </Grid>
            <Grid>
              <FlexBetween
                sx={{
                  borderBottom: 1,
                  padding: "1rem 1.5rem",
                  borderColor: "divider",
                  "&:last-of-type": { borderBottom: 0 },
                }}
              >
                <FlexBox alignItems="center" gap={2}>
                  <div>
                    <Paragraph fontWeight={500} fontSize={14}>
                      Require Special Characters
                    </Paragraph>

                    <Small color="text.secondary" mt={0.3}>
                      Passwords must include symbols
                    </Small>
                  </div>
                </FlexBox>

                <Switch defaultChecked />
              </FlexBetween>
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Card sx={{ mt: 3 }}>

        <H6 fontSize={14} px={3} py={2}>
          Data Backup Settings
        </H6>

        <Divider />

        <Box margin={3}>
          <Grid container spacing={3}>
            <Grid item sm={10} xs={12}>
              <TextField
                select
                fullWidth
                name="backupFrequency"
                label="Backup Frequency"
                variant="outlined"
                placeholder="Backup Frequency"
                SelectProps={{
                  native: true,
                  IconComponent: KeyboardArrowDown,
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                helperText={touched.country && errors.country}
                error={Boolean(touched.country && errors.country)}
              >
                <option value="1">Dayli</option>
                <option value="2">Monthly Kingdom</option>
              </TextField>
            </Grid>
            <Grid item sm={2} xs={12}>
              {/* <IconButton onClick={() => {console.log(123)}}>
                  Backup Now
                <Backup fontSize="small" />
              </IconButton> */}
              <Button type="button" variant="outlined"
                onClick={() => showSnackbar("Backup Started","ysStem backup has been initiated. You will be notified when complete.")}
              >
                Backup Now
                <Backup sx={{paddingRight:"5px", paddingLeft:"5px"}}  />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Button sx={{ marginTop: 3 }} type="submit" variant="contained">
        Save Changes
      </Button>
    </form>
  );
};

export default SystemSettings;
