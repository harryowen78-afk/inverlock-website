import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Inverlock Advisory",
  description:
    "Inverlock Advisory cookie policy — how we use cookies and similar technologies on our website.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <section className="bg-navy-dark py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <h1 className="text-white text-4xl md:text-5xl font-normal">
            Cookie Policy
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
                This Cookie Policy explains how Inverlock
                (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
                uses cookies and similar technologies on our website at
                inverlockadvisory.com. This policy should be read alongside our{" "}
                <a
                  href="/privacy"
                  className="text-accent-blue underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                2. What Are Cookies
              </h2>
              <p>
                Cookies are small text files that are stored on your device when
                you visit a website. They are widely used to make websites work
                efficiently and to provide information to website owners.
                &ldquo;Local storage&rdquo; is a similar browser technology that
                allows websites to store data locally on your device.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                3. How We Use Cookies and Local Storage
              </h2>
              <p>
                Our website currently uses minimal client-side storage. We use
                browser local storage for the following purpose only:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-light-grey">
                      <th className="text-left py-3 pr-4 font-normal text-text-dark">
                        Name
                      </th>
                      <th className="text-left py-3 pr-4 font-normal text-text-dark">
                        Purpose
                      </th>
                      <th className="text-left py-3 pr-4 font-normal text-text-dark">
                        Type
                      </th>
                      <th className="text-left py-3 font-normal text-text-dark">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-light-grey">
                      <td className="py-3 pr-4 font-mono text-xs">
                        inverlock_disclaimer_accepted
                      </td>
                      <td className="py-3 pr-4">
                        Remembers that you have accepted the professional
                        investor disclaimer so you are not shown it on every
                        visit.
                      </td>
                      <td className="py-3 pr-4">
                        Strictly necessary (local storage)
                      </td>
                      <td className="py-3">30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                4. Third-Party Cookies
              </h2>
              <p>
                We do not currently use any third-party cookies, analytics
                services, or tracking technologies on this website. Should this
                change in the future, we will update this policy and implement
                appropriate consent mechanisms as required under the Privacy and
                Electronic Communications Regulations 2003 (PECR).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                5. Managing Cookies
              </h2>
              <p>
                You can control and manage cookies and local storage through
                your browser settings. Please note that removing or blocking
                cookies and local storage may affect your experience on our
                website — for example, you may be required to re-accept the
                professional investor disclaimer on each visit.
              </p>
              <p>
                Most browsers allow you to view, manage, and delete cookies and
                local storage. For more information, consult the help
                documentation for your specific browser.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                6. Changes to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-text-dark text-xl font-normal">
                7. Contact Us
              </h2>
              <p>
                If you have any questions about our use of cookies or local
                storage, please contact us at{" "}
                <a
                  href="mailto:jhenry@inverlockadvisory.com"
                  className="text-accent-blue underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200"
                >
                  jhenry@inverlockadvisory.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
