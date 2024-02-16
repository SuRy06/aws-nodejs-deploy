const User = require("../models/User");

const fileUploader = async (file) => {
  const updateObj = {
    photo: "",
    cover_photos: "",
  };

  for (const [key, val] of Object.entries(file)) {
    if (key === "photo") {
      updateObj.photo = val[0].path;
    } else {
      const valArr = [];

      for (const objVal of val) {
        valArr.push(objVal.path);
      }

      const valString = valArr.join(", ");
      updateObj.cover_photos = valString;
    }
  }

  return updateObj;
};

exports.signUpCon = async (req, res) => {
  try {
    const createdId = await User.create(req.body);

    if (createdId.dataValues.id && req.files) {
      const id = createdId.dataValues.id;

      const updatingObj = await fileUploader(req.files);

      await User.update(updatingObj, {
        where: { id },
      });
    }

    return res.send({
      status: 200,
      Message: `User of Id ${createdId.dataValues.id} created successfully!`,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};
