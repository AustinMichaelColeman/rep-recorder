"use client";

import HeaderBar from "@/components/HeaderBar";

export default function Page() {
  return (
    <div className="max-w-3x1 mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <HeaderBar />
      <h1 className="mt-8 text-3xl font-semibold text-gray-900 dark:text-gray-100">
        Terms and Conditions
      </h1>

      <h2 className="mt-8 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome to Rep Recorder!
      </h2>
      <p className="mt-6 text-gray-800 dark:text-gray-200">
        {`These terms and conditions outline the rules and regulations for the use
        of Austin Coleman's Website, located at`}{" "}
        <a
          className="text-green-700 dark:text-green-400 underline"
          href="https://www.reprecorder.dev/"
        >
          https://www.reprecorder.dev/
        </a>
        .
      </p>
      <p className="mt-6 text-gray-800 dark:text-gray-200">
        By accessing this website, we assume you accept these terms and
        conditions. Do not continue to use Rep Recorder if you do not agree to
        take all of the terms and conditions stated on this page.
      </p>

      <h2 className="mt-8 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Cookies:
      </h2>
      <p className="mt-6 text-gray-800 dark:text-gray-200">
        The website uses cookies to help personalize your online experience. By
        accessing Rep Recorder, you agreed to use the required cookies.
      </p>
      <p className="mt-6 text-gray-800 dark:text-gray-200">
        A cookie is a text file that is placed on your hard disk by a web page
        server. Cookies cannot be used to run programs or deliver viruses to
        your computer. Cookies are uniquely assigned to you and can only be read
        by a web server in the domain that issued the cookie to you.
      </p>
      <p className="mt-6 text-gray-800 dark:text-gray-200">
        We may use cookies to collect, store, and track information for
        statistical or marketing purposes to operate our website. You have the
        ability to accept or decline optional Cookies. There are some required
        Cookies that are necessary for the operation of our website. These
        cookies do not require your consent as they always work. Please keep in
        mind that by accepting required Cookies, you also accept third-party
        Cookies, which might be used via third-party provided services if you
        use such services on our website, for example, a video display window
        provided by third parties and integrated into our website.
      </p>

      <p className="mt-6 text-gray-800 dark:text-gray-200">
        Parts of this website offer users an opportunity to track workouts.
        Workout data should only be modifiable and visible to the user that
        generated it.
      </p>

      <p className="mt-6 text-gray-800 dark:text-gray-200">
        Austin Coleman reserves the right to monitor workout data and remove
        data that causes breach of these Terms and Conditions.
      </p>

      <p className="mt-6 text-gray-800 dark:text-gray-200">
        You warrant and represent that:
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-800 dark:text-gray-200">
        <li>
          You are entitled to post your own workout data on our website and have
          all necessary licenses and consents to do so;
        </li>
      </ul>
      <p className="mt-6 text-gray-800 dark:text-gray-200">
        You hereby grant Austin Coleman a non-exclusive license to use,
        reproduce, and edit any of your workout data submitted to Rep Recorder.
        The workout data is intended to only be visible and modifiable to the
        user who creates it and Austin Coleman for development purposes. Austin
        Coleman may remove, delete, or modify any accounts or workout data as
        needed for the purposes of developing the website or managing spam or
        abuse of the site.
      </p>

      <h2 className="mt-8 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Disclaimer:
      </h2>
      <p className="mt-6 text-gray-800 dark:text-gray-200">
        To the maximum extent permitted by applicable law, we exclude all
        representations, warranties, and conditions relating to our website and
        the use of this website. Nothing in this disclaimer will:
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-800 dark:text-gray-200">
        <li>
          limit or exclude our or your liability for death or personal injury;
        </li>
        <li>
          limit or exclude our or your liability for fraud or fraudulent
          misrepresentation;
        </li>
        <li>
          limit any of our or your liabilities in any way that is not permitted
          under applicable law; or
        </li>
        <li>
          exclude any of our or your liabilities that may not be excluded under
          applicable law.
        </li>
      </ul>
      <p className="mt-6 text-gray-800 dark:text-gray-200">
        The limitations and prohibitions of liability set in this Section and
        elsewhere in this disclaimer: (a) are subject to the preceding
        paragraph; and (b) govern all liabilities arising under the disclaimer,
        including liabilities arising in contract, in tort, and for breach of
        statutory duty.
      </p>

      <p className="mt-6 text-gray-800 dark:text-gray-200">
        The website and the information and services on this website are
        provided free of charge, and we will not be liable for any loss or
        damage of any nature.
      </p>

      <h2 className="mt-8 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Contact:
      </h2>
      <p className="mt-6 text-gray-800 dark:text-gray-200">
        If you have any questions about these terms or would like to request
        your data be deleted please contact Austin Coleman using the information
        available at{" "}
        <a
          className="text-green-700 dark:text-green-400 underline"
          href="https://www.austincoleman.dev/"
        >
          https://www.austincoleman.dev/
        </a>
        .
      </p>
    </div>
  );
}
