import Image from "next/image";

interface Props {
  number: number;
  title: string;
  subtitle?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  source?: string;
  /**
   * Wide charts get a minimum width on small screens and scroll horizontally
   * inside their own container, rather than shrinking into illegibility.
   */
  wide?: boolean;
}

/**
 * The single-column charts (Exhibits 4 and 5) are authored on a 229.68pt
 * canvas, while the full-width ones (1 and 3) use 481.92pt — but both set
 * type at the same absolute size. Rendering a narrow chart at full column
 * width therefore blows its labels up to roughly 1.8x those of a wide one.
 *
 * Capping the narrow charts at the matching fraction of the 768px prose
 * column (768 x 229.68/481.92) makes the rendered type identical across
 * every exhibit, and reproduces the proportions of the printed PDF.
 */
const NARROW_MAX_WIDTH = "md:max-w-[368px]";

export default function Exhibit({
  number,
  title,
  subtitle,
  src,
  alt,
  width,
  height,
  source,
  wide = false,
}: Props) {
  return (
    <figure className="my-12 md:my-16">
      <div className="border-t-2 border-accent-blue pt-4 mb-5">
        <p className="text-accent-blue text-xs tracking-widest uppercase mb-2">
          Exhibit {number}
        </p>
        <h3 className="text-text-dark text-lg md:text-xl font-normal leading-snug">
          {title}
        </h3>
        {subtitle && (
          <p className="text-text-body text-sm font-light leading-relaxed mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Break out of the prose measure so exhibits use the full column, and
          allow horizontal scroll on phones for the wide multi-panel charts. */}
      <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`h-auto ${
            wide
              ? "min-w-[640px] w-full md:min-w-0"
              : `w-full ${NARROW_MAX_WIDTH}`
          }`}
          sizes="(max-width: 768px) 100vw, 368px"
        />
      </div>

      {wide && (
        <p className="md:hidden text-xs text-text-body/60 font-light mt-2">
          Scroll sideways to see the full chart.
        </p>
      )}

      {source && (
        <figcaption className="text-xs text-text-body/70 font-light leading-relaxed mt-3">
          {source}
        </figcaption>
      )}
    </figure>
  );
}
