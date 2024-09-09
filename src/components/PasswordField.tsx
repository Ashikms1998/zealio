import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FC, SetStateAction, useState } from "react";
import styles from "../styles/login.module.css";

interface Props {
  password: string;
  setPassword: (value: SetStateAction<string>) => void;
}

export const PasswordField: FC<Props> = ({
  password,
  setPassword,
}): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className={styles.password_field_container}>
      <input
        value={password}
        type={visible ? "text" : "password"}
        className={styles.input_area}
        onChange={(e) => setPassword(e.target.value)}
      />

      <span className={styles.eye_icon} onClick={() => setVisible(!visible)}>
        <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
      </span>
    </div>
  );
};