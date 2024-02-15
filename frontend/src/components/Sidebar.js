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
    BookOpenIcon,
    ShoppingCartIcon,
    HomeIcon,
} from "@heroicons/react/24/solid";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";


export default function SidebarWithBurgerMenu(props) {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    useEffect(() => {
        const removeBugFromUsingDrawerComponent = async () => {
            if (isDrawerOpen) {
                const bgElement = document.querySelectorAll("div.bg-opacity-60")[0];
                if (bgElement) {
                    bgElement.classList.remove("bg-opacity-60");
                    bgElement.classList.remove("bg-black");
                }
            }
        };

        removeBugFromUsingDrawerComponent();
    }, [isDrawerOpen]);

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

    return (
        <>
            <IconButton variant="text" size="lg" onClick={openDrawer}>
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8 stroke-2" />
                ) : (
                    <Bars3Icon className="h-8 w-8 stroke-2" />
                )}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                <Card
                    color="transparent"
                    shadow={false}
                    className="h-[calc(100vh-2rem)] w-full p-4"
                >
                    <div className="mb-2 flex items-center gap-4 p-4">
                        <img
                            src="https://media.discordapp.net/attachments/705005230944813076/1207665128879824917/HighLearnHub.png?ex=65e078cc&is=65ce03cc&hm=a49d1fee0719ab7706f2d7acad9c954db6f9d7d0699f6afb97fe6b31c0b508ed&=&format=webp&quality=lossless&width=625&height=625"
                            alt="brand"
                            className="h-10 w-10"
                        />
                        <Typography variant="h5" color="blue-gray">
                            HighLearnHub
                        </Typography>
                    </div>
                    <List>
                        <a href="/home" className="text-initial">
                            <hr className="my-2 border-blue-gray-50" />
                            <ListItem>
                                <ListItemPrefix>
                                    <HomeIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                หน้าแรก
                                <ListItemSuffix>
                                    <Chip
                                        value=""
                                        size="sm"
                                        variant="ghost"
                                        color="blue-gray"
                                        className="rounded-full"
                                    />
                                </ListItemSuffix>
                            </ListItem>
                        </a>
                        <a href="/mycourse" className="text-initial">
                            <ListItem>
                                <ListItemPrefix>
                                    <BookOpenIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                คอร์สของฉัน
                            </ListItem>
                        </a>
                        <a href="/payment" className="text-initial">
                            <ListItem>
                                <ListItemPrefix>
                                    <ShoppingCartIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                ตะกร้าของฉัน
                                <ListItemSuffix>
                                    <Chip
                                        value=""
                                        size="sm"
                                        variant="ghost"
                                        color="blue-gray"
                                        className="rounded-full"
                                    />
                                </ListItemSuffix>
                            </ListItem>
                        </a>
                    </List>
                    <div className="absolute inset-x-0 bottom-0 h-16">
                        <hr className="my-2 border-blue-gray-50" />
                        <div className="mb-2 flex items-center gap-4 p-2">
                            <a href="/proflie" className="text-initial">
                                <ListItem>
                                    <ListItemPrefix>
                                        <UserCircleIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    โปรไฟล์
                                </ListItem>
                            </a>
                        </div>
                    </div>
                </Card>
            </Drawer>
        </>

    );
}