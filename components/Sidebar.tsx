import Tooltip from "@mui/material/Tooltip";

import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Toolbar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreverticalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as EmailValidator from 'email-validator'

const StyledContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;


const StyledSearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`
const StyledSidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`


const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const Sidebar = () => {

  const [loggedInUser, loading, _error] = useAuthState(auth);

  const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] = useState(false)

  const [recipientEmail, setrecipientEmail] = useState('')

  const toggleNewConversationDialog = (isOpen: boolean) => {
    setIsOpenNewConversationDialog(isOpen)
    if(!isOpen) setrecipientEmail('')
  }

  const closeNewConversationDialog = () => {
    toggleNewConversationDialog(false)
  }

  const isInvitingSelf = recipientEmail === loggedInUser?.email

  const createConversation = () => {
    if(!recipientEmail) return

    // if(EmailValidator.validate())

    closeNewConversationDialog()
  }

  const logout = async()=> {
    try {
      await signOut(auth)
    } catch (error) {
      console.log('Error loging out', error)
    }
  }
  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title="USER EMAIL" placement="right">
          <StyledUserAvatar />
        </Tooltip>
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>               
            <MoreverticalIcon />
          </IconButton>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSearch>
        <SearchIcon/>
        <StyledSearchInput placeholder="Search in conversations"/>
      </StyledSearch>

      <StyledSidebarButton onClick={()=> {
        toggleNewConversationDialog(true)
      }}>
        Start a new a conversation
      </StyledSidebarButton>

      {/* List of conversations */}

      <Dialog open={isOpenNewConversationDialog} onClose={()=> {
        toggleNewConversationDialog(false)
      }}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lease enter a google email address for the user you wish to chat with
          </DialogContentText>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={
              e => {
                setrecipientEmail(e.target.value)
              }
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewConversationDialog}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default Sidebar;
