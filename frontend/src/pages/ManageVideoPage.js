import React from "react";
import Navbar from "../components/Navbar";
import { Table } from "flowbite-react";
import ReactPlayer from "react-player";

const ManageVideoPage = () => {

  const [videos, setVideos] = React.useState([
    {
      id: 1,
      title: "Video 1",
      description: "Description of Video 1",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Video 2",
      description: "Description of Video 2",
      url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
    },

  ]);

  return (
    <div className="background-image">
      <Navbar />
      <div className="h-screen">
        <div className="container mx-auto pt-32 mb-8">
          <Table hover striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Video</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td>{video.title}</td>
                  <td>{video.description}</td>
                  <td>
                    <ReactPlayer
                      url={video.url}
                      width="100%"
                      height="auto"
                      controls
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageVideoPage;
