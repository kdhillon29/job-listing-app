import React, { useState, useEffect } from 'react';
import {
    Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle,
    DialogContent, Chip, Typography, makeStyles, DialogActions, Button, IconButton, CircularProgress,FormControl,FormHelperText
} from '@material-ui/core';
import { Close } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
    skillChip: {
        border: `1px solid ${theme.palette.secondary.main}`,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: '#fff'
        },
    },
    included: {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff'
    },
    heading: {
        color: "purple",

    },
    error:{
        visibility:'hidden',
        color:'blue',
        borderTop:'1px solid red',
        fontWeight:'bold'
    }
}))

export default props => {
    const initState = {
        title: '',
        type: 'Full time',
        companyName: '',
        companyUrl: '',
        location: 'Remote',
        link: '',
        description: '',
        skills: []
    }
    const [job, setJob] = useState(initState);
    const [loading, setLoading] = useState(false)

    const classes = useStyles()
    const { title, type, companyName, companyUrl, location, link, description, skills } = job;
    const { postJob } = props;
    console.log('skills are ', skills)
    const skillsList = ['javaScript', 'Vue', 'React', 'Node', 'MongoDB', 'Firebase', 'SQL'];


    const handleChange = (e) => {
        e.persist();
        setJob(oldJob => ({ ...oldJob, [e.target.name]: e.target.value }))
        console.log(job)
    };
    const handleSkills = skill => {
        skills.includes(skill) ?
        setJob(oldJob => ({ ...oldJob, skills: skills.filter(s => s !== skill) })) :
        setJob(oldJob => ({ ...oldJob, skills: skills.concat(skill) }));
    };
    const handleSubmit = async () => {
        const errors=[]
        for(const field in job){
            console.log(field)
            if(typeof job[field]==='string' && !job[field]){
                 errors.push(`${field} required`)
                console.log(`${field} empty`)
            }  
            else if(typeof job[field]!=='string' && !job.skills.length) {
                errors.push('select at least one skill')
                 console.log('select at least one skill') 
            }
           // else console.log('validated')
            
            
        }
       errors.length? console.log(errors.toString()):console.log('validated')
        return

        // setLoading(true)
        // await postJob(job)
        closeModal()
    }
    const closeModal = () => {
        setJob(initState)
        setLoading(false)
        props.closeModal()
    }

    return (
        <Dialog open={props.openModal} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" className={classes.heading} >Post Job</Typography>
                    <IconButton onClick={closeModal}><Close /></IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl  fullWidth error={!title}>
                        < FilledInput id="title-error"  required onChange={handleChange}
                            name="title" value={title} autoComplete="off" placeholder="Job Title*" fullWidth disableUnderline />
                      <FormHelperText className={title && classes.error}  id="title-error-text">Error:Value req</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="type" value={type} fullWidth disableUnderline variant="filled" defaultValue="Full time">
                            <MenuItem value="Full time">Full time</MenuItem>
                            <MenuItem value="Part time">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput error onChange={handleChange}
                            name="companyName" value={companyName} autoComplete="off" placeholder="Company Name*" fullWidth disableUnderline />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange}
                            name="companyUrl" value={companyUrl} autoComplete="off" placeholder="Company Url*" fullWidth disableUnderline />
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="location" value={location} fullWidth disableUnderline variant="filled" defaultValue="Remote">
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="In-office">In-office</MenuItem> </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange}
                            name="link" value={link} autoComplete="off" placeholder="Job Link*" fullWidth disableUnderline />
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange}
                            autoComplete="off"
                            multiline
                            name="description" value={description}
                            rows={4}
                            placeholder="Job Description*"
                            fullWidth
                            disableUnderline />
                    </Grid>
                </Grid>
                <Box display="flex" flexWrap="wrap" mt={2}>
                    <Typography>Skills:</Typography>
                    {skillsList.map(skill => <Chip clickable={true} onClick={(e) => handleSkills(skill)}
                        className={`${classes.skillChip} ${job.skills.includes(skill) && classes.included}`} key={skill} label={skill} />)}
                </Box>
            </DialogContent>

            <DialogActions>
                <Box
                    color="red"
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography variant="caption">*Required Fields</Typography>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        variant="contained"
                        disableElevation
                        color="primary"> {loading ? <CircularProgress color="secondary" size={22} /> : ' Post Job'}</Button>
                </Box>

            </DialogActions>


        </Dialog>
    )
}