import React,{useState,useEffect} from 'react';
import { Button,Grid,IconButton,Typography,Chip,Dialog,DialogTitle,DialogActions, Box, DialogContent,makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons';
import {format} from 'date-fns'

const useStyles =makeStyles({
    // contain:{
    //     display:"flex",
    //     flexDirection:'column',
    //     padding:"5px 20px",
    //     margin:"5px auto",
    //     borderRight:'1px solid #D3D3D3',
    //     justifyContent:"center"

    // },
    root:{
        backgroundColor:'light grey',
        borderBottom:"1px solid black",
        borderTop:'1px solid black'
    },
    info:{
        display:'flex',
        padding:'10px ',
         justifyContent:'space-around',
        
        '&>*':{
            marginLeft: '10px'

            
        },
    },
    lastitem:{
        
        alignSelf:'flex-end',
        marginleft:'auto'
        // borderTop:'1px solid grey'
    },
    rightBorder:{
        borderRight :'1px solid blue'
    },
    topBorder:{
        borderTop:'10px solid blue'
    }
})
export default ({job,closeModal})=>{
  //const {job} =props.job
 // const[job,setJob]=useState({})
//   useEffect(
//       ()=>setJob(props.job),[props.job])
//   const closeModal=()=>{
//       setJob({})

//   }
const {title,type,location,postedOn,link,description,companyName,companyUrl,skills} =job;
const classes =useStyles()
   return( <Box>
        <Dialog  open={!! Object.keys(job).length } fullWidth>
            <DialogTitle className={classes.topBorder}>
                <Box display="flex" ml={2} justifyContent="space-between" alignItems="center">
                    <Typography variant="body1"  >{title}@{companyName}</Typography>
                    <IconButton onClick={closeModal}><Close /></IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container className={classes.root} direction="row" justify="space-between" >
                <Grid item sm={5} container justify="space-between" direction="column" >
                <Box className={classes.info}>
                <Typography variant="caption">Title:</Typography>
                <Typography variant="body2">{title}</Typography>
              </Box>
              <Box className={classes.info}>
                <Typography variant="caption">Posted On:</Typography>
                <Typography variant="body1">{postedOn && format(postedOn.toDate(),"dd/MMM/yyyy")}</Typography>
              </Box>
              <Box className={classes.info}>
                <Typography variant="caption">Location:</Typography>
                <Typography variant="body1">{location}</Typography>
              </Box>
              <Box className={classes.info}>
                <Typography variant="caption">Company:</Typography>
                <Typography variant="body2">{companyName}</Typography>
              </Box>
              <Box className={classes.info}>
                <Typography variant="caption">website:</Typography>
                <Typography variant="body2">{companyUrl}</Typography>
              </Box>
                </Grid>
              
              
              <Grid item sm={7} container justify="flex-end"  direction="column">
              <Box className={classes.info}>
                <Typography variant="caption">Type:</Typography>
                <Typography variant="body1">{type}</Typography>
              </Box>
             
               <Box  className={classes.info}>
                <Typography variant="caption">Description:</Typography>
                <Typography variant="body2">{description}</Typography>
              </Box>
              
              <Box className={classes.info} >
                <Typography variant="caption">Skills:</Typography>
                <Grid container  spacing={1}>
                  {skills&&skills.map(skill=><Grid key={skill}  item><Chip label ={skill}/></Grid>)}  
                </Grid>
              </Box>

              </Grid>
             
              </Grid>

            </DialogContent>

            <DialogActions>
            
                 <Button variant="outlined" component="a" href="samsung.com/careers" target="_blank">Apply</Button>
             
            </DialogActions>


    </Dialog>

    </Box>
    


)}