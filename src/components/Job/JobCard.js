import React from 'react'
import {Box,Typography,Grid,Button,Chip,makeStyles} from "@material-ui/core";
import{differenceInMinutes} from 'date-fns'

//const skills =["Javascript","React.js","Node.js"]
const useStyles =makeStyles((theme)=>({
    wrapper:{
        border:"1px solid #e8e8e8",
        cursor:"pointer",
        transition:".3s",

        "&:hover":{
            boxShadow:"0px 5px 25px rgba(0,0,0,0.1)",
            borderLeft:"6px solid #4D64E4"
        }
        
    },
    companyName:{
        fontSize:"13.5px",
        backgroundColor:theme.palette.primary.main,
        padding:theme.spacing(0.75),
        borderRadius:"5px",
        display:"inline-block",
        fontWeight:600
    },
    skillChip:{
        margin:theme.spacing(0.5),
         padding:theme.spacing(0.75),
         fontSize:"14.5px",
        borderRadius:"5px",
        fontWeight:600,
        backgroundColor:theme.palette.secondary.main,
        color:"#fff",
        


    }
}))

export default (props) => {
    const {title,type,location,postedOn,companyName,skills} =props
    const classes =useStyles();
    return(
        <Box p={1} className={classes.wrapper}>
            <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography variant="subtitle1">{title}</Typography>
                        <Typography className={classes.companyName} variant="subtitle2">{companyName}</Typography>

                    </Grid>
                    <Grid item container   xs>
                        {skills.map(skill=><Grid  item key={skill} className={classes.skillChip}>{skill}</Grid>)}
                    </Grid>
                    <Grid item container spacing={1} direction="column" alignItems="flex-end" xs>
                      <Grid item>
                        <Typography variant ="caption">{differenceInMinutes(Date.now(),postedOn)} mins ago | {type} | {location}</Typography>
                      </Grid>
                      <Grid item >
                          <Button  variant="outlined">check</Button>
                      </Grid>
                    </Grid>

            </Grid>
        </Box>

    )
       
}
