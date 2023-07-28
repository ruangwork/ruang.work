import useWindowSize from "@/hooks/useWindowSize";
import Toc from "./mdx/toc.astro";

export default function Aside({
  headings,
}: {
  headings: Array<{ depth: number; text: string; slug: string }>;
}) {
  const { windowSize } = useWindowSize();
  return (
    <>
      {windowSize.width && windowSize?.width > 768 ? (
        <aside className="@container">
          <div className="sticky top-20 h-[80vh] overflow-y-auto pr-4 pb-12">
            <Toc headings={headings} />
            <div className="my-4 h-px w-full bg-black" />
            <div className="flex justify-between">
              <button
                id="scroll-top"
                type="button"
                className="text-sm text-zinc-600 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-400"
              >
                Back to top
              </button>
            </div>
          </div>
        </aside>
      ) : (
        <div />
      )}
    </>
  );
}
