import React, { useEffect } from "react";
import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Drawer,
    Card,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function SidebarWithBurgerMenu(props) {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const openDrawer = () => {
        setIsDrawerOpen(true);
        props.setShowingSearchingBar(false);
    }
    const closeDrawer = () => {
        setIsDrawerOpen(false)
        setTimeout(() => {
            props.setShowingSearchingBar(true);
        }, 250);
    };

    useEffect(() => {
        const removeBugFromUsingDrawerComponent = async () => {
            if (isDrawerOpen) {
                const bgElement = document.querySelectorAll("div.bg-opacity-60")[0];
                if (bgElement) {
                    console.log(bgElement.class);
                    bgElement.classList.remove("bg-opacity-60");
                    bgElement.classList.remove("bg-black");
                }
            }
        };

        removeBugFromUsingDrawerComponent();
    }, [isDrawerOpen]);

    return (
        <>
            <IconButton variant="text" size="lg" onClick={openDrawer}>
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8 stroke-2" />
                ) : (
                    <Bars3Icon className="h-8 w-8 stroke-2" />
                )}
            </IconButton>
            <Drawer className="" open={isDrawerOpen} onClose={closeDrawer}>
                <Card
                    color="transparent"
                    shadow={false}
                    className="w-full p-4"
                >
                    <div className="mb-2 flex items-center gap-4 p-4">
                        {/* <img
                            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
                            alt="brand"
                            className="h-8 w-8"
                        /> */}
                        <Typography variant="h5" color="blue-gray">
                            Sidebar
                        </Typography>
                    </div>
                    <List>
                        <hr className="my-2 border-blue-gray-50" />
                        <ListItem>
                            <ListItemPrefix>
                                <InboxIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Inbox
                            <ListItemSuffix>
                                <Chip
                                    value="14"
                                    size="sm"
                                    variant="ghost"
                                    color="blue-gray"
                                    className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Settings
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </Card>
            </Drawer>
        </>
    );
}