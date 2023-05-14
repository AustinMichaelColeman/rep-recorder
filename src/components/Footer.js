import styles from "@/components/Footer.module.css";
export default function Footer() {
  return (
    <p>
      Check out the code on{" "}
      <a
        className={styles.footerLink}
        href="https://github.com/AustinMichaelColeman/rep-recorder"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </p>
  );
}
