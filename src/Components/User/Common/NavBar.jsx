

import React from 'react';
import {
  Navbar,
  Typography,
  Button,
  MenuHandler,
  Menu,
  Avatar,
  MenuList,
  MenuItem,
  Collapse,
  Drawer,
  IconButton
} from '@material-tailwind/react';

import { useNavigate } from 'react-router-dom';

import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux';
import { LogoutDetails } from '../../../actions/UserActions';
import Sidebar from './SideBar.jsx'

 
// profile menu component

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogOut = async () => {
    dispatch(
      LogoutDetails()
    );
    navigate("/");
    setIsMenuOpen(false)

  };

  const userInfoString = localStorage.getItem("userInfo");

  const userInfo = JSON.parse(userInfoString)
  const profileMenuItems = [
    {
      label: `${userInfo.user.name}`,
      icon: UserCircleIcon,
      onclick: ()=>{navigate('/profile')}
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      onclick: ()=>{handleLogOut()}
    },
  ];
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
        {userInfo.user.profile_img?<Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
            src={userInfo.user.profile_img}
          />:<Avatar
          variant="circular"
          size="sm"
          alt="tania andrew"
          className="border border-gray-900 p-0.5"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, onclick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={onclick}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}


export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate=useNavigate()

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <a href="#" className="flex items-center">
        Pages
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <a href="#" className="flex items-center">
        Account
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <a href="#" className="flex items-center">
        Blocks
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <a href="#" className="flex items-center">
        Docs
      </a>
    </Typography>
    </ul>
  );

  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div>
      <Drawer open={open} onClose={closeDrawer}>
      <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Side Menu
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
          <Sidebar closeSidebar={closeDrawer}/>
        </Drawer>
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:pr-8 lg:pl-6 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className='flex align-middle justify-between'>
        <svg onClick={openDrawer} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-9 w-9 lg:h-12  lg:pr-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <img src="/Logo/AX BLACK.png" alt="Extrano" className='w-10' style={{width:'60px'}} />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {localStorage.getItem("userInfo") ? <ProfileMenu/> : 
          <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
          onClick={()=>navigate('/login')}
        >
          <span>Login</span>
        </Button>}
          
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <span>LogIn</span>
        </Button>
      </Collapse>
    </Navbar>

      </div>
      
  );
}
