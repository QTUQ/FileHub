import React from "react";
import UpdateForm from "./updateForm";

const Card = ({ file, fetchFiles }) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  return (
    <>
      <UpdateForm
        open={openUpdate}
        setOpen={setOpenUpdate}
        file={file}
        fetchFiles={fetchFiles}
      />
      <div className="max-w-sm rounded overflow-hidden shadow-lg border-2">
        <iframe
          style={{ height: "20rem" }}
          className="w-full"
          src={file.filePath}
          title={file.name}
        ></iframe>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{file.name}</div>
          <p className="text-gray-700 text-base">{file.description}</p>
        </div>
        <div class="inline-flex px-6 pb-3">
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
            onClick={() => {
              setOpenUpdate(true);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;