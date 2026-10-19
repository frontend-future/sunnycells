import { answersKey } from "@/lib/quiz/completed";

/* Lets a link from an email open the plans page already personalised: ?dog-name=Canela
   &dog-size=Small+(under+20+lbs)&gender=Female. Like ReturningVisitorRedirect it is an inline
   script, so the answers are in sessionStorage before React hydrates and the page never
   flashes the generic version. Only these three fields are read, each length capped, and
   gender must be Male or Female. The params are stripped from the address afterwards so the
   link a shopper copies or shares is clean. Email is deliberately not accepted: the pixel
   logs the page URL. */
export function PlansParamHydrator({ quizId }: { quizId: string }) {
  const code = `(function(){try{var p=new URLSearchParams(location.search),k=${JSON.stringify(answersKey(quizId))},a={},n=0,f={"dog-name":30,"dog-size":40,"gender":6};for(var x in f){var v=p.get(x);if(v===null)continue;v=v.replace(/[\\u0000-\\u001f<>]/g,"").trim().slice(0,f[x]);if(x==="gender"&&v!=="Male"&&v!=="Female")continue;if(v){a[x]=v;n++}}if(!n)return;var o={};try{o=JSON.parse(sessionStorage.getItem(k)||"{}")||{}}catch(e){}for(var y in a)o[y]=a[y];sessionStorage.setItem(k,JSON.stringify(o));for(var z in f)p.delete(z);var q=p.toString();history.replaceState(null,"",location.pathname+(q?"?"+q:"")+location.hash)}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
