import styles from "./Notification.module.css";

const Notification = ({ message }: { message: string }) => {
  return <div className={styles.notification}>{message}</div>;
};

export default Notification;
