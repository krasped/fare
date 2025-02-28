import { Fragment, useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  styled,
  TextField,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import { CameraAlt, KeyboardArrowDown, MoreHoriz } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
// CUSTOM ICON COMPONENTS
import DateRange from "@/icons/DateRange";
import Bratislava from "@/icons/Bratislava";
import MapMarkerIcon from "@/icons/MapMarkerIcon";
// CUSTOM COMPONENTS
import { AvatarBadge } from "@/components/avatar-badge";
import { AvatarLoading } from "@/components/avatar-loading";
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { H6, Paragraph, Small } from "@/components/typography";
import { DropZone } from "@/components/dropzone";
import { useSnackbar } from "@/contexts/snackbarContext";

const AccountSettings = () => {
      const showSnackbar = useSnackbar();
  
  const theme = useTheme();
  const [files, setFiles] = useState([]);
  

  const handleDropFile = useCallback((acceptedFiles: any) => {
    const files = acceptedFiles.map((file: any) =>
      Object.assign(file, { preview: URL.createObjectURL(file) }),
    );
    setFiles(files);
    showSnackbar("Logo Uploaded","Company logo has been updated successfully.")
  }, []);

  console.log(files);


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
      onSubmit: (values) => showSnackbar("Profile Updated", "Your profile has been updated successfully."),
    });

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ mt: 3 }}>
        <H6 fontSize={14} px={3} py={2}>
          Profile Information
        </H6>

        <Divider />

          <Box margin={3}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  helperText={touched.firstName && errors.firstName}
                  error={Boolean(touched.firstName && errors.firstName)}
                />
              </Grid>

              {/* <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  helperText={touched.lastName && errors.lastName}
                  error={Boolean(touched.lastName && errors.lastName)}
                />
              </Grid> */}

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email && errors.email}
                  error={Boolean(touched.email && errors.email)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  helperText={touched.phone && errors.phone}
                  error={Boolean(touched.phone && errors.phone)}
                />
              </Grid>


              {/* <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  name="country"
                  label="Country"
                  variant="outlined"
                  placeholder="Country"
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
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="uae">United Arab Emirates</option>
                </TextField>
              </Grid> */}
              {/* <Grid item xs={12}>
               
                <Button variant="outlined" sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </Grid> */}
            </Grid>
          </Box>
      </Card>
      <Card sx={{ mt: 3 }}>

        <H6 fontSize={14} px={3} py={2}>
          Company Branding
        </H6>

        <Divider />

          <Box margin={3}>
            <Card>
              <DropZone onDrop={handleDropFile} />
            </Card>
          </Box>
      </Card>

      <Button sx={{marginTop: 3}} type="submit" variant="contained">
                  Save Changes
      </Button>
    </form>
  );
};

export default AccountSettings;
