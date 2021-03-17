import React,{useState,useEffect} from "react";
import { Box, ThemeProvider,Grid,CircularProgress,Button,Typography } from "@material-ui/core";
import { Close as CloseIcon} from "@material-ui/icons"
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import ViewJobModal from './components/Job/ViewJobModal'
// import jobsData from "./dummyData"
import {firestore,app} from './firebase/config'


export default () => {
     const [jobs,setJobs] =useState([]);
     const [loading,setLoading] =useState(true);
     const [openModal,setJobModal]=useState(false);
     const[customSearch,setCustomSearch]=useState(false)
     const[closeSearch,setCloseSearch]=useState(true)
      const [viewJob,setViewJob] =useState({})

     const fetchJobs= async()=>{
       setLoading(true)
       setCustomSearch(false)
       setCloseSearch(true)
       
       const req = await firestore.collection('jobs').orderBy('postedOn','desc').get()
       const jobs=req.docs.map(job=>({...job.data(),id:job.id}))
          setJobs(jobs)
          setLoading(false)
     };
     const postJob =async (jobData)=>{
        await firestore.collection('jobs').add({
          ...jobData,postedOn:app.firestore.FieldValue.serverTimestamp()
        });
        fetchJobs();
     };
     const fetchJobsCustom= async(jobSearch)=>{
        setLoading(true)
        setCustomSearch(true)
        setCloseSearch(false)
       
        const{type,location}=jobSearch
        console.log('type and loc',type,location)
        if((type=="All" || type=="") && (location=="All" ||location=="")){
          setLoading(false);console.log('empty one')
           return
          };
           let req="";
           if((type!=='All'&& type!=="") &&(location!=="All" && location!=="")){
             console.log('both')
             req = await firestore.collection('jobs').orderBy('postedOn','desc')
             .where('location','==',location).where('type','==',type).get()
           }
           else if((type==='All'||type==="") &&(location!=="All"||location!=="")){
            console.log('location')
             req =await firestore.collection('jobs').orderBy('postedOn','desc')
             .where('location','==',location).get()

           }
           else {
            console.log('type')
             req = await firestore.collection('jobs').orderBy('postedOn','desc').where('type','==',type).get()
           }

          // console.log('r is',condition)
      
       // const req = await firestore.collection('jobs').orderBy('postedOn','desc')+condition
        // (type!=='All'||type!=="") &&(location!=="All"||location!=="")? await firestore.collection('jobs').orderBy('postedOn','desc')
        // .where('location','==',location).where('type','==',type).get():
        // (type==='All'||type==="") &&(location!=="All"||location!=="") ? await firestore.collection('jobs').orderBy('postedOn','desc')
        //  .where('location','==',location).get():await firestore.collection('jobs').orderBy('postedOn','desc')
        //  .where('type','==',type).get()
      
         console.log( 'req is', req)
         const jobs=req.docs.map(job=>({...job.data(),id:job.id}))
         setJobs(jobs)
         console.log('jobs are',jobs)
         setLoading(false)
    };
     
     useEffect(()=>{
       fetchJobs()
     },
     [])
  return <ThemeProvider theme={theme}> 
    <Header openJobModal={()=>setJobModal(true)}/>
    <ViewJobModal job={viewJob} closeModal={()=>setViewJob({})}/>
    <NewJobModal postJob={postJob} openModal={openModal} closeModal={()=>setJobModal(false)}/>
    <Box mb={10}>
      <Grid container  justify="center">
       <Grid item xs={10}>
         <SearchBar fetchJobsCustom={fetchJobsCustom} closeSearch={closeSearch}/>
       </Grid>
       <Grid item  xs={10}>
         {loading&&<Box display="flex" justifyContent="center"><CircularProgress/></Box>}
         {customSearch&& <Box display="flex" justifyContent="flex-end">
           <Button variant="outlined"onClick={()=>{ fetchJobs()}}><CloseIcon size={20}/>Custom Search</Button>  </Box> }
          {jobs&&jobs.map(job=>( <JobCard handleClick={()=>setViewJob(job)} key ={job.id} {...job} />))}
          {!loading&&!jobs.length&&<Typography mt={2} variant ="h5"> No matching Jobs found!</Typography>}
        </Grid>
     </Grid>
    </Box>
  </ThemeProvider>
  //<Box>Desi Codes</Box>;
};
