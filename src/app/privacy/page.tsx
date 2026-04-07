import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Inverlock Advisory",
  description:
    "Inverlock Advisory privacy policy — how we collect, use, and protect your personal data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-navy-dark py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <h1 className="text-white text-4xl md:text-5xl font-normal">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="max-w-3xl space-y-8 text-text-body text-base font-light leading-relaxed">
            <p className="text-sm text-text-body/70">
              Last updated: April 2026
            </p>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                1. Introduction
              </h2>
              <p>
                Inverlock (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
                &ldquo;us&rdquo;) is committed to protecting the privacy of
                individuals who visit our website at inverlockadvisory.com. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your personal data in accordance with the UK General
                Data Protection Regulation (UK GDPR) and the Data Protection Act
                2018.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                2. Data Controller
              </h2>
              <p>
                The data controller responsible for your personal data is
                Inverlock. If you have any questions about this Privacy Policy or
                our data practices, please contact us at{" "}
                <a
                  href="mailto:jhenry@inverlockadvisory.com"
                  className="text-accent-blue underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200"
                >
                  jhenry@inverlockadvisory.com
                </a>
                .
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                3. Information We Collect
              </h2>
              <p>
                We may collect the following categories of personal data when you
                interact with our website:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="font-normal text-text-dark">
                    Contact information:
                  </strong>{" "}
                  name and email address when you contact us via email.
                </li>
                <li>
                  <strong className="font-normal text-text-dark">
                    Technical data:
                  </strong>{" "}
                  IP address, browser type and version, device information, and
                  pages visited, collected automatically through server logs.
                </li>
                <li>
                  <strong className="font-normal text-text-dark">
                    Usage data:
                  </strong>{" "}
                  information about how you use our website, including your
                  disclaimer acceptance preference stored locally on your device.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                4. How We Use Your Information
              </h2>
              <p>We use your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your enquiries and provide our advisory services.</li>
                <li>To operate and maintain our website.</li>
                <li>To comply with legal and regulatory obligations.</li>
                <li>
                  To protect our legitimate business interests, including fraud
                  prevention and security.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                5. Legal Basis for Processing
              </h2>
              <p>
                We process your personal data on the following legal bases under
                UK GDPR:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="font-normal text-text-dark">
                    Legitimate interests:
                  </strong>{" "}
                  operating our website and responding to enquiries.
                </li>
                <li>
                  <strong className="font-normal text-text-dark">
                    Consent:
                  </strong>{" "}
                  where you have provided explicit consent for specific
                  processing activities.
                </li>
                <li>
                  <strong className="font-normal text-text-dark">
                    Legal obligation:
                  </strong>{" "}
                  where processing is necessary to comply with applicable laws
                  and regulations.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                6. Data Sharing and Transfers
              </h2>
              <p>
                We do not sell your personal data. We may share your data with
                trusted service providers who assist in operating our website and
                conducting our business, subject to appropriate data processing
                agreements. Any international transfers of data will be subject
                to appropriate safeguards as required by UK GDPR.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                7. Data Retention
              </h2>
              <p>
                We retain personal data only for as long as necessary to fulfil
                the purposes for which it was collected, or as required by
                applicable laws and regulations. Contact enquiry data is
                retained for a maximum of two years unless a longer retention
                period is required by law.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                8. Your Rights
              </h2>
              <p>
                Under UK GDPR, you have the right to access, rectify, erase, or
                restrict the processing of your personal data, as well as the
                right to data portability and the right to object to processing.
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:jhenry@inverlockadvisory.com"
                  className="text-accent-blue underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200"
                >
                  jhenry@inverlockadvisory.com
                </a>
                .
              </p>
              <p>
                You also have the right to lodge a complaint with the
                Information Commissioner&apos;s Office (ICO) if you believe your
                data has been processed unlawfully.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date. We
                encourage you to review this page periodically.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
