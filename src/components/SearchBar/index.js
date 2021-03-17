import React,{useState,useEffect} from 'react';
import {Box, Grid,Select,Button, MenuItem,makeStyles, CircularProgress,InputLabel, FormControl } from '@material-ui/core';


  const useStyles  =  makeStyles(theme=>({
    wrapper:{
        backgroundColor:'#fff',
        display:"flex",
        flexWrap:"wrap",
        boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
        borderRadius:'5px',
        // marginBottom:theme.spacing(2),
        // marginTop:theme.spacing(-2),
        "& > *":{
            flex:1  ,
            height:"45px",
            margin:"8px"
        }    }
}));

export default props => {
       const classes = useStyles()
       const[loading,setLoading]=useState(false)
       const initState={
        type:'',
        location:''
    };
       const [jobSearch,setJobSearch]=useState(initState);

       
        console.log(props.closeSearch);
        
        useEffect(()=>{
                 if(props.closeSearch) setJobSearch(initState)
          },[props.closeSearch])

       const handleChange = (e) => {
        e.persist();
        setJobSearch(jobSearch => ({ ...jobSearch, [e.target.name]: e.target.value }))
        
    };
         const handleSearch=async ()=>{
        setLoading(true)
        await  props.fetchJobsCustom(jobSearch)
        setLoading(false)
    }
       const {type,location}=jobSearch
       console.log(jobSearch)
    return (
        <Box  p={2} mt={-5}  mb ={2} className={classes.wrapper}>
             <FormControl variant="outlined">
             <InputLabel id="job-type-label">job-type</InputLabel>
            <Select labelId="job-type-label" disableUnderline name="type" variant="filled" onChange={handleChange}   value={type}>
            
                <MenuItem  value ="All">All</MenuItem>
                <MenuItem  value ="Full time">Full time</MenuItem>
                <MenuItem value ="Part time">Part time</MenuItem>
                <MenuItem value ="Contract">Contract</MenuItem>
                
            </Select>
            </FormControl>
            <FormControl variant="outlined"> 
            <InputLabel id="location-label">Location</InputLabel>
            <Select labelId="location-label" disableUnderline name="location" onChange={handleChange} variant ="filled" value={location}>
                <MenuItem  value ="All">All</MenuItem>
                <MenuItem  value ="Remote">Remote</MenuItem>
                <MenuItem value ="In-office">In-office</MenuItem>
            </Select>
            </FormControl>
            <Button onClick={handleSearch} variant ="contained" color="primary" disableElevation>
            {loading ? <CircularProgress color="secondary" size={22} /> : 'Search'}
            </Button>
        </Box>
      );
}
 
