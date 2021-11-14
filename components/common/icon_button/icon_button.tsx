import react from "react";
import styles from "icon_button_styles.module.scss";

const IconButton: React.FC = (props) => {
  function render(): JSX.Element {
    return (
      <div className={styles.icon_button}>
        <img className={styles.icon} src={""} />
      </div>
    );
  }

  return render();
}


export default IconButton;