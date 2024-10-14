import React from 'react'

import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import armors from "../static/armors.json"

function Armors({
  quality,
  setQuality,
  option1,
  setOption1,
  option2,
  setOption2,
  option3,
  setOption3,
}) {

  const handleChange = (event, setter) => {
    const value = event.target.value
    setter(value)
  }

  return (
    <Grid size={6}>
      <Stack spacing={2}>
        <Box sx={{width: '100%'}}>
          <FormControl fullWidth>
            <InputLabel id="select-quality-label">Quality</InputLabel>
            <Select
              labelId="select-quality-label"
              id="select-quality"
              value={quality}
              label="Quality"
              onChange={(e) => handleChange(e, setQuality)}
            >
              {armors.quality.map(opt => <MenuItem value={opt.id}>
                <span style={{textTransform: "uppercase"}}>{opt.name}</span>
              </MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="select-option-1-label">Option 1</InputLabel>
            <Select
              labelId="select-option-1-label"
              id="select-option-1"
              value={option1}
              label="Option 1"
              onChange={(e) => handleChange(e, setOption1)}
            >
              {armors.modifier1.map(opt => <MenuItem value={opt.id}>
                <span style={{textTransform: "uppercase"}}>{opt.name}</span>
                &nbsp;
                <span style={{fontSize: "80%", fontWeight: "bold"}}>({opt.desc})</span>
              </MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="select-option-1-label">Option 2</InputLabel>
            <Select
              labelId="select-option-2-label"
              id="select-option-2"
              value={option2}
              label="Option 2"
              onChange={(e) => handleChange(e, setOption2)}
            >
              {armors.modifier2.map(opt => <MenuItem value={opt.id}>
                <span style={{textTransform: "uppercase"}}>{opt.name}</span>
                &nbsp;
                <span style={{fontSize: "80%", fontWeight: "bold"}}>({opt.desc})</span>
              </MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="select-option-1-label">Option 3</InputLabel>
            <Select
              labelId="select-option-3-label"
              id="select-option-3"
              value={option3}
              label="Option 3"
              onChange={(e) => handleChange(e, setOption3)}
            >
              {armors.modifier3.map(opt => <MenuItem value={opt.id}>
                <span style={{textTransform: "uppercase"}}>{opt.name}</span>
                &nbsp;
                <span style={{fontSize: "80%", fontWeight: "bold"}}>({opt.desc})</span>
              </MenuItem>)}
            </Select>
          </FormControl>  
        </Box>
      </Stack>
    </Grid>
  )
}

export default Armors