/**
 * The paper's own disclaimer, carried over from the PDF onto every web page
 * that reproduces the paper (the article and its appendix).
 *
 * Kept in one place deliberately: legal wording must not drift between the
 * pages that share it. This is distinct from the sitewide disclaimer in the
 * footer, which covers the website rather than this document.
 */
export default function PaperDisclaimer() {
  return (
    <aside
      aria-label="Disclaimer"
      className="mt-14 border-t border-light-grey pt-6"
    >
      <p className="text-xs text-text-body/70 font-light leading-relaxed">
        This document is for informational purposes only and does not
        constitute advice, an offer, solicitation, or recommendation. It should
        not be relied upon for any purpose. No representation or warranty is
        made as to accuracy or completeness, and we disclaim all liability
        arising from its use.
      </p>
    </aside>
  );
}
