    import axios from "axios";
    import authHeader from "./auth.header"; // to get the token 

    // file upload service 
    const upload = (data) => {
        return axios.post(`/upload`, data, {
          headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
        });
      };

      // Retrieve files service 
      const getfiles = () => {
        return axios.get("/file", {
          headers: { ...authHeader() },
        });
      };

      const updateFile = (file) => {
        return axios.put(
          `/file/${file._id}`,
          { ...file },
          {
            headers: { ...authHeader() },
          }
        );
      };

      const delteFiles = (id) => {
        return axios.delete(`/file/${id}`, {
          headers: {...authHeader() },
        });
      };

      const UserService = {
        upload,
        getfiles,
        updateFile,
        delteFiles,
      };
      
      export default UserService;