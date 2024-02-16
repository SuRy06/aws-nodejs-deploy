const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { sq } = require("../db");

const User = sq.define(
  "user_two",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: "This email is already taken.",
      },
      validate: {
        isEmail: {
          msg: "Valid email is required.",
        },
      },
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: "This number already exsists.",
      },
      validate: {
        notEmpty: {
          msg: "Phone number is required.",
        },
      },
    },
    photo: {
      type: DataTypes.STRING,
    },
    cover_photos: {
      type: DataTypes.STRING,
    },
    skills: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required!",
        },
      },
    },
    passwordConfirm: {
      type: DataTypes.VIRTUAL,
      validate: {
        isSameAsPassword(val) {
          if (val !== this.password)
            throw new Error("Password and Confirm Password should be same!");
        },
      },
    },
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 12);
      },
    },
  }
);

module.exports = User;
