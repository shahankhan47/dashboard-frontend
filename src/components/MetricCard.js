import styles from "../theme/dashboard.module.css";

const MetricCard = ({ title, value }) => {

  return (
    <div className={styles.card}>
      <div className={styles.metricHeader}>{title}</div>
      <div className={styles.metricValueRow}>
        <div className={styles.metricValue}>{value}</div>
      </div>
    </div>
  );
};

export default MetricCard;