import React from 'react'
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { TextareaAutosize } from '@mui/material';

function Commands({ display = false, content = '', resetContent = '' }) {
  if (display) return <Stack>
        <Accordion defaultExpanded>
          <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
          >
            To add new effect
          </AccordionSummary>
          <AccordionDetails>
            <TextareaAutosize
              readOnly
              style={{width: '100%'}}
              onFocus={(e) => e.target.select()}
              value={content}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            aria-controls="panel2-content"
            id="panel2-header"
          >
            To remove old effects
          </AccordionSummary>
          <AccordionDetails>
            <TextareaAutosize
              readOnly
              style={{width: '100%'}}
              onFocus={(e) => e.target.select()}
              value={content.replaceAll('.amod', '.rmod')}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            aria-controls="panel3-content"
            id="panel3-header"
          >
            To remove any legendary traits (clean reset)
          </AccordionSummary>
          <AccordionDetails>
            <TextareaAutosize
              readOnly
              style={{width: '100%'}}
              onFocus={(e) => e.target.select()}
              value={resetContent}
            />
          </AccordionDetails>
        </Accordion>
    </Stack>
}

export default Commands