import { useState, useEffect } from 'react'
import weapons from "./static/weapons.json"
import armors from "./static/armors.json"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import WeaponsComponent from './components/Weapons.js'
import ArmorsComponent from './components/Armors.js'
import Commands from './components/Commands.js';

import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [itemType, setItemType] = useState('weapons');
  const [itemID, setItemID] = useState('');
  const [itemIDError, setItemIDError] = useState('');
  const [quality, setQuality] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [textAreaContent, setTextAreaContent] = useState('');
  const [fullResetContent, setFullResetContent] = useState('');
  const [favorites, setFavorites] = useState([])

  const handleItemTypeChange = (event) => {
    setItemType(event.target.value)
  }

  const handleSaveFavorite = () => {
    if (!localStorage.getItem(`sfl-${itemType}`)) localStorage.setItem(`sfl-${itemType}`, JSON.stringify([]))
    const newStorage = [...JSON.parse(localStorage.getItem(`sfl-${itemType}`)), {
      quality,
      option1,
      option2,
      option3
    }]
    localStorage.setItem(`sfl-${itemType}`, JSON.stringify(newStorage))
    setFavorites(newStorage)
  }

  const handleDeleteFavorite = (e, i) => {
    e.preventDefault()
    e.stopPropagation()
    const newStorage = [...JSON.parse(localStorage.getItem(`sfl-${itemType}`))].filter((j, index) => index !== i)
    localStorage.setItem(`sfl-${itemType}`, JSON.stringify(newStorage))
    setFavorites(newStorage)
  }

  useEffect(() => {
    const favs = localStorage.getItem(`sfl-${itemType}`)
    console.log("favs", favs)
    if (favs) {
      setFavorites(JSON.parse(favs))
    } else {
      setFavorites([])
    }
  }, [itemType])

  useEffect(() => {
    const restrictions = [
      itemID.length === 8,
      itemID.split('')[0] === 'F',
      itemID.split('')[1] === 'F'
    ]
    restrictions.every(r => r)
      ? setItemIDError('')
      : setItemIDError('wrong ID')
  }, [itemID])

  useEffect(() => {
    const ucItemID = itemID.toUpperCase()
    const qualityText = ucItemID + '.amod ' + quality
    const mod1 = ucItemID + '.amod ' + option1
    const mod2 = ucItemID + '.amod ' + option2
    const mod3 = ucItemID + '.amod ' + option3
    const content = `${qualityText}${option1 !== '' ?  '\n' + mod1 : ''}${option2 !== '' ?  '\n' + mod2 : ''}${option3 !== '' ?  '\n' + mod3 : ''}`
    setTextAreaContent(content)
  }, [itemID, quality, option1, option2, option3])
  
  
  // Reset all on item type change
  useEffect(() => {
    setQuality(itemType === 'weapons' ? weapons.quality[3].id : armors.quality[3].id)
    setOption1('')
    setOption2('')
    setOption3('')
  }, [itemType])

  useEffect(() => {
    const itemsToLoad = itemType === 'weapons' ? weapons : armors
    const fullModifierslist = [...itemsToLoad.modifier1, ...itemsToLoad.modifier2, ...itemsToLoad.modifier3]
    setFullResetContent(fullModifierslist.map(mod => `${itemID}.rmod ${mod.id}`).join('\n'))
  }, [itemID, itemType])

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <header className="App-header" style={{ padding: '20px' }}>
          <Grid container spacing={2} style={{ width: '100%' }}>
            <Grid size={6} textAlign={'left'}>
              <Stack direction="row" spacing={2}>
                <ToggleButtonGroup
                  value={itemType}
                  exclusive
                  onChange={handleItemTypeChange}
                  aria-label="item type"
                >
                  <ToggleButton value="weapons" aria-label="weapons" style={{ width: '100px', textAlign: "center"}}>
                    ⚔️
                  </ToggleButton>
                  <ToggleButton value="armors" aria-label="armors" style={{ width: '100px', textAlign: "center"}}>
                    🛡️
                  </ToggleButton>
                </ToggleButtonGroup>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel error={itemIDError !== ''} htmlFor="item-id">Item ID</InputLabel>
                  <Input
                    error={itemIDError !== ''}
                    id="item-id"
                    startAdornment={<InputAdornment position="start">{`${itemType === 'weapons' ? 'WEAP' : 'ARMO'} '' (`}</InputAdornment>}
                    endAdornment={<InputAdornment position="end">{`)`}</InputAdornment>}
                    style={{
                      textTransform: 'uppercase',
                      maxWidth: '170px',
                      paddingLeft: "10px",
                    }}
                    onChange={e => {
                      if (e.target.value.length <= 8)  {
                        setItemID(e.target.value)
                      }
                    }}
                  />
                  {itemIDError !== '' && <FormHelperText error id="helper-item-id">
                    {itemIDError}
                  </FormHelperText>}
                </FormControl>
              </Stack>
            </Grid>
            <Grid size={6}></Grid>
            {itemType === 'weapons' ? <WeaponsComponent
                quality={quality}
                setQuality={setQuality}
                option1={option1}
                setOption1={setOption1}
                option2={option2}
                setOption2={setOption2}
                option3={option3}
                setOption3={setOption3}
              /> : <ArmorsComponent
              quality={quality}
              setQuality={setQuality}
              option1={option1}
              setOption1={setOption1}
              option2={option2}
              setOption2={setOption2}
              option3={option3}
              setOption3={setOption3}
            />}
            <Grid size={6}>
              <Commands
                display={itemIDError === ''}
                content={textAreaContent}
                resetContent={fullResetContent}
              />
            </Grid>
            <Grid size={6}>
              <button onClick={() => handleSaveFavorite()}>Save as favorite</button>
            </Grid>
            {console.log(favorites)}
            {favorites.length > 0 && <Grid size={12}>
              Favorites
              <div style={{display:'flex', gap:"10px"}}>
                {favorites.map((fav, i) => {
                  const data = itemType === 'weapons' ? weapons : armors
                  return <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      padding: '10px',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    key={`${itemType}-${i}`}
                    onClick={(e) => {
                      setQuality(fav.quality)
                      setOption1(fav.option1)
                      setOption2(fav.option2)
                      setOption3(fav.option3)
                    }}>
                    <div onClick={(e) => handleDeleteFavorite(e, i)} style={{ position: 'absolute', top:'5px', right:'5px'}}>x</div>
                    <div>{data.quality.find(d => d.id === fav.quality)?.name}</div>
                    <div>{data.modifier1.find(d => d.id === fav.option1)?.name}</div>
                    <div>{data.modifier2.find(d => d.id === fav.option2)?.name}</div>
                    <div>{data.modifier3.find(d => d.id === fav.option3)?.name}</div>
                  </div>
                })}
              </div>
            </Grid>}
          </Grid>
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;