import {Skeleton} from "@/components/ui/skeleton";

function AuthLoading() {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center px-4 py-10 space-y-4">
			<Skeleton className="h-8 max-w-[250px] w-2/3 rounded" />
			<Skeleton className="h-4 max-w-[300px] w-3/4 rounded" />
			<Skeleton className="h-8 max-w-[350px] w-full rounded mt-4" />
			<Skeleton className="h-8 max-w-[350px] w-full rounded " />
		</div>
	);
}

export default AuthLoading;
