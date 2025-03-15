import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import ChatContext from "../context/Chat/ChatContext";
import AuthContext from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const CreateGroup = () => {
  const { getAllChats,createGroupChat } = useContext(ChatContext);
  const { loggedInUserInformation } = useContext(AuthContext);
  const { allChatsOfUser } = useContext(ChatContext);
  const [inputGroupName, setInputGroupName] = useState("");
  const [selectedUserIdList, setSelectedUserIdList] = useState([]);
  const [selectedUserNameList, setSelectedUserNameList] = useState([]);
  const navigate = useNavigate();
  // ✅ Filter only direct one-on-one chats
  const friends = allChatsOfUser.filter((chat) => !chat.isGroupChat);
  const loggedInUserId = loggedInUserInformation?._id;
  const otherUsers = friends.filter(
    (chat) => chat.users.length === 2
  );

  const handleGetAllChats = async () => {
    const res = await getAllChats(sessionStorage.getItem("token"));
    console.log("res -> ", res);
  };

  const handleSelectChat = (e, userId, userName) => {
    // ✅ Avoid duplicate selections
    setSelectedUserIdList((prev) =>
      prev.includes(userId) ? prev : [...prev, userId]
    );

    setSelectedUserNameList((prev) =>
      prev.includes(userName) ? prev : [...prev, userName]
    );
  };

  console.log("Selected User Names -> ", selectedUserNameList);
  console.log("Selected User IDs -> ", selectedUserIdList);
  const handleCreateGroup=async(e)=>{
    e.preventDefault()
  const res= await createGroupChat(inputGroupName,selectedUserIdList);
  if(res){
    navigate('/')
  }
  }
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Create Group
                    </p>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Group Name"
                            name="g-name"
                            onChange={(e) => setInputGroupName(e.target.value)}
                            value={inputGroupName}
                            required
                          />
                          <button
                            onClick={handleGetAllChats}
                            className="btn btn-primary my-3"
                            style={{ width: "100%" }}
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasWithBothOptions"
                            aria-controls="offcanvasWithBothOptions"
                          >
                            Choose User
                          </button>
                        </div>
                      </div>

                      {/* ✅ Fixed Dropdown List */}
                      {selectedUserNameList.length > 0 &&

                          <div className="btn-group d-flex justify-content-center my-3">
                        <button
                          type="button"
                          className="btn btn-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Selected Users ({selectedUserNameList.length})
                        </button>
                        <ul className="dropdown-menu">
                          {selectedUserNameList.map((selectedUserName, index) => (
                              <li key={index}>
                              <a className="dropdown-item">{selectedUserName}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                        }

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button onClick={handleCreateGroup} type="submit" className="btn btn-primary btn-lg">
                          Create
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ User Selection Offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Select Users
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {otherUsers?.map((chat) => {
            const user =
              chat.users[0]._id !== loggedInUserId ? chat.users[0] : chat.users[1];

            return (
              <div
                key={user._id}
                onClick={(e) => handleSelectChat(e, user._id, user.name)}
                className="my-3 p-2"
                style={{
                  backgroundColor: selectedUserIdList.includes(user._id)
                    ? "#cfe2ff"
                    : "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease-in-out",
                }}
              >
                <img
                  src="/user.png"
                  alt="User"
                  style={{ borderRadius: "50%", width: "40px" }}
                />
                <p style={{ margin: 0, fontWeight: "bold" }}>{user.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CreateGroup;
