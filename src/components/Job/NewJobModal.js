import React from 'react';
import { Box, Grid, FilledInput,
     Select, MenuItem, Dialog, DialogTitle,
      DialogContent, Chip, Typography,makeStyles, DialogActions, Button, IconButton } from '@material-ui/core';

import{Close} from "@material-ui/icons"

const skills=['javaScript','Vue','React','Node','MongoDB','Firebase','SQL'];
const useStyles=makeStyles(theme=>({
    skillChip:{
        border:`1px solid ${theme.palette.secondary.main}`,
        cursor:"pointer",
        "&:hover":{
            backgroundColor:theme.palette.secondary.main,
            color:'#fff'

        },
    },
    heading:{
        color:"purple",
        
    }

    
}))
export default props => {
    const classes =useStyles()
    return (
        <Dialog open={false} fullWidth>
            <DialogTitle>
                <Box  display="flex" justifyContent="space-between" alignItems="center">
                    <Typography  variant="h5" className={classes.heading} >Post Job</Typography>
                    <IconButton><Close/></IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                       <FilledInput placeholder="Job Title*" fullWidth disableUnderline />
                    </Grid>
                    <Grid item xs={6}>
                        <Select fullWidth disableUnderline variant="filled" defaultValue="Full time">
                            <MenuItem  value ="Full time">Full time</MenuItem>
                            <MenuItem value ="Part time">Part time</MenuItem>
                            <MenuItem value ="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Company Name*" fullWidth disableUnderline />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Company Url*" fullWidth disableUnderline />
                    </Grid>
                    <Grid item xs={6}>
                        <Select fullWidth disableUnderline variant ="filled" defaultValue="Remote">
                         <MenuItem  value ="Remote">Remote</MenuItem>
                         <MenuItem value ="In-office">In-office</MenuItem>
                     </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Job Link*" fullWidth disableUnderline />
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput
                          multiline
                          rows={4}
                          placeholder="Job Description*"
                          fullWidth
                          disableUnderline />
                    </Grid>
                </Grid>
                <Box display="flex" flexWrap="wrap" mt={2}>
                    <Typography>Skills:</Typography>
                    {skills.map(skill=><Chip className={classes.skillChip} key={skill} label={skill}/>)}
                </Box>
            </DialogContent>

            <DialogActions>
                <Box
                  color="red"
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center">
                    <Typography  variant="caption">*Required Fields</Typography>
                    <Button variant="contained" disableElevation color="primary">Post Job</Button>
                </Box>

            </DialogActions>


        </Dialog>
    )
}