import { THEME_STORAGE_KEY } from "@/constants/themeMode";
import { THEME_COOKIE_NAME } from "@/utils/themeCookie";

export default function ThemeScript() {
  const script = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var ck=${JSON.stringify(THEME_COOKIE_NAME)};var s=localStorage.getItem(k);var d=s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme: dark)").matches);var m=d?"dark":"light";document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=m;if(!s)localStorage.setItem(k,m);document.cookie=ck+"="+m+"; path=/; max-age=31536000; SameSite=Lax";}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
