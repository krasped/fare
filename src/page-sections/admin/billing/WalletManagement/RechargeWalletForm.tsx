import { FC } from "react";
import {
  Grid,
  Stack,
  Theme,
  Button,
  TextField,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
// CUSTOM COMPONENTS
import { H5 } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
// ==========================================================================
type AddCompaignFormProps = { handleCancel: () => void; data?: any };
// ==========================================================================

const AddCompaignForm: FC<AddCompaignFormProps> = ({ handleCancel, data }) => {
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const ALL_AGENTS = [
    { id: 1, name: "John Doe", value: 1 },
    { id: 2, name: "Jane Smith", value: 2 },
    { id: 3, name: "Mike Johnson", value: 3 },
  ];

  const initialValues = {
    agentName: data?.name || "",
    amount: 0,
  };

  const validationSchema = Yup.object({
    agentName: Yup.string()
      .required("Agent Name is Required!"),
    amount: Yup.number(),
  });

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <div>
      <H5 fontSize={16} mb={4}>
        {"Recharge Wallet"}
      </H5>
      <form onSubmit={handleSubmit}>
        <Scrollbar autoHide={false} style={{ maxHeight: downSm ? 300 : "" }}>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
              <TextField
                name="agentName"
                select
                fullWidth
                variant="outlined"
                label="Parent Agency"
                value={values.agentName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.agentName && touched.agentName)}
                helperText={(touched.agentName && errors.agentName) as string}
              >
                {ALL_AGENTS.map(({ id, name, value }) => (
                  <MenuItem key={id} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Amount"
                variant="outlined"
                onBlur={handleBlur}
                value={values.amount}
                onChange={handleChange}
                error={Boolean(errors.amount && touched.amount)}
                helperText={(touched.amount && errors.amount) as string}
              />
            </Grid>
          </Grid>
        </Scrollbar>

        <Stack direction="row" alignItems="center" spacing={1} mt={4}>
          <Button type="submit" size="small">
            Confirm Recharge
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddCompaignForm;
