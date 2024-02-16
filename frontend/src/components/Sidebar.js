import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export default function SidebarWithBurgerMenu() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (left, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [left]: open });
    };

    return (
        <div>
            <React.Fragment>
                <Button onClick={toggleDrawer('left', true)}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
                    </svg></Button>
                <Drawer
                    anchor="left"
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer("left", false)}
                        onKeyDown={toggleDrawer("left", false)}
                    >
                        <div className="mb-2 flex items-center gap-4 p-4">
                            <img
                                src="https://media.discordapp.net/attachments/705005230944813076/1207665128879824917/HighLearnHub.png?ex=65e078cc&is=65ce03cc&hm=a49d1fee0719ab7706f2d7acad9c954db6f9d7d0699f6afb97fe6b31c0b508ed&=&format=webp&quality=lossless&width=625&height=625"
                                alt="brand"
                                className="h-10 w-10"
                            />
                            <p variant="h5" color="blue-gray">
                                HighLearnHub
                            </p>

                        </div>
                        <hr className="my-2 border-blue-gray-50" />
                        <a href='/home'>
                            <List>
                                <ListItem disablePadding href=''>
                                    <ListItemButton>
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z" clip-rule="evenodd" />
                                        </svg>
                                        <p className='ml-2'>หน้าแรก</p>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </a>
                        <a href='/mycourse'>
                            <List>
                                <ListItem disablePadding href=''>
                                    <ListItemButton>
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clip-rule="evenodd" />
                                        </svg>
                                        <p className='ml-2'>คอร์สของฉัน</p>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </a>
                        <a href='/payment'>
                            <List>
                                <ListItem disablePadding href=''>
                                    <ListItemButton>
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M4 4c0-.6.4-1 1-1h1.5c.5 0 .9.3 1 .8L7.9 6H19a1 1 0 0 1 1 1.2l-1.3 6a1 1 0 0 1-1 .8h-8l.2 1H17a3 3 0 1 1-2.8 2h-2.4a3 3 0 1 1-4-1.8L5.7 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                        </svg>

                                        <p className='ml-2'>ตะกร้าของฉัน</p>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </a>
                        <div className="absolute inset-x-0 bottom-0 h-16">
                            <hr className="border-blue-gray-50" />
                            <div className="flex items-center gap-4">
                                <a href="/proflie" className="text-initial">
                                    <List>
                                        <ListItem disablePadding href=''>
                                            <ListItemButton>
                                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
                                                </svg>
                                                <p className='ml-2'>โปรไฟล์</p>
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </a>
                            </div>
                        </div>
                    </Box>
                </Drawer>
            </React.Fragment>
        </div>
    );
}
