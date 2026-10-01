import { MAIN_CONTENT_ID, SKIP_LINK_CLASS } from "@/constants/a11y";
import Link from "next/link";

export default function SkipToMainLink() {
  return (
    <Link href={`#${MAIN_CONTENT_ID}`} className={SKIP_LINK_CLASS}>
      Skip to main content
    </Link>
  );
}
