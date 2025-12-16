const LoadingSkeleton = ({ variant = 'card', count = 1 }) => {
    const skeletons = {
        card: (
            <div className="card p-6 space-y-4">
                <div className="flex items-start gap-4">
                    <div className="skeleton h-12 w-12 rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                        <div className="skeleton h-4 w-3/4 rounded"></div>
                        <div className="skeleton h-3 w-1/2 rounded"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="skeleton h-3 w-full rounded"></div>
                    <div className="skeleton h-3 w-5/6 rounded"></div>
                </div>
            </div>
        ),
        documentCard: (
            <div className="card p-4 space-y-3">
                <div className="flex items-center gap-3">
                    <div className="skeleton h-10 w-10 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                        <div className="skeleton h-4 w-3/4 rounded"></div>
                        <div className="skeleton h-3 w-1/2 rounded"></div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="skeleton h-6 w-16 rounded-full"></div>
                    <div className="skeleton h-6 w-20 rounded-full"></div>
                </div>
            </div>
        ),
        statCard: (
            <div className="card p-6 space-y-3">
                <div className="skeleton h-8 w-8 rounded-lg"></div>
                <div className="skeleton h-6 w-24 rounded"></div>
                <div className="skeleton h-8 w-16 rounded"></div>
            </div>
        ),
        input: (
            <div className="space-y-2">
                <div className="skeleton h-4 w-24 rounded"></div>
                <div className="skeleton h-12 w-full rounded-xl"></div>
            </div>
        ),
        text: (
            <div className="space-y-2">
                <div className="skeleton h-4 w-full rounded"></div>
                <div className="skeleton h-4 w-5/6 rounded"></div>
                <div className="skeleton h-4 w-4/6 rounded"></div>
            </div>
        ),
    };

    const SkeletonComponent = skeletons[variant] || skeletons.card;

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>{SkeletonComponent}</div>
            ))}
        </>
    );
};

export default LoadingSkeleton;
