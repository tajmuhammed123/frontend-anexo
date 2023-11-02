import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { managerDetail } from "../../../actions/ManagerActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosManagerInstance } from "../../../Constants/axios";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./EventData.css";
import { GenerateSuccess } from "../../../Validation/EventUpdation";

function EventData() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [eventdata, setEventData] = useState({
    team_name: "",
    salutation: "",
    about: "",
    location: "",
    dishes: "",
    profileImage: [],
    events: [],
    advance_amount: 0,
  });


  const [data, setEventdata] = useState([]);
  const userInfoString = localStorage.getItem("managerInfo");

  const userInfo = JSON.parse(userInfoString);

  const [img, setImg] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const { isLoading } = useQuery({
    queryKey: ["eventdata"],
    queryFn: async () => {
      try {
        await axiosManagerInstance
          .get(`/geteventdata/${userInfo.user._id}`)
          .then((res) => {
            setEventdata(res.data.eventData),
              setManagerData(res.data.managerData.eventData);
          });
      } catch (err) {
        console.error(err.message);
        // Handle error here
      }
    },
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(events);
    console.log(img);
  }, []);

  useEffect(() => {
    console.log(eventdata); 
  }, [eventdata]);

  const handleEvents = (eventName) => {
    if (!events.includes(eventName)) {
      events.push(eventName);
      setEventData((eventdata) => ({ ...eventdata, events }));
    } else {
      const indexToRemove = events.indexOf(eventName);
      if (indexToRemove !== -1) {
        events.splice(indexToRemove, 1);
      }
      setEventData({ ...eventdata, events: events });
    }
  };

  const formData = new FormData();
  const handleImages = async (e) => {
    try {
      const selectedFiles = e.currentTarget.files;
      img.push(...selectedFiles);
      setEventData({ ...eventdata, [e.target.name]: img });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImg = [...img];
    updatedImg.splice(index, 1);
    setImg(() => [...updatedImg]);
    setEventData({ ...eventdata, profileImage: img });
  };
  useEffect(() => {
    console.log(img);
  }, [img]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEventData({ ...eventdata, events: events });

    const response = await dispatch(managerDetail(eventdata, formData));
    if (response.status) {
      localStorage.setItem("managerToken", response.token);
        GenerateSuccess("Updated Data Successfully");
        setTimeout(() => {
          navigate("/manager/");
        }, 2000);
    } else {
      navigate("/manager/eventdata");
    }
  };

  return (
    <div className="w-400 md:w-200">
      <div className="flex justify-center items-center my-9">
        <Card
          color="transparent"
          className="m-0 grid place-items-center shadow-lg rounded-b-none py-8 px-4 text-center sm:w-100"
          floated={false}
          shadow={false}
          style={{ border: "1px solid grey-50" }}
        >
          <Typography variant="h4" color="blue-gray">
            Handle event
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form
            className="mt-8 mb-2 lg:w-200 max-w-screen-lg sm:w-200"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="mb-4 flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row gap-2 justify-center">
                <div className="flex flex-col lg:flex-row gap-2">
                  <Input
                    size="lg"
                    label="Name"
                    name="team_name"
                    value={managerData.team_name}
                    onChange={(e) =>
                      setEventData({
                        ...eventdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <Input
                    size="lg"
                    label="Salutation"
                    name="salutation"
                    value={managerData.salutation}
                    onChange={(e) =>
                      setEventData({
                        ...eventdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <Input
                  size="lg"
                  type="number"
                  label="Advance Amount"
                  value={managerData.advance_amount}
                  name="advance_amount"
                  onChange={(e) =>
                    setEventData({
                      ...eventdata,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <Textarea
                size="lg"
                label="About"
                name="about"
                value={managerData.about}
                onChange={(e) =>
                  setEventData({
                    ...eventdata,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <div className="flex flex-wrap w-20">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Add cover image
                </label>
                <input
                  name="cover_image"
                  onChange={(e) =>
                    setEventData(
                      { ...eventdata, [e.target.name]: e.target.files[0] },
                    )
                  }
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                ></input>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Add Multiple images
                </label>
                <input
                  type="file"
                  multiple
                  name="profileImage"
                  onChange={handleImages}
                />
                <div className="flex flex-row">
                  {img.map((file, index) => (
                    <div className="img-container" key={index}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Image ${index + 1}`}
                      />
                      {/* Delete icon using Font Awesome */}
                      <button
                        className="cross-icon flex items-center justify-center"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                {data.map((item, index) => (
                  <Checkbox
                    key={index}
                    name={item.event_name}
                    onChange={(e) => handleEvents(e.target.name)}
                    checked={managerData.events.includes(item.event_name)}
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center mr-5 font-normal"
                      >
                        {item.event_name}
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                  />
                ))}
              </div>
              <div className="flex flex-col lg:flex-row gap-2 justify-center">
                <Input
                  size="lg"
                  label="Available Dishes"
                  name="dishes"
                  value={managerData.dishes}
                  onChange={(e) =>
                    setEventData({
                      ...eventdata,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <Input
                  size="lg"
                  label="Available Locations"
                  name="location"
                  value={managerData.location}
                  onChange={(e) =>
                    setEventData({
                      ...eventdata,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <Button className="mt-6" fullWidth type="submit">
              Add/ Update Data
            </Button>
          </form>
        </Card>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EventData;
