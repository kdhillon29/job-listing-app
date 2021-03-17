import React from "react"
import{Typography,Box,Grid} from "@material-ui/core"
import { Button } from "@material-ui/core"

 export default  ({openJobModal}) => (
    <Box py={10} bgcolor="secondary.main" color="white">
     <Grid container justify="center"> 
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between"> 
            <Typography  variant="h4">Open Job Listing</Typography>
            <Button onClick={openJobModal} variant ="contained" color="primary" disableElevation>Post a Job</Button>
           </Box>
      </Grid>
     </Grid>
    </Box>
    

)
    
