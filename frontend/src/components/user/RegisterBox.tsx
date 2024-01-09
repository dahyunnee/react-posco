import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import {
  signupAction,
} from "../../redux/modules/user";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
const RegisterBox = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [uid, setUid] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [nickName, setNickName] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [rePw, setRePw] = useState<string>("");

    const [pwCheck, setPwCheck] = useState<boolean>(false);
    const [rePwCheck, setRePwCheck] = useState<boolean>(false);

    const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value);
        const regex =
          /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if (regex.test(e.target.value)) {
          setPwCheck(true);
        } else {
          setPwCheck(false);
        }
      };
      const onChangeRePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRePw(e.target.value);
        if (pw === rePw) {
          setPwCheck(true);
        }
      };

      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (pwCheck && rePwCheck && nickName) {
          dispatch(
            signupAction({
              id: uid,
              password: pw,
              email: email,
              nickName: nickName,
              name: name,
            })
          ).then(() => {
            navigate("/login");
          });
        }
      };
      
      useEffect(() => {
        if (pw === rePw) {
          setRePwCheck(true);
        } else {
          setRePwCheck(false);
        }
      }, [pw, rePw]);

      return (
        <div>
            <Box
        component="form"
        sx={boxStyle}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
        // sx={{ backgroundImage: "assets/img/login_background.jpg" }}
      ></Box>
        </div>
        );
};
export default RegisterBox;
const boxStyle = {
    "& .MuiFormControl-root": {
      m: 1,
      width: "25ch",
      display: "flex",
      justifyContent: "center",
      // marginTop: "15px",
    },
  };