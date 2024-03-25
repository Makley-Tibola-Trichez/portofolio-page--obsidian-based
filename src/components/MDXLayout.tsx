export default function MDXLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-full bg-tab-active p-4 flex justify-center">
      <div className="max-w-[70%]">{children}</div>
    </div>
  );
}
