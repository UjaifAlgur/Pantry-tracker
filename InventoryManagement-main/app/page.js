'use client'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField,Paper,Divider } from '@mui/material'
import DeleteIcon from '@mui/material';
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  
  // We'll add our component logic here
    const [inventory, setInventory] = useState([])
    const [open, setOpen] = useState(false)
    const [itemName, setItemName] = useState('')
    const updateInventory = async () => {
        const snapshot = query(collection(firestore, 'inventory'))
        const docs = await getDocs(snapshot)
        const inventoryList = []
        docs.forEach((doc) => {
          inventoryList.push({ name: doc.id, ...doc.data() })
        })
        setInventory(inventoryList)
      }
      
      useEffect(() => {
        updateInventory()
      }, [])
    
      const addItem = async (item) => {
        const docRef = doc(collection(firestore, 'inventory'), item)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const { quantity } = docSnap.data()
          await setDoc(docRef, { quantity: quantity + 1 })
        } else {
          await setDoc(docRef, { quantity: 1 })
        }
        await updateInventory()
      }
      
      const removeItem = async (item) => {
        const docRef = doc(collection(firestore, 'inventory'), item)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const { quantity } = docSnap.data()
          if (quantity === 1) {
            await deleteDoc(docRef)
          } else {
            await setDoc(docRef, { quantity: quantity - 1 })
          }
        }
        await updateInventory()
      }
      
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
       
        <Box
          width="100vw"
          height="100vh"
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={2}
          bgcolor={'white'}
        >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Item
              </Typography>
              <Stack width="100%" direction={'row'} spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Item"
                  variant="outlined"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                <Button
                  variant="contained" color="primary"
                  onClick={() => {
                    addItem(itemName)
                    setItemName('')
                    handleClose()
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Box>
          </Modal>
        <Paper elevation={4}>
          <Button variant="contained" onClick={handleOpen}>
            Add New Item
          </Button>
        </Paper>
          <Box border={'2px solid #333'}>
            <Box
              width="800px"
              height="100px"
              bgcolor={'#ADD8E6'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              border={'4px solid black'}
            >
              <Typography variant={'h5'} color={'#333'} textAlign={'center'} fontWeight={100}>
                Inventory Items
              </Typography>
            </Box>
            <Stack width="800px" height="300px" spacing={2} overflow={'auto'} >
              {inventory.map(({name, quantity}) => (
                <Box
                  key={name}
                  width="100%"
                  minHeight="50px"
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  bgcolor={'#f0f0f0'}
                  paddingX={2}
                  
                >
                  <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
                    Quantity: {quantity}
                  </Typography>
                <stack 
                 direction="row" 
                 spacing={2}
                 divider={<Divider orientation="vertical" flexItem/>}
                 >
                   <Button variant="outlined" color="success" onClick={() => addItem(name)} spacing={2}>
                     Add
                   </Button>
                   <Button variant="outlined" color="error" onClick={() => removeItem(name)}>
                     Remove
                   </Button>
                </stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      
      )
}
