import { answersKey, completedKey } from "@/lib/quiz/completed";

/* Sends someone who already finished the quiz from its landing page to their results.
   It is an inline script, not an effect, so it runs while the page is still parsing and a
   returning visitor never sees the landing page flash. It also puts their saved answers
   back in sessionStorage, which is where the results pages read them from after the tab
   was closed. A new visitor has no saved record, so nothing happens. Add ?retake to the
   address to see the landing page anyway. */
export function ReturningVisitorRedirect({ quizId, to }: { quizId: string; to: string }) {
  const code = `(function(){try{if(location.search.indexOf("retake")>-1)return;var d=localStorage.getItem(${JSON.stringify(completedKey(quizId))});if(!d)return;var k=${JSON.stringify(answersKey(quizId))};if(!sessionStorage.getItem(k))sessionStorage.setItem(k,d);location.replace(${JSON.stringify(to)});}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
