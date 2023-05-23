export default function Credits() {
  return (
    <p className="text-2xl font-medium text-light-heading dark:text-dark-heading  text-center">
      Check out the code on{" "}
      <a
        title="GitHub code repository for Rep Recorder"
        href="https://github.com/AustinMichaelColeman/rep-recorder"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-700 dark:text-green-400 underline hover:no-underline"
      >
        GitHub
      </a>
      . Created by{" "}
      <a
        title="Austin Coleman's Resume"
        href="https://www.austincoleman.dev/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-700 dark:text-green-400 underline hover:no-underline"
      >
        AustinColeman.dev
      </a>
    </p>
  );
}
