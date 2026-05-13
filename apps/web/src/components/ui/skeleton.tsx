import { cn } from "@rdv/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-xl animate-shimmer",
        className
      )}
      {...props}
    />
  );
}

// Skeletons compuestos para casos de uso específicos
function SermonCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

function MinistryCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-6 w-2/3" />
    </div>
  );
}

export { Skeleton, SermonCardSkeleton, MinistryCardSkeleton };
